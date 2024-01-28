import ky from "ky"
import { MemberProps } from "../types"



const getMemberDetail = async (httpClient: typeof ky, param: string) => {
  return httpClient.get(`Management/Member/${param}`).json<MemberProps>()
}

export default getMemberDetail
