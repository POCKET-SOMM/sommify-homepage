import ky from 'ky';
// const ARTIFICIAL_DELAY_MS = 5000
export const API_VERSION = 'v1';

const client = ky.extend({
  prefixUrl: 'https://api.pocketsomm.dev/',
});

export default client;
