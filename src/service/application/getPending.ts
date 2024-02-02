import ky from "ky";
import { User } from "../types";

const getPending = async (httpClient: typeof ky) => {
  return httpClient
    .get(`Management/Application/pending approval-count`)
    .json<User>();
};

export default getPending;
