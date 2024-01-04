import ky from "ky"
import { User } from "../types"

const getYearlyGrowth = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/Dashboard/monthly-membership growth`).json<User>()
}

export default getYearlyGrowth
