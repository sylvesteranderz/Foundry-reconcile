import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   targetItem: {} as any,
  roles: [] as Array<{ name: string; id: string; description: string }>,
};

const PersistSlice = createSlice({
  name: 'persist-slice',
  initialState,
  reducers: {
    onUpdatePersistSlice: (
      state,
      { payload }: PayloadAction<Partial<typeof initialState>>
    ) => {
      return { ...state, ...payload };
    },
  },
});

export const { onUpdatePersistSlice } = PersistSlice.actions;
export default PersistSlice;
