import { BehrainClient } from "@/service/client";
import { ReportProps } from "@/service/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res);
  if (req.method === "GET") {
    await getCoachReports();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getCoachReports() {
    try {
      const { fromBookingDate = "", coach = "",toBookingDate = "" } = req.query;
      const params = {
        fromBookingDate: fromBookingDate as string,
        toBookingDate: toBookingDate as string,
        coach: coach as string,
      } as ReportProps;
      const response = await client.reports.getCoachReports(params);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(403).end()
    }
  }
}

export default handler;
