import ky from "ky"
import {  AnnouncementProps } from "../types"



const DeleteSchedule = async (
  httpClient: typeof ky,
  params: AnnouncementProps,
) => {
  const id = params.id
  return httpClient
    .delete(`Management/Announcement/${id}`, {
      json: params,
    })
    .json()
}

export default DeleteSchedule
