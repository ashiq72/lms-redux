import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  // 1️⃣ First request
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // 2️⃣ Call refresh token using baseQuery (IMPORTANT)
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // 3️⃣ Save new access token in redux
      const newToken = (refreshResult.data as any).accessToken;

      api.dispatch({
        type: "auth/setToken",
        payload: newToken,
      });

      // 4️⃣ Retry original request with new token
      result = await baseQuery(args, api, extraOptions);
    }
    //  else {
    //   // 5️⃣ Refresh token failed → logout
    //   // api.dispatch({ type: "auth/logout" });
    // }
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
