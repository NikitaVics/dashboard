import { BehrainClient } from "@/service/client"
import { BookingsProps } from "@/service/types"
import type { NextApiRequest, NextApiResponse } from "next"



async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res)
  if (req.method === "PUT") {
    await DeActivateBooking(req.body)
  } else {
    res.status(405).end("Method Not Allowed")
  }

  async function DeActivateBooking(params: BookingsProps) {
    try {
      const response = await client.bookings.cancelBookings(params)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }
}

export default handler
