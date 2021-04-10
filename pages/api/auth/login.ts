import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import cookie from "cookie";
import dbQuery from "@lib/db";

interface UserType {
    id: number;
    user_name: string;
    email: string;
    createdAt: Date;
    password: string;
}

const login = async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise(async (resolve) => {

        const { method } = req;
        const { email, password } = req.body;

        if (method === 'POST') {
            // return bad request if there is no pass or email
            if (!email || !password) {
                return res.status(400).json({
                    status: "failed",
                    message: "Request missing username or password"
                })
            }

            try {
                // fetch the user from db
                const user = await dbQuery({
                    query: 'SELECT * FROM users WHERE email = ?;', values: [email]
                });
                // there is no such kind a user in db
                if (!user[0]) {
                    return res.status(404).json({
                        status: "failed",
                        message: "User not found!"
                    })
                }
                // comparing params pass with pass from db user
                compare(password, user[0].password, async function (err, status) {

                    if (!err && status) { // is comparing is positive

                        const payload = {
                            id: user[0].id,
                            user_name: user[0].user_name,
                            email: user[0].email,
                            createdAt: user[0].createdAt,
                        }

                        const token = sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });

                        res.setHeader('Set-Cookie', cookie.serialize('auth', token, {
                            httpOnly: true, // <- no js code running on the browser can read the cookie
                            secure: process.env.NODE_ENV !== 'development', // <- it should be secure in production
                            sameSite: 'strict', // <- this controls which site has access to this cookie
                            maxAge: 60 * 60,  // <- how many the cookie is going the last for (this time 1h)
                            path: '/' // <- cookie is available everywhere
                        }));

                        return res.status(200).json({
                            status: "success",
                            user: {
                                user_name: user[0].user_name,
                                email: user[0].email
                            }
                        })
                    } else {
                        return res.status(400).json({
                            status: 'failed',
                            message: "Password not correct"
                        })
                    }

                });
            } catch (error) {
                return res.status(500).json({
                    status: 'failed',
                    message: `Database query failed! Error: ${error.message}`
                })
            }
        } else {
            return res.status(405).json({
                status: 'failed',
                message: 'Only POST protocol is supported!'
            })
        }
    });
}

export default login;