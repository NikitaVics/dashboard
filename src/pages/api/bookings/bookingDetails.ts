import { BehrainClient } from "@/service/client"
import { getMember } from "@/service/types"
import type { NextApiRequest, NextApiResponse } from "next"


async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res)
  if (req.method === "GET") {
    await bookingDetails()
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function bookingDetails() {
    try {
      const { searchTerm = "",bookingDate="" } = req.query
      const params = {
        searchTerm: searchTerm as string,
        bookingDate:bookingDate as string
      } as getMember
      const response = await client.bookings.bookingDetails(params)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(401).end()
    }
  }
}

export default handler
