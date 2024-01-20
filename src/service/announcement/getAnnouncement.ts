import ky from "ky"

import { User } from "../types"

const getAnnouncement = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/Announcement/all`).json<User>()
}

export default getAnnouncement
