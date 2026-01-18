import type { TQueryParam, TResponseRedux } from "../../../types/global";
import type { TStudent } from "../../../types/userManagement.type";
import { baseApi } from "../../api/baseApi";

const userManagemntApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response?.meta,
        };
      },
    }),
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateStudentMutation, useGetAllStudentsQuery } =
  userManagemntApi;
