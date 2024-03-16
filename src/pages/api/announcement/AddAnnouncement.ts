
import { ErrorResponse } from '@/service/types';
import { HTTPError } from 'ky';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function AddAnnouncement(req: NextApiRequest, res: NextApiResponse) {
  // const client = new BehrainClient(req, res);

  try {
   

    // const form = new IncomingForm();

   
    // const data = await new Promise<{ fields: any, files: any }>((resolve, reject) => {
    //   form.parse(req, (err, fields, files) => {
    //     if (err) return reject(err);
    //     resolve({ fields, files });
    //   });
    // });

   
    
    // const message = data.fields.Message;
    // const images = data.files.Images;

    // console.log('Message:', message);
    // console.log('Images:', images);


    // const response = await client.announcement.AddAnnouncement(data);

    // res.status(200).json(response);
  } catch (error) {
    console.log('Error Handling Request:', error);

    if (error instanceof HTTPError && error.response.status === 400) {
      const errorResponse: ErrorResponse = await error.response.json();

      console.log('Error:', errorResponse);

      const { errors } = errorResponse;
      res.status(400).json({
        error: { errors },
        status: 400,
      });
    } else {
      res.status(500).json({
        error: { message: 'Internal Server Error' },
        status: 500,
      });
    }
  }
}

export default AddAnnouncement;
