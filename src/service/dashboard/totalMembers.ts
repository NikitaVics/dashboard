import ky from "ky"
import { User } from "../types"

const getTotalMembers = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/Dashboard/total-members`).json<User>()
}

export default getTotalMembers
