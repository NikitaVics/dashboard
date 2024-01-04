import ky from "ky"
import { User } from "../types"

const getTotalRevenue = async (httpClient: typeof ky) => {
  return httpClient.get(`Management/Dashboard/total-revenue`).json<User>()
}

export default getTotalRevenue
