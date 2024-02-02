import ky from "ky";
import { CourtMaintainence } from "../types";

const AddAnnouncement = async (
  httpClient: typeof ky,
  params: CourtMaintainence
) => {

  params.message = "Testing"
  const form = new FormData();
  form.append("Message", "g jjhh");

  console.log("Form :", form);
return httpClient
    .post(`Management/Announcement/create Announcement`, {
    body : form,
    headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
    .json(); 
 

  


};

export default AddAnnouncement;
