import { baseApi } from "../../api/baseApi";

const academicManagemantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicManagements: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
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
