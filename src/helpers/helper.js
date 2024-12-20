import {
  agencyLogin,
  DoctorLogin,
  PatientLogin,
} from "../api/helper";

import { Store } from "../redux";
import { setHeaderToken, setUserDetails } from "../redux/cookiesReducer";
import { setOwnProfile, setUserProfile } from "../redux/reducer";
import { ShowToast } from "./ToastService";

const web = "web";

export const userLoginProcess = async (state, navigation) => {
  const data = Store.getState()
  // console.log(data.cookies.loginType,'===data.cookies.loginType')
  const param = {
    email: state?.email,
    password: state?.password,
    device_id: "web",
    device_token: state.deviceToken ? state.deviceToken : "no",
  };
  try {
    let response = {}
    if (data.cookies.loginType == "Doctor") {
      response = await DoctorLogin(param);

    }
    if (data.cookies.loginType == "Clinic") {
      response = await agencyLogin(param);
    }
    if (data.cookies.loginType == "Patient") {
      response = await PatientLogin(param);
    }

    if (response.data?.success) {
      if (web) {
        Store.dispatch(setUserDetails(response?.data?.data?.user));
        Store.dispatch(setHeaderToken(response?.data?.data?.user));
        const userRole = response?.data?.data?.user?.role;
        if (userRole) {
          ShowToast(response?.data?.message, "success");
          switch (userRole) {
            case "agency":
              navigation('/dashboradScreen');
              break;
            case "doctor":
              navigation('/dashboard');
              break;
            case "patient":
              navigation('/Dashboradpatient');
              break;
            default:
              navigation('/');
          }
        } else {
          ShowToast("User role is not defined", "warning");
          console.error('User role is not defined');
        }
      } else {
        console.log("here============================>>>>")
      }
    } else {
      console.log("----->");
      ShowToast(response.error);
    }

  } catch (error) {
    console.log(error, '===>>>')
  }
};


export const clearEmptyData = (data) => {
  if (Array.isArray(data)) {
    return data
      .map(clearEmptyData)
      .filter(item => item !== null && item !== undefined &&
        !(Array.isArray(item) && item.length === 0) &&
        !(typeof item === 'object' && Object.keys(item).length === 0) &&
        item !== '');
  } else if (typeof data === 'object' && data !== null) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      const cleanedValue = clearEmptyData(value);
      if (cleanedValue !== null && cleanedValue !== undefined &&
        !(Array.isArray(cleanedValue) && cleanedValue.length === 0) &&
        !(typeof cleanedValue === 'object' && Object.keys(cleanedValue).length === 0) &&
        cleanedValue !== '') {
        acc[key] = cleanedValue;
      }
      return acc;
    }, {});
  }
  return data;
};
