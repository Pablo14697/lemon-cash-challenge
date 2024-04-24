import { API_KEY } from '../../hardcoded';

const API = {
  get: async (endpoint: string): Promise<unknown> => {
    const response = await fetch(endpoint, {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
      },
    });
    return await response.json();
  },
};

export default API;
