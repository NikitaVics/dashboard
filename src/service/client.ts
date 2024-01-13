import siteConfig from "@/config/siteConfig";
import Cookies from "cookies";
import ky from "ky";
import { NextApiRequest, NextApiResponse } from "next";
import login from "./auth/login";
import getTotalMembers from "./dashboard/totalMembers";
import getTotalRevenue from "./dashboard/totalRevenue";
import getMembershipGrowth from "./dashboard/membershipGrowth";
import getYearlyGrowth from "./dashboard/yearlyGrowth";
import getBookingGrowth from "./dashboard/bookingGrowth";
import getApproved from "./bookings/getApproved";

type ApiHandler<T, U> = (baseHttpClient: typeof ky, params: U) => Promise<T>;

type BehrainClientOptions = {
  authRequired: boolean;
  overrideLanguage?: string;
  additionalHeader?: AdditionalHeaderOptions[];
};

type AdditionalHeaderOptions = {
  key: string;
  value: string;
};

const {
  api: { baseUrl: prefixUrl },
} = siteConfig;
export class BehrainClient {
  // API services to expose on the client.
  public auth;
  public dashboard;
  public application;

  constructor(
    req: NextApiRequest,
    res: NextApiResponse,
    opts: BehrainClientOptions = {
      authRequired: true,
      overrideLanguage: undefined,
      additionalHeader: [],
    }
  ) {
    const baseUrl = prefixUrl;
    const cookies = new Cookies(req, res);
    const baseHttpClient = ky.create({
      prefixUrl: baseUrl,
      hooks: {
        beforeRequest: [
          (request) => {
            request.headers.set("Content-type", "application/json-patch+json");
            request.headers.set("accept", "*/*");
            if (opts.overrideLanguage) {
              request.headers.set("Accept-Language", opts.overrideLanguage);
            }
            if (opts.additionalHeader?.length) {
              opts.additionalHeader?.map(({ key, value }) => {
                request.headers.set(key, value);
              });
            }

            if (!opts.authRequired) {
              return;
            }
            const accessToken = cookies.get("access_token");

            if (!accessToken) {
              throw new Error("missing valid session");
            }

            request.headers.set("Authorization", `${accessToken}`);
          },
        ],
      },
    });

    const withApiClient =
      <T, U>(handler: ApiHandler<T, U>) =>
      async (params: U = {} as U): Promise<T> => {
        return handler(baseHttpClient, params);
      };

    this.auth = {
      login: withApiClient(login),
    };

    this.dashboard = {
      totalMembers: withApiClient(getTotalMembers),
      totalRevenue: withApiClient(getTotalRevenue),
      getMembershipGrowth: withApiClient(getMembershipGrowth),
      yearlyGrowth: withApiClient(getYearlyGrowth),
      getBookingGrowth: withApiClient(getBookingGrowth),
    };
    this.application = {
      getApproved: withApiClient(getApproved),
    };
  }
}
