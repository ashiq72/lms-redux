import { baseApi } from "../../api/baseApi";

const academicManagemantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicManagements: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
      transformResponse: (response: { data: unknown; meta?: unknown }) => {
        return {
          data: response.data,
          meta: response?.meta,
        };
      },
    }),
    createAcademicManagement: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAcademicManagementsQuery,
  useCreateAcademicManagementMutation,
} = academicManagemantApi;
