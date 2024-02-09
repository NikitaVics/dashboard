import ky from "ky"
import {  AnnouncementProps } from "../types"



const getAnnouncementDetail = async (httpClient: typeof ky, param: string) => {
  return httpClient.get(`Management/Announcement/${param}`).json<AnnouncementProps>()
}

export default getAnnouncementDetail
