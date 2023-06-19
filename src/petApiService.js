import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints(builder) {
    return {
      getPet: builder.query({
        query(id) {
          return { url: "pets", params: { id } };
        },
        transformResponse(response) {
          return response.pets[0];
        },
      }),
      getBreeds: builder.query({
        query(animal) {
          return {
            url: "breeds",
            params: { animal },
          };
        },
        transformResponse(response) {
          return response.breeds;
        },
      }),
      search: builder.query({
        query({ animal, location, breed }) {
          return {
            url: "pets",
            params: { animal, location, breed },
          };
        },
        transformResponse(response) {
          return response.pets;
        },
      }),
    };
  },
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
