import ky from "ky"

import { User, getMember } from "../types"

const getMembersList = async (httpClient: typeof ky, { searchTerm }: getMember,) => {
  return httpClient.get(`Management/Member/members-list`, {
    searchParams: {
      searchTerm: searchTerm,
    } as unknown as string,
  }).json<User>()
}

export default getMembersList
