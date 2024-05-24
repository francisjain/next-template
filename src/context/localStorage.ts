
// FUNCTION TO SET-TOKEN'S AND REQUIRED IN LOCALSTORAGE
export const setTokens = (authData: any) => {
  localStorage.setItem('token', authData.access);
  localStorage.setItem('refreshToken', authData.refresh);
  localStorage.setItem('adminUserId', authData.userId);
  localStorage.setItem('adminUserName', authData.fullName);
  localStorage.setItem('adminUserRole', authData.role);
};

// FUNCTION TO CLEAR LOCALSTORAGE
export const removeTokens = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('token');
  localStorage.removeItem('selectedHotelId');
  localStorage.removeItem('adminUserId');
  localStorage.removeItem('adminUserRole');
  localStorage.removeItem('adminUserName');
  localStorage.removeItem('filterAccountId');
  localStorage.removeItem('filterAccountName');
  localStorage.removeItem('accountUseraccountIds');
  localStorage.removeItem('lastActivePageAPIData');
};

// FUNCTION TO GET REQUIRED FROM LOCALSTORAGE
export const getAccessToken = () => localStorage.getItem('token');
export const getUser = () => localStorage.getItem('user');
export const setUser = (user: any) => localStorage.setItem('user', JSON.stringify(user));
export const getRefreshToken = () => localStorage.getItem('refresh_token');
export const getAdminUserRole = () => localStorage.getItem('adminUserRole');
export const getAdminUserId = () => localStorage.getItem('adminUserId');
export const getAccountAccessToken = () => localStorage.getItem('token');

// USED TO HANDLE REFRESH PAGE SCENARIO
export const getLastActivePageAPIData = () => localStorage.getItem('lastActivePageAPIData');
export const setLastActivePageAPIData = (pageData: any) => localStorage.setItem('lastActivePageAPIData', JSON.stringify(pageData));

// FUNCTION TO SET INFO: OF MAIDEN IN LOCALSTORAGE
export const setMaidTokens = (authData: any) => {
  localStorage.setItem('maidToken', authData.access);
  localStorage.setItem('maidRefreshToken', authData.refresh);
};
export const setMaidPhone = (authData: any) => {
  localStorage.setItem('maidPhone', authData);
};
export const setMaidId = (decode: any) => localStorage.setItem('maidId', decode.user_id);

// FUNCTION TO GET INFO: OF MAIDEN IN LOCALSTORAGE
export const getMaidId = () => localStorage.getItem('maidId');
export const getMaidPhone = () => localStorage.getItem('maidPhone');
export const getMaidAccessToken = () => localStorage.getItem('maidToken');
export const getMaidRefreshToken = () => localStorage.getItem('maidRefreshToken');



// **********************************************************************
// ***************** TO STORE AND FETCH SELECTED HOTEL ****************** 
// **********************************************************************

export const setFilterAccountId = (accountId: any) => localStorage.setItem('filterAccountId', accountId);
export const getFilterAccountId = () => localStorage.getItem('filterAccountId');
export const setFilterAccountName = (accountName: string) => localStorage.setItem('filterAccountName', accountName);
export const getFilterAccountName = () => localStorage.getItem('filterAccountName');


// ****************************************************************************
// *********************** FOR ACCOuNT (HOTEL) LOGIN ************************** 
// ****************************************************************************

export const setAccountTokens = (authData: any) => {
  localStorage.setItem('token', authData.access);
  localStorage.setItem('refreshToken', authData.refresh);
  localStorage.setItem('adminUserId', authData.userId);
  localStorage.setItem('adminUserName', authData.fullName);
  localStorage.setItem('adminUserRole', authData.role);
  localStorage.setItem('accountUseraccountIds', authData.hotelIds);
};

//export const setaccountId = (decode: any) => localStorage.setItem('accountId', decode.user_id);
export const getAccountUserAccountIds = () => localStorage.getItem('accountUseraccountIds');

// FUNCTION TO FETCH DESIGN HUDDLE ACCESS TOKEN 
export const dh_setUserAccessToken = (tokenData:any) => localStorage.setItem('dh_userAccessToken',tokenData.userAccessToken ? tokenData.userAccessToken : "");

export const dh_setAppAccessToken = (tokenData:any) => localStorage.setItem('dh_appAccessToken',tokenData.appAccessToken ? tokenData.appAccessToken : ""); 

export const dh_getUserAccessToken   = () => localStorage.getItem('dh_userAccessToken');
export const dh_getAppAccessToken    = () => localStorage.getItem('dh_appAccessToken');

export const dh_removeTokens = () => {
  localStorage.removeItem('dh_userAccessToken');
  localStorage.removeItem('dh_appAccessToken');
}



