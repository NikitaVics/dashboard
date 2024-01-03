import { BehrainClient } from "@/service/client"
import Cookies from "cookies"
import { HTTPError } from "ky"
import { NextApiRequest, NextApiResponse } from "next"



async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookie = new Cookies(req, res)
  try {
    const client = new BehrainClient(req, res, {
      authRequired: false,
    })
    const body = req.body

    if (!body) {
      res.status(401).end()
      return
    }
   
    const { result: { token: access_token } } = await client.auth.login(body);
    const date = new Date()
    // Cookie expiry time for 24hrs
    const expiryTime = date.setTime(date.getTime() + 23 * 59 * 59 * 1000)

    const tokenWithBearer = `Bearer ${access_token}`;

    await cookie.set("access_token", tokenWithBearer, {
      expires: new Date(expiryTime),
    });

   

    res.status(200).json({ message: "Login Successfully" })
 
  } catch (error) {
    if (error instanceof HTTPError && error.response.status === 401) {
      res.status(401).json({ message: "Invalid Email or Password" })
    }
  }
}

export default handler
