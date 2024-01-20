import ky from "ky";
import { CourtMaintainence } from "../types";

const AddAnnouncement = async (
  httpClient: typeof ky,
  params: CourtMaintainence
) => {
  params.message = "deded"
  const formData = new FormData();
  formData.append("Message", params.message);
  // formData.append("ScheduledDateTime", params.scheduledDateTime);
  console.log("Message:", params.message);
  // console.log("ScheduledDateTime:", params.scheduledDateTime);
  console.log("Form :",formData)
  return httpClient
    .post(`Management/Announcement/create Announcement`, {
    body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .json();
};

export default AddAnnouncement;
