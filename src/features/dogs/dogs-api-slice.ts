import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DOGS_API_KEY = 'cbfb51a2-84b6-4025-a3e2-ed8616edf311';

interface Breed {
  id: string;
  name: string;
  reference_image_id: string;
}

interface Image {
  id: string;
  url: string;
}

// class NullBreed implements Breed {
//   id: string = 'Jordan';
//   name: string = 'Jordan';
//   image: {
//     url: string;
//   } = {
//     url: 'Jordan'
//   };
// }

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1',
    prepareHeaders(headers) {
      headers.set('x-api-key', DOGS_API_KEY);

      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      fetchBreeds: builder.query<Breed[], string | void>({
        query: (searchBreed) => {
          return `/breeds/search?q=${searchBreed}`;
        },
      }),
    };
  },
});

export const { useFetchBreedsQuery } = apiSlice;