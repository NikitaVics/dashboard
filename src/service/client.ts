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
import getMembersList from "./members/getMembers";
import getMemberDetail from "./members/getMembersDetail";
import getSuccessBookings from "./members/successBookings";
import getCancelledBookings from "./members/cancelledBookings";
import ActivateMember from "./members/ActivateMember";
import getCourtReports from "./reports/getCourtReports";
import courtDropdown from "./reports/getCourtDropdown";
import exportCourtReports from "./reports/exportCourtReport";
import coachDropdown from "./reports/getCoachDropdown";
import getCoachReports from "./reports/getCoachReport";
import exportCoachReports from "./reports/exportCoachReport";
import getCoach from "./coach/getCoach";
import AddCoach from "./coach/addCoach";
import getCoachDetail from "./coach/getCoachDetails";
import ActivateCoach from "./coach/ActivateCoach";
import AddCourtMaintainence from "./announcement/addCourtMaintainence";
import AddEvent from "./announcement/addEvent";
import AddAnnouncement from "./announcement/addAnnouncement";
import getAnnouncement from "./announcement/getAnnouncement";
import getProfile from "./dashboard/profile";
import getApplication from "./application/getApplication";
import getApprove from "./application/getApprove";
import getDetails from "./application/getDetails";
import getPending from "./application/getPending";
import getRejected from "./application/getRejected";
import rejected from "./application/rejected";
import update from "./application/update";
import getaveragePeakBookingHour from "./bookings/averagepeakBookingMonth";
import bookingDetails from "./bookings/bookingDetails";
import bookingDetail from "./bookings/getbookingDetail";
import getPeakBookingHour from "./bookings/peakBookingHour";
import getTotalBookings from "./bookings/totalBookings";
import getCancelled from "./bookings/cancelledBookings";
import DeActivateBooking from "./bookings/deactivateBooking";
import getAnnouncementDetail from "./announcement/getDetails";
import DeleteSchedule from "./announcement/deleteSchedule";
import ApproveMember from "./members/ApproveMember";

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
  public members;
  public reports;
  public coach;
  public bookings;
  public announcement;
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
            request.headers.set("accept", "/");
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

            request.headers.set("Authorization", ` ${accessToken}`);
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
      getProfile: withApiClient(getProfile),
    };

  

  this.coach = {
    getCoach : withApiClient(getCoach),
    AddCoach : withApiClient(AddCoach),
    getCoachDetail : withApiClient(getCoachDetail),
    ActivateCoach : withApiClient(ActivateCoach)
  }
    this.members = {
      getMembersList: withApiClient(getMembersList),
      getMemberDetail: withApiClient(getMemberDetail),
      getSuccessBookings: withApiClient(getSuccessBookings),
      getCancelledBookings: withApiClient(getCancelledBookings),
      ActivateMember: withApiClient(ActivateMember),
      ApproveMember : withApiClient(ApproveMember)
    };

    this.application = {
      getApprove: withApiClient(getApprove),
      getApplication: withApiClient(getApplication),
      getPendings: withApiClient(getPending),
      getRejected: withApiClient(getRejected),
      getDetails: withApiClient(getDetails),
      update: withApiClient(update),
      rejected: withApiClient(rejected),
    };

  this.bookings = {
    getPeakBookingHour : withApiClient(getPeakBookingHour),
    getTotalBookings : withApiClient(getTotalBookings),
    getaveragePeakBookingHour: withApiClient(getaveragePeakBookingHour),
    bookingDetails:withApiClient(bookingDetails),
    getbookingDetail:withApiClient(bookingDetail),
    getCancelledBookings:withApiClient(getCancelled),
    cancelBookings : withApiClient(DeActivateBooking)
  }
    this.coach = {
      getCoach: withApiClient(getCoach),
      AddCoach: withApiClient(AddCoach),
      getCoachDetail: withApiClient(getCoachDetail),
      ActivateCoach: withApiClient(ActivateCoach),
    };

    this.reports = {
      getCourtReports: withApiClient(getCourtReports),
      courtDropdown: withApiClient(courtDropdown),
      exportCourtReports: withApiClient(exportCourtReports),
      getCoachReports: withApiClient(getCoachReports),
      coachDropdown: withApiClient(coachDropdown),
      exportCoachReports: withApiClient(exportCoachReports),
    };

  this.announcement = {
  
    AddCourtMaintainence  :withApiClient(AddCourtMaintainence),
    AddEvent : withApiClient(AddEvent),
    AddAnnouncement : withApiClient(AddAnnouncement),
    getAnnouncement : withApiClient(getAnnouncement),
    getDetails : withApiClient(getAnnouncementDetail),
    DeleteSchedule : withApiClient(DeleteSchedule)
  }
    
  }
}