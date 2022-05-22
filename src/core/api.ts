/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
import { apiMethodType } from './interfaces/api';

type apiType = {
  url: string;
  method: apiMethodType;
  body: any;
};

export const Api = async ({ url, method }: apiType) => {
  return fetch(url, {
    method,
    // body,
    // mode?: "navigate" | "same-origin" | "no-cors" | "cors",
    headers: undefined, // {'Content-type': 'application/json; charset=UTF-8',},
  });
};
