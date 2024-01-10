const prefix = process.env.REACT_APP_API_PREFIX || "";
const apiURI = process.env.REACT_APP_SHIFTS_API || "";
export const appConfig = {
  apiUrl: `${apiURI}${prefix}`,
};
