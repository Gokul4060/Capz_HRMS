import { apiSlice } from "../apiSlice";

const ATTENDANCE_URL = "/attendance";

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markAttendance: builder.mutation({
      query: () => ({
        url: `${ATTENDANCE_URL}/mark`,
        method: "POST",
        credentials: "include",
      }),
    }),
    markClockOut: builder.mutation({
      query: () => ({
        url: `${ATTENDANCE_URL}/clockout`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    getUserAttendance: builder.query({
      query: () => ({
        url: `${ATTENDANCE_URL}/user`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllAttendance: builder.query({
      query: () => ({
        url: `${ATTENDANCE_URL}/all`,
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteAttendanceRecords: builder.mutation({
      query: ({ startDate, endDate }) => ({
        url: `${ATTENDANCE_URL}/delete/${id}`,
        method: "DELETE",
        credentials: "include",
        body: { startDate, endDate },
      }),
    }),
  }),
});

export const {
  useMarkAttendanceMutation,
  useMarkClockOutMutation,
  useGetUserAttendanceQuery,
  useGetAllAttendanceQuery,
  useDeleteAttendanceRecordsMutation,
  
} = attendanceApiSlice;
