import ky from "ky"
import { MemberProps } from "../types"



const getMemberDetail = async (httpClient: typeof ky, param: string) => {
  return httpClient.get(`Management/Member/member-details`,{
    searchParams:{
      userId : param
    }
  }).json<MemberProps>()
}

export default getMemberDetail
