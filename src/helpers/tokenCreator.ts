import { getAccessToken } from "@/context/localStorage";


// FUNCTION TO RETRIEVE HEADER WITH ACCESS TOKEN FOR API 
export const getHeaderInfo = async function () {
  const token = await getAccessToken();
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

// FUNCTION TO RETRIEVE HEADER WITH ACCESS TOKEN FOR API 
export const getFormDataHeader = async function () {
  const token = await getAccessToken();
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };
};

