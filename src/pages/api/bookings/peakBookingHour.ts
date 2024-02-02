import { BehrainClient } from "@/service/client"
import type { NextApiRequest, NextApiResponse } from "next"


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res)
  if (req.method === "GET") {
    await getPeakBookingHour()
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function getPeakBookingHour() {
    try {
      const response = await client.bookings.getPeakBookingHour()
      res.status(200).json(response)
    } catch (error) {
      console.log("error",error)
      res.status(401).end()
    }
  }
}

export default handler
