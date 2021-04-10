// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { authenticated } from "@lib/middleware/utils";

export default authenticated(async function getHello(req: NextApiRequest, res: NextApiResponse) {

  //console.log('Cookie ->', req.cookies.auth)

  res.status(200).json({
    status: 'success',
    name: 'Daniel Molnar'
  })
});
