import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {

    verify(req.cookies.auth, process.env.JWT_KEY, async function (err, decoded) {
        if (!err && decoded) {
            return await fn(req, res);
        }

        return res.status(401).json({
            status: "failed",
            message: "You are not autenticated!"
        })
    });
}

const verifyToken = (jwtToken) => {
    try {
        return verify(jwtToken, process.env.JWT_KEY);
    } catch (e) {
        console.log('e:', e);
        return null;
    }
}

const getAppCookies = (req) => {
    const parsedItems = {};
    if (req.headers.cookie) {
        const cookiesItems = req.headers.cookie.split('; ');
        cookiesItems.forEach(cookies => {
            const parsedItem = cookies.split('=');
            parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
        });
    }
    return parsedItems;
}

export { authenticated, getAppCookies, verifyToken };