import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res);

  if (req.method === "PUT") {
    await updateCookie();
  }

  async function updateCookie() {
    try {
      await cookies.set("access_token", "");
      res.status(200).end();
    } catch (error) {
      console.log(error);
      res.status(500).end();
    }
  }
}
export default handler;
