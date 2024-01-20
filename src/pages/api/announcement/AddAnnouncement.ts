

// const formidable = require('formidable');

export const config = {
  api: {
    bodyParser: false,
  },
};

async function createAnnouncement() {
  // const client = new BehrainClient(req, res)
  // let form = new formidable.IncomingForm();

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error('Error parsing form data:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//       return;
//     }
//  console.log("Params :",params)
//     try {
     
//       const message = "sgseg"; 
//       const scheduledDateTime = fields.ScheduledDateTime;

//       console.log("Message:", message);
//       console.log("ScheduledDateTime:", scheduledDateTime);

     
//       const response = await client.announcement.AddAnnouncement({
//         ...params,
//         message, 
//       })
//       res.status(200).json(response)
//     } catch (error) {
//       console.log(error)
//       if (error instanceof HTTPError && error.response.status === 400) {
//         const errorResponse: ErrorResponse = await error.response.json()


//         console.log("Error: ", errorResponse);
//         const { errors } = errorResponse
//         res.status(400).json({
//           error: { errors },
//           status: 400,
//         })
//       }
//     }
//   });
}

export default createAnnouncement;
