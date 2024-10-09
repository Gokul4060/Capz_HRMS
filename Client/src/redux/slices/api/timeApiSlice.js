import { apiSlice } from "../apiSlice";

const TIMESHEET_URL = "/timesheets";

export const timeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Employee side: Submit a new timesheet
    createTimesheet: builder.mutation({
      query: (data) => ({
        url: `${TIMESHEET_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    // Get all timesheets for Admin/Manager
    getAllTimesheets: builder.query({
      query: () => ({
        url: `${TIMESHEET_URL}/all`,
        method: "GET",
        credentials: "include",
      }),
    }),
    // Get the logged-in user's timesheets (for Developer)
    getTimesheets: builder.query({
      query: () => ({
        url: `${TIMESHEET_URL}/get`,
        method: "GET",
        credentials: "include",
      }),
    }),
    // Update a specific timesheet (Admin/Manager)
    updateTimesheet: builder.mutation({
      query: ({ timesheetId, ...data }) => ({
        url: `${TIMESHEET_URL}/time/${timesheetId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    // Delete a specific timesheet (Admin)
    deleteTimesheet: builder.mutation({
      query: (timesheetId) => ({
        url: `${TIMESHEET_URL}/delete/${timesheetId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateTimesheetMutation,
  useGetAllTimesheetsQuery,
  useGetTimesheetsQuery,
  useUpdateTimesheetMutation,
  useDeleteTimesheetMutation,
} = timeApiSlice;
