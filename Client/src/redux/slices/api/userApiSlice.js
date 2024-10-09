import { apiSlice } from "../apiSlice";

const USER_URL = "/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getEmployeeList: builder.query({
      query: () => ({
        url: `${USER_URL}/get-employee`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getApprovers: builder.query({
      query: () => ({
        url: `${USER_URL}/approvers`,
        method: "GET",
        credentials: "include",
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    userAction: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getNotifications: builder.query({
      query: () => ({
        url: `${USER_URL}/notifications`,
        method: "GET",
        credentials: "include",
      }),
    }),

    markNotiAsRead: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/read-noti?isReadType=${data.type}&id=${data?.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    // profile
    personaldata: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/data`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getPersonaldata: builder.query({
      query: () => ({
        url: `${USER_URL}/getdata`,
        method: "GET",
        credentials: "include",
      }),
    }),
    // end

    changePassword: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/change-password`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useGetEmployeeListQuery,
  useDeleteUserMutation,
  useUserActionMutation,
  useGetNotificationsQuery,
  useChangePasswordMutation,
  useMarkNotiAsReadMutation,
  useGetUserQuery,
  useGetApproversQuery,
  usePersonaldataMutation,
  useGetPersonaldataQuery,
} = userApiSlice;
