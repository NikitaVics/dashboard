

// const formidable = require('formidable');

import { BehrainClient } from "@/service/client";
import {  CourtMaintainence, ErrorResponse } from "@/service/types"
import { HTTPError } from "ky"
import type { NextApiRequest, NextApiResponse } from "next"

export const config = {
  api: {
    bodyParser: false,
  },
};

async function createAnnouncement(req: NextApiRequest, res: NextApiResponse,params : CourtMaintainence) {
  const client = new BehrainClient(req, res)
 
    try {
     
     console.log("paramss :",params)

    
      const response = await client.announcement.AddAnnouncement(params)
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      if (error instanceof HTTPError && error.response.status === 400) {
        const errorResponse: ErrorResponse = await error.response.json()


        console.log("Error: ", errorResponse);
        const { errors } = errorResponse
        res.status(400).json({
          error: { errors },
          status: 400,
        })
      }
    }
  }


export default createAnnouncement;
