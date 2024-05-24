import { RootState } from "@/redux/store";
import { authenticateUser } from "@/services/loginServices";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface ILoginState {
    loading: 'idle' | 'loading' | 'success' | 'error';
    token: string;
    isAuthenticated: boolean;
}

const initialState: ILoginState = {
    loading: 'idle',
    token: '',
    isAuthenticated: false,
}

export const loginPageSlice = createSlice({
    name: 'loginPageSlice',
    initialState,
    reducers: {

        changeToken: (state, action: PayloadAction<any>) => {
            state.token = action.payload;
        },

    },
    extraReducers: (builder) => {

        builder.addCase(authenticateUser.pending, (state) => {
            state.loading = 'loading';
        });
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.loading = 'success';
            state.token = action.payload.tokens.token;
            state.isAuthenticated = true;

        });
        builder.addCase(authenticateUser.rejected, (state, { payload }: any) => {
            state.loading = 'error';
        });


    }
});

export const { changeToken } = loginPageSlice.actions;
export const loginPageSlices = (state: RootState) => state.loginData;
export const loginPageReducer = loginPageSlice.reducer;