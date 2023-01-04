import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import pianoAPIConstants from '../../../piano/constants';

const { API_ID_PREFIX, API_TOKEN, APPLICATION_ID } = pianoAPIConstants;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { endpoint = '', params = {} } = req.body || {};

    const { data } = await axios.post(`${API_ID_PREFIX}${endpoint}`, null, {
      params: {
        ...params,
        aid: APPLICATION_ID,
        api_token: API_TOKEN,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
