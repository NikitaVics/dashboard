import ky from "ky"
import { MemberProps } from "../types"



const ApproveMember = async (
  httpClient: typeof ky,
  params: MemberProps,
) => {
 const userId = params.id;
  return httpClient
    .put(`Management/Member/member-request-update/${userId}`)
    .json()
}

export default ApproveMember
