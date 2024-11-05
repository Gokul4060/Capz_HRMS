import { apiSlice } from "../apiSlice";

const LEAVE_URL = "/leave";

export const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyLeave: builder.mutation({
      query: (data) => ({
        url: `${LEAVE_URL}/apply`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    getUserleave: builder.query({
      query: () => ({
        url: `${LEAVE_URL}/getLeave`,
        method: "GET",
        credentials: "include",
      }),
    }),

    updateLeaveStatus: builder.mutation({
      query: ({ leaveId, status }) => ({
        url: `${LEAVE_URL}/update/${leaveId}`,
        method: "PATCH",
        body: { status },
        credentials: "include",
      }),
    }),

    getApprovers: builder.query({
      query: () => ({
        url: `/users/approvers`, // Assuming the correct USER_URL is handled elsewhere
        method: "GET",
        credentials: "include",
      }),
    }),

    deleteLeaveRequest: builder.mutation({
      query: (leaveId) => ({
        url: `${LEAVE_URL}/leave/${leaveId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    getLeaveBalance: builder.query({
      query: () => ({
        url: `${LEAVE_URL}/balance`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // Add getAllLeaves query for Admin
    getAllLeaves: builder.query({
      query: () => ({
        url: `${LEAVE_URL}/all`,
        method: "GET",
        credentials: "include",
      }),
    }),

    approveLeave: builder.mutation({
      query: ({ leaveId, status }) => ({
        url: `/leave/update-status/${leaveId}`,
        method: "PATCH",
        body: { status },
        credentials: "include",
      }),
    }),

    rejectLeave: builder.mutation({
      query: ({ leaveId, status }) => ({
        url: `/leave/update-status/${leaveId}`,
        method: "PATCH",
        body: { status },
        credentials: "include",
      }),
    }),

    getPendingLeaveRequests: builder.query({
      query: () => ({
        url: `${LEAVE_URL}/pending-requests`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getLeaveHistory: builder.query({
      query: () => ({
        url: `${LEAVE_URL}/history`,
        method: "GET",
        credentials: "include",
      }),
    }),

    updateLeaveRequest: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${LEAVE_URL}/update/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useApplyLeaveMutation,
  useUpdateLeaveStatusMutation,
  useUpdateLeaveRequestMutation,
  useGetUserleaveQuery,
  useDeleteLeaveRequestMutation,
  useGetLeaveBalanceQuery,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
  useGetPendingLeaveRequestsQuery,
  useGetApproversQuery,
  useGetLeaveHistoryQuery,
  useGetAllLeavesQuery,
} = leaveApiSlice;
