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
  scheduledDateTime: "2024-01-25T13:14:15.859Z",
  courtNames:[params.courtNames]
      }
    })
    .json()
}

export default AddCourtMaintainence
