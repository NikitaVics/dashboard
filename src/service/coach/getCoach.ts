import ky from "ky"

import { User, getMember } from "../types"

const getCoach = async (httpClient: typeof ky,{ searchTerm }: getMember,) => {
  return httpClient.get(`Management/Coach`, {
    searchParams: {
      searchTerm: searchTerm,

    } as unknown as string,}).json<User>()
}

export default getCoach
