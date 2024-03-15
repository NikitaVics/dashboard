import ky from "ky"
import { MemberProps } from "../types"



const ActivateMember = async (
  httpClient: typeof ky,
  params: MemberProps,
) => {
console.log("Params :",params)
  return httpClient
    .put(`Management/Member/member-activity-update`, {
    searchParams:{
      userId : 2
    }
    })
    .json()
}

export default ActivateMember
