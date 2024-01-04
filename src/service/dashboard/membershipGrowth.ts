import ky from "ky"
import { User } from "../types"

const getMembershipGrowth = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/Dashboard/current-month-membership-growth`).json<User>()
}

export default getMembershipGrowth
