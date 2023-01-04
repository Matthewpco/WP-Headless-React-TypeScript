import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import pianoAPIConstants from '../../../piano/constants';

const { API_PREFIX, API_TOKEN, APPLICATION_ID } = pianoAPIConstants;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { endpoint = '', params = {} } = req.body || {};
    const defaultFields = { ...params, custom_fields: undefined };

    const { data: result } = await axios.post(
      `${API_PREFIX}${endpoint}`,
      params.custom_fields,
      {
        params: {
          ...defaultFields,
          aid: APPLICATION_ID,
          api_token: API_TOKEN,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
