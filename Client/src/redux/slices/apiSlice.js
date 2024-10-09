import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = "http://localhost:8888";
//const FIRE_URI = "import.meta.env.VITE_APP_BASE_URL";


const baseQuery = fetchBaseQuery({ baseUrl: API_URI +  "/api" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
