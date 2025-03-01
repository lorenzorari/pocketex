import ky from "ky";
import { convertUnderscoreToCamelcase } from "src/utils/convert-underscore-to-camelcase";

export const pokeapi = ky.extend({
  prefixUrl: "https://pokeapi.co/api/v2",
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
