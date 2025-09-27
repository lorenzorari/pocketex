import ky from 'ky';
import { convertUnderscoreToCamelcase } from '@/utils/convert-underscore-to-camelcase';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/';
const API_BASE_URL = '/api/';

export const pokeapiOld = ky.extend({
  prefixUrl: POKEAPI_BASE_URL,
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        const data = await response.json();
        const camelizedData = convertUnderscoreToCamelcase(data);

        return new Response(JSON.stringify(camelizedData));
      },
    ],
  },
});

export async function pokeapi<T>(url: string, options: RequestInit = {}) {
  const response = await fetch(`${POKEAPI_BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`, { cause: response });
  }

  const data = await response.json();
  const camelizedData = convertUnderscoreToCamelcase<T>(data);

  return camelizedData;
}

export async function api<T>(url: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`, { cause: response });
  }

  return (await response.json()) as T;
}
