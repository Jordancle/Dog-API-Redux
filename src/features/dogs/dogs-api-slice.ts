import { createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DOGS_API_KEY = 'cbfb51a2-84b6-4025-a3e2-ed8616edf311';

export interface Breed {
  id: string;
  name: string;
  reference_image_id: string;
}

export interface Image {
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

export const dogsApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1',
    prepareHeaders(headers) {
      headers.set('x-api-key', DOGS_API_KEY);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchBreeds: builder.query<Breed[], string | void>({
      query: (searchBreed) => `/breeds/search?q=${searchBreed}`
    }),
    fetchImage: builder.query<Image, string | void>({
      query: (reference_image_id) => `/images/${reference_image_id}`
    }),
  }),
});

export const { useFetchBreedsQuery, useFetchImageQuery } = dogsApi;