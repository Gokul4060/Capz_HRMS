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
    updateAttendance: builder.mutation({
      query: ({ attendanceId, clockIn, clockOut, status }) => ({
        url: `${ATTENDANCE_URL}/${attendanceId}`,
        method: "PUT",
        body: { clockIn, clockOut, status },
        credentials: "include",
      }),
    }),
    deleteAttendance: builder.mutation({
      query: (attendanceId) => ({
        url: `${ATTENDANCE_URL}/${attendanceId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useMarkAttendanceMutation,
  useMarkClockOutMutation,
  useGetUserAttendanceQuery,
  useGetAllAttendanceQuery,
  useUpdateAttendanceMutation,
} = attendanceApiSlice;
