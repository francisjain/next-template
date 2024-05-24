import axios from "axios";
import { getFormDataHeader, getHeaderInfo } from "@/helpers/tokenCreator";
import { API_BASE_URL } from "@/config/urlConfig";

const client = axios.create({
  baseURL: "https://api-staging.cfpcareconnect.com/",
  // baseURL: API_BASE_URL,
  timeout: 60 * 10 * 1000, //Ten minutes
});

// FUNCTION TO RE-DIRECT TO LOGIN PAGIN, IF TOKEN IS EXPIRED OR LOGOIN IS UNAUTHORISED

//######## Start ##################
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = async (error: any, token = null) => {
  if (error) {
    failedQueue.forEach((prom) => {
      prom.reject(error);
    });
  } else {
    for (const prom of failedQueue) {
      const config = prom.config;
      config.headers.Authorization = `Bearer ${token}`;
      try {
        const result = await client(config);
        prom.resolve(result);
      } catch (err) {
        prom.reject(err);
      }
    }
  }
  isRefreshing = false;
  failedQueue = [];
};

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {

      // Push the failed requests to failedQueue for re-execution after token refresh
      const retryOriginalRequest = new Promise((resolve, reject) => {
        // Check if the data is an instance of FormData
        if (originalRequest.data instanceof FormData) {
          // If it is, skip the JSON.parse() step
          failedQueue.push({ resolve, reject, config: { ...originalRequest, data: originalRequest.data } });
        } else if (originalRequest.data) {
          // If it's not, and data is defined, parse the data as JSON
          failedQueue.push({ resolve, reject, config: { ...originalRequest, data: JSON.parse(originalRequest.data) } });
        } else {
          // If data is not defined, don't include it in the config
          failedQueue.push({ resolve, reject, config: { ...originalRequest } });
        }
      });

      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;
        // try {

        //   const response = await client.post(URL_REFRESH, {
        //     refresh_token: getRefreshToken(),
        //   });
        //   if (response?.status === 200 && response?.data?.access_token) {

        //     // CHANGE TOKEN WITH RENEW 
        //     const renewedToken = response.data.access_token;
            
        //     setNewToken(renewedToken);
        //     processQueue(null, renewedToken);
        //   } else {
        //     localStorage.clear();
        //     localStorage.removeItem('refreshToken');
        //     setNewToken("400");
        //     if (loginUserRole === USER_ROLE_PATIENTS || loginUserRole === USER_ROLE_RELATIVES) {
        //       window.location.href = ROUTE_LOGIN_PATIENT;
        //     } else {
        //       window.location.href = ROUTE_LOGIN;
        //     }
        //     throw new Error('refresh_token_expired');
        //   }
        // } catch (error: any) {
        //   if (error.response && error.response.status && error.response.status === 400) {
        //     localStorage.clear();
        //     localStorage.removeItem('refreshToken');
        //     setNewToken("400");
        //     if (loginUserRole === USER_ROLE_PATIENTS || loginUserRole === USER_ROLE_RELATIVES) {
        //       window.location.href = ROUTE_LOGIN_PATIENT;
        //     } else {
        //       window.location.href = ROUTE_LOGIN;
        //     }
        //   }
        //   isRefreshing = false;
        //   localStorage.clear();
        //   localStorage.removeItem('refreshToken');
        //   processQueue('refresh_token_expired', null);
        // }
      }
      return retryOriginalRequest;

    } else if (error.response.status !== 401) {
      return Promise.reject(error);
    }
  }
);


//######## END ##################


// Function to make a GET request with authentication headers.
export const get = async function (url: any, params: any = {}) {
  const header = await getHeaderInfo();
  const resp = await client.get(url, { ...header, params });
  return resp;
};

// Function to make a GET request without authentication headers.
export const getWithoutAuth = async function (url: any, params: any = {}) {
  const resp = await client.get(url, { ...params });
  return resp;
};

// Function to make a GET request with authentication headers and expecting an image (arraybuffer) response.
export const getAuthImg = async function (url: any, params: any = {}) {
  const header = await getHeaderInfo();
  const resp = await client.get(url, {
    ...header,
    responseType: "arraybuffer",
    params,
  });
  return resp;
};

// Function to make a POST request with authentication headers.
export const post = async function (url: string, body: any) {
  const header = await getHeaderInfo();
  const resp = await client.post(url, body, header);
  return resp;
};

// Function to make a POST request without authentication headers.
export const postWithoutAuth = async function (url: string, body: any) {
  const resp = await client.post(url, body);
  return resp;
};

// Function to make a PATCH request with authentication headers.
export const patch = async function (url: string, body: any) {
  const header = await getHeaderInfo();
  const resp = await client.patch(url, body, header);
  return resp;
};

// Function to make a PUT request with authentication headers.
export const put = async function (url: any, body: any) {
  const header = await getHeaderInfo();
  const resp = await client.put(url, body, header);
  return resp;
};

// Function to make a DELETE request with authentication headers.
export const deleteApi = async function (url: any) {
  const header = await getHeaderInfo();
  const resp = await client.delete(url, header);
  return resp;
};

// Function to upload a file using a POST request with multipart/form-data content type.
export const postFile = async function (url: string, body: any) {
  const header = await getFormDataHeader();
  const formData = new FormData();
  formData.append("file", body);
  try {
    const resp = await client.post(url, formData, header);
    return resp;
  } catch (err) {

    console.log(err);


  }
};

// Function to download a file from a URL with an optional file name.
export const getFile = async function (
  url: string,
  name: string,
  params: any = {}
) {
  const header = await getHeaderInfo();
  const response = await client.get(url, {
    ...header,
    params,
  });
  const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = urlBlob;
  if (name) {
    link.setAttribute("download", name + ".csv");
  } else {
    link.setAttribute(
      "download",
      response.headers["contentDisposition"] + ".csv"
    );
  }
  document.body.appendChild(link);
  link.click();
};

// Function to download a PNG image file from a URL with a specified name.
export const getPnGFile = async function (url: string, name: string) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    var tag = document.createElement("a");
    tag.href = imageUrl;
    tag.download = name;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.send();
};


// Function to download a PDF file from a URL with a specified name.
export const getPdfFile = async function (
  url: string,
  name: string,
  params: any = {}
) {
  const response = await client.get(url);
  const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = urlBlob;
  link.setAttribute("download", name + ".pdf");
  document.body.appendChild(link);
  link.click();
};






