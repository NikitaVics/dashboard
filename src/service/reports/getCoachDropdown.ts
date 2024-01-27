import ky from "ky"

import {  User } from "../types"

const coachDropdown = async (httpClient: typeof ky) => {
 
  return httpClient.get(`Management/ReportBoard/Coaches`).json<User>()
}

export default coachDropdown
