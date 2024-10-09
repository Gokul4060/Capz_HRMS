import { apiSlice } from "../apiSlice";

const TMTRACKING_URL = "/time-tracking";

export const timeTrackingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Start a time entry
    startTimeEntry: builder.mutation({
      query: (data) => ({
        url: `${TMTRACKING_URL}/start`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // End a time entry
    endTimeEntry: builder.mutation({
      query: (entryId) => ({
        url: `${TMTRACKING_URL}/end/${entryId}`,
        method: "POST",
        credentials: "include",
      }),
    }),

    // Fetch time tracking data for the current user
    getTimeTrackingData: builder.query({
      query: () => ({
        url: `${TMTRACKING_URL}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useStartTimeEntryMutation,
  useEndTimeEntryMutation,
  useGetTimeTrackingDataQuery,
} = timeTrackingApiSlice;
