import ky from "ky"
import {  CourtMaintainence } from "../types"


const AddCourtMaintainence = async (
  httpClient: typeof ky,
  params: CourtMaintainence,
) => {
 
  return httpClient

    .post(`Management/Announcement/create CourtMaintenance Announcement`, {
      json: {
        message: params.message,
   scheduledDateTime: params.scheduledDateTime,
  courtNames:[params.courtNames]
      }
    })
    .json()
}

export default AddCourtMaintainence
