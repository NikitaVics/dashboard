import ky from "ky"
import { MemberProps } from "../types"



const getDetails = async (httpClient: typeof ky, param: string) => {
  return httpClient.get(`Management/Application/details/${param}`).json<MemberProps>()
}

export default getDetails
