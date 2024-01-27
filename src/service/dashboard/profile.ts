import ky from "ky"
import { User } from "../types"

const getProfile = async (httpClient: typeof ky) => {
  return httpClient.get(`Profile/Admin-Profile`).json<User>()
}

export default getProfile
