import { apiClient, apiClientUpload } from "./api";
import {
  BASE_URL,
  GET_METHOD,
  IMAGE_BASE_URL,
  POST_METHOD,
  UPLOAD_IMAGE,
  LOGIN,
  GET_PROFILE,
  UPDATE_PROFILE,
  GET_USER_LIST,
  DELETE,
  DELETE_USER
} from "./url";

export const uploadImage = (payload) => {
  console.log(payload,'==>>payload')
  return apiClientUpload({
    baseURL: IMAGE_BASE_URL,
    method: POST_METHOD,
    url: UPLOAD_IMAGE,
    data: payload,
  });
};

export const getSlots = () => {
  return apiClient({
    baseURL: BASE_URL,
    method: GET_METHOD,
    url: SLOT,
  });
};

export const AuthLogin = (payload) => {
  return apiClient({
    baseURL: BASE_URL,
    method: POST_METHOD,
    url: LOGIN,
    data: payload
  });
};

export const getProfile = () => {

  return apiClient({
    baseURL: BASE_URL,
    method: GET_METHOD,
    url: GET_PROFILE,
  });
};

export const getUserList = (query) => {
  return apiClient({
    baseURL: BASE_URL,
    method: GET_METHOD,
    url: `${GET_USER_LIST}${query?query:""}`,
  });
};


export const updateProfile = (payload) => {
  console.log(payload, '==>> data:payload')
  return apiClient({
    baseURL: BASE_URL,
    method: POST_METHOD,
    url: UPDATE_PROFILE,
    data: payload
  });
};

export const deleteUser = (payload) => {
  console.log(payload, '==>> data:payload')
  return apiClient({
    baseURL: BASE_URL,
    method: GET_METHOD,
    url: `${DELETE_USER}${payload}`,
   
  });
};