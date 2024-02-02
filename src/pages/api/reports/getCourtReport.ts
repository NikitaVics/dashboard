import { BehrainClient } from "@/service/client";
import { ReportProps } from "@/service/types";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new BehrainClient(req, res);
  if (req.method === "GET") {
    await getCourtReports();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function getCourtReports() {
    try {
      const { bookingDate = "", court = "" } = req.query;
      const params = {
        bookingDate: bookingDate as string,
        court: court as string,
      } as ReportProps;
      const response = await client.reports.getCourtReports(params);
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(401).end();
    }
  }
}

export default handler;
