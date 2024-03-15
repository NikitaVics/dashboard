import ky from "ky"
import { MemberProps } from "../types"



const ActivateMember = async (
  httpClient: typeof ky,
  params: MemberProps,
) => {
console.log("service:," , params)
  return httpClient
    .put(`Management/Member/member-activity-update`, {
      // searchParams : {
      //   userId : 2,
      //   status : false
      // }
    })
    .json()
}

export default ActivateMember
