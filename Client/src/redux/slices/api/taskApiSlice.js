import { apiSlice } from "../apiSlice";

const TASK_URL = "/tasks";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new Task
    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASK_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    // Fetch Task Timeline (all tasks for the user)
    getTasksTimeline: builder.query({
      query: () => ({
        url: `${TASK_URL}/gettimeline`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // Update a Task
    updateTask: builder.mutation({
      query: ({ taskId, ...data }) => ({
        url: `${TASK_URL}/update/${taskId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    // Delete a Task
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `${TASK_URL}/delete/${taskId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksTimelineQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApiSlice;
