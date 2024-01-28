import { BehrainClient } from "@/service/client"
import type { NextApiRequest, NextApiResponse } from "next"


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res)

  const id = req.query.id as string
  if (req.method === "GET") {
    await getbookingDetail(id)
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getbookingDetail(id: string) {
    try {
      const response = await client.bookings.getbookingDetail(id as string)
     
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(401).end()
    }
  }
}

export default handler