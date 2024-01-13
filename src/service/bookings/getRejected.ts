import ky from "ky";
import { User } from "../types";

const getRejected = async (httpClient: typeof ky) => {
  return httpClient
    .get(`Management/Dashboard/monthly-booking growth`)
    .json<User>();
};

export default getRejected;
