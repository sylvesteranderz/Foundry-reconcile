import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  ghanaCardNumber: string;
  niaData: INia;
  ghanaCardActiveTab: string;
}
const initialState: InitialState = {
  ghanaCardNumber: '',
  niaData: {} as INia,
  ghanaCardActiveTab: 'id',
};
export const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    resetGlobal: (_) => {
      return {
        ghanaCardNumber: '',
        niaData: {} as INia,
        ghanaCardActiveTab: 'id',
      };
    },
    setItem: (state, action: PayloadAction<Partial<typeof initialState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { resetGlobal, setItem } = GlobalSlice.actions;

export default GlobalSlice;
export type INia = {
  transactionGuid: string;
  shortGuid: string;
  requestTimestamp: string;
  responseTimestamp: string;
  verified: any;
  isException: boolean;
  source: string;
  person: {
    nationalId: string;
    cardId: string;
    cardValidFrom: string;
    cardValidTo: string;
    surname: string;
    forenames: string;
    nationality: string;
    birthDate: string;
    gender: string;
    birthCountry: string;
    birthDistrict: string;
    birthRegion: string;
    birthTown: string;
    addresses: {
      type: string;
      community?: string;
      postalCode?: string;
      town: string;
      countryName: string;
      districtName: string;
      region: string;
      addressDigital?: string;
      gpsAddressDetails?: {
        gpsName: string;
      };
    }[];
    contact: {
      email: string;
      phoneNumbers: {
        type: string;
        phoneNumber: string;
        network: string;
      }[];
    };
    occupations: {
      name: string;
    }[];
    biometricFeed: {
      face: {
        dataType: string;
        data: string;
      };
    };
    binaries: {
      type: string;
      dataType: string;
      data: string;
    }[];
  };
};
