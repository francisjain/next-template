import { URL_LOGIN } from "@/config/apiUrls";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postWithoutAuth } from "./apiService";

// FUNCTION FOR VALIDATE USERNAME AND PASSWOR
export const authenticateUser = createAsyncThunk(
    'client/authenticateUser',
    async (apiData: { username: string, password: string }, thunkAPI) => {
      try {
        const response = postWithoutAuth(URL_LOGIN, apiData);
        return (await response).data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );