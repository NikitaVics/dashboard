import ky from "ky"

import { User, getAnnouncementProps } from "../types"

const getAnnouncement = async (httpClient: typeof ky, { announcementType }: getAnnouncementProps,) => {
  return httpClient.get(`Management/Announcement/all`,{
    searchParams: {
      announcementType: announcementType,
    } as unknown as string,
  }).json<User>()
}

export default getAnnouncement
