import { ICreateRole, IRole } from "./../../types/IRole";
import roleApi from "./roleApi";

export const roleEndpoints = roleApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<IRole[], string>({
      query: () => ({
        url: `/role`,
      }),
      providesTags: ["roles"],
    }),
    createRole: builder.mutation<IRole, ICreateRole>({
      query: (role) => ({
        url: `/role`,
        method: "POST",
        body: role,
      }),
      invalidatesTags: ["roles"],
    }),
  }),
});

export const { useGetRolesQuery, useCreateRoleMutation } = roleEndpoints;
