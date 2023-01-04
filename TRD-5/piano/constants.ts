const { PIANO_MODE } = process.env;

export default {
  get API_PREFIX() {
    if (PIANO_MODE === 'production') {
      return 'https://api.piano.io/api/v3';
    }
    // else it is 'sandbox'
    return 'https://sandbox.piano.io/api/v3';
  },

  get API_ID_PREFIX() {
    if (PIANO_MODE === 'production') {
      return 'https://api.piano.io/id/api/v1';
    }
    // else it is 'sandbox'
    return 'https://sandbox.piano.io/id/api/v1';
  },

  API_TOKEN: process.env.PIANO_API_TOKEN,

  APPLICATION_ID: process.env.PIANO_APPLICATION_ID,

  get IS_SANDBOX() {
    if (PIANO_MODE === 'production') {
      return false;
    }
    // else it is 'sandbox'
    return true;
  },
};
