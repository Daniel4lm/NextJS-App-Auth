import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import dbQuery from "@lib/db";


const signup = async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise(resolve => {

    const { method } = req;
    const { user_name, email, createdAt, password } = req.body;
    let query, values;

    if (method === 'POST') {

        try {

            hash(password, 10, async function (err, hashedPassword) {

                if (!createdAt) {
                    query = 'INSERT INTO users (user_name, email, password) VALUES (?,?,?)';
                    values = [user_name, email, hashedPassword];
                } else {
                    query = 'INSERT INTO users (user_name, email, createdAt, password) VALUES (?,?,?,?)';
                    values = [user_name, email, createdAt, hashedPassword]
                }

                //console.log('Hashed: ', hashedPassword)

                const statement = await dbQuery({ query, values });

                const users = await dbQuery({
                    query: 'SELECT * FROM users;', values: []
                });

                return res.status(200).json({
                    status: 'success',
                    users
                })
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

export default signup;