import ky from "ky"
import { MemberProps } from "../types"



const ActivateMember = async (
  httpClient: typeof ky,
  params: MemberProps,
) => {
 const userId = params.id;
  return httpClient
    .put(`Management/Member/member-activity-update/${userId}`)
    .json()
}

export default ActivateMember
