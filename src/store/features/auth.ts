import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IOrganization = Partial<{
  createdAt: string;
  updatedAt: string;
  name: string;
  id: string;
  branch: string;
  code: string;
  companyAbbr: string;
}>;

export type IUserInfo = Partial<{
  channel: string;
  name: string;
  id: string;
  email: string;
  permissions: Array<string>;
  roles: Array<string>;
}>;

export type IToken = Partial<{
  access: string;
  refresh: string;
  expiresIn: number;
}>;

const initialState = {
  isAuthenticated: false,
  organization: {} as IOrganization,
  userInfo: {} as IUserInfo,
  token: {
    access: '',
    refresh: '',
    expiresIn: 3600,
  } as IToken,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onUpdateAuthSlice: (
      state,
      { payload }: PayloadAction<Partial<typeof initialState>>
    ) => ({ ...state, ...payload }),

    onLogout: () => {
      return initialState;
    },
  },
});

export const { onUpdateAuthSlice, onLogout } = AuthSlice.actions;
export default AuthSlice;
