import ky from "ky"

import { User, getMember } from "../types"

const getMembersList = async (httpClient: typeof ky, { searchTerm }: getMember,) => {
  return httpClient.get(`ManagementMember`, {
    searchParams: {
      searchTerm: searchTerm,
    } as unknown as string,
  }).json<User>()
}

export default getMembersList
