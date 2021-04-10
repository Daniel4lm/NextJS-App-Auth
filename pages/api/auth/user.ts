import { NextApiRequest, NextApiResponse } from "next";
import dbQuery from "@lib/db";
import { verify } from "jsonwebtoken";

export default async function getUser(req: NextApiRequest, res: NextApiResponse) {

    verify(req.cookies.auth, process.env.JWT_KEY, async function (err, decoded: any) {

        if (!err && decoded) {

            const u_email = decoded.email;

            try {
                const curUser = await dbQuery({
                    query: 'SELECT * FROM users WHERE email = ?;', values: [u_email]
                });

                return res.status(200).json({
                    status: "success",
                    user: {
                        user_name: curUser[0].user_name,
                        email: curUser[0].email
                    }
                });
            } catch (error) {
                return res.status(500).json({
                    status: 'failed',
                    message: `${error.message}`
                })
            }
        }

        return res.status(401).json({
            status: "failed",
            message: "You are not autenticated!"
        })
    });
};