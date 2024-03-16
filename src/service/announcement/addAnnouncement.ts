import ky from "ky";


const AddAnnouncement = async (
  httpClient: typeof ky,
  //  data : AnnouncementProps
) => {
  

  return httpClient
    .post(`Management/Announcement/create Announcement`, {
      // body: data,
     

    })
    .json();
};

export default AddAnnouncement;
