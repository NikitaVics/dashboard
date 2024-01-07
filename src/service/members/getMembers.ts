import ky from "ky"

import { User } from "../types"

const getMembersList = async (httpClient: typeof ky) => {
  return httpClient.get(`ManagementMember`).json<User>()
}

export default getMembersList
