import axios from "axios";

export const getCryptoAPIData = (method, url, header) => {
  return axios[method](url, {
    headers: header,
  })
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
};
