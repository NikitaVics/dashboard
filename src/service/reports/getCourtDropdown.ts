import ky from "ky"

import {  User } from "../types"

const courtDropdown = async (httpClient: typeof ky) => {
 
  return httpClient.get(`Management/ReportBoard/Courts`).json<User>()
}

export default courtDropdown
