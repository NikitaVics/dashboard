import ky from "ky"
import {  CourtMaintainence } from "../types"


const AddEvent = async (
  httpClient: typeof ky,
  params: CourtMaintainence,
) => {
  return httpClient
    .post(`Management/Announcement/create CourtMaintenance Announcement`, {
      json: {
        Message : params.message,
        ScheduledDateTime : params.scheduledTime,
        // Images : params.images,
        
      }
    })
    .json()
}

export default AddEvent
