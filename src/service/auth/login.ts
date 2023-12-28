import ky from "ky"

import { Session } from "../types"

const login = async (
  httpClient: typeof ky,
  params: { email: string; password: string },
) => {
  return httpClient
    .post(`Management/AdminLogin/login`, {
      json: {
        userNameOrEmail: params.email,
        password: params.password,
      },
    })
    .json<Session>()
}

export default login
