import ky from "ky"

import { User, getMember } from "../types"

const getMembersList = async (httpClient: typeof ky, { namefilter }: getMember,) => {
  return httpClient.get(`Management/Member/members-list`, {
    searchParams: {
      namefilter: namefilter,
    } as unknown as string,
  }).json<User>()
}

export default getMembersList
