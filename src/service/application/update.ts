import ky from "ky";
import { MemberProps } from "../types";

const update = async (httpClient: typeof ky, params: MemberProps) => {
  const memberId = params.memberId;
  return httpClient
    .post(`Management/Application/approve/${memberId}`, {
      json: params,
    })
    .json();
};

export default update;
