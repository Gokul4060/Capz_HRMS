import { apiSlice } from "../apiSlice";

const PROJECTS_URL = "/project"; // Updated base URL to project

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: `${PROJECTS_URL}/dashboard`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getAllProjects: builder.query({
      query: ({ strQuery, isTrashed, search }) => ({
        url: `${PROJECTS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    createProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    duplicateProject: builder.mutation({
      query: (id) => ({
        url: `${PROJECTS_URL}/duplicate/${id}`,
        method: "POST",
        body: {},
        credentials: "include",
      }),
    }),

    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `${PROJECTS_URL}/update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    trashProject: builder.mutation({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),

    createTask: builder.mutation({
      query: (id,data) => ({
        url: `${PROJECTS_URL}/create-task/${id}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useDuplicateProjectMutation,
  useUpdateProjectMutation,
  useTrashProjectMutation,
  
} = projectApiSlice;
