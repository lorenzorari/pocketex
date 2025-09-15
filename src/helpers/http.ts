import ky from 'ky';
import { convertUnderscoreToCamelcase } from '@/utils/convert-underscore-to-camelcase';

const apiBaseUrl = 'https://pokeapi.co/api/v2/';

export const pokeapi = ky.extend({
  prefixUrl: apiBaseUrl,
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

export async function api<T>(url: string, options: RequestInit = {}) {
  const response = await fetch(`${apiBaseUrl}${url}`, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`, { cause: response });
  }

  const data = await response.json();
  const camelizedData = convertUnderscoreToCamelcase<T>(data);

  return camelizedData;
}
