import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_PROFILE, PROFILE_LOADING } from "./types";
import { registerProfile,loginProfileApi } from "../../service/profile.service";

// Register Profile
export const registerNewProfile = (profileData, history) => dispatch => {
  registerProfile(profileData)
    .then(res => history.push("/"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get profile token
export const loginProfile = (profileData, history)  => dispatch => {
  loginProfileApi(profileData)
    .then(res => {
      // Save to localStorage and Set token to localStorage
      localStorage.setItem("jwtToken", res.token);
      // Set token to Auth header
      setAuthToken(res.token);
      // Decode token to get profile data
      const decoded = jwt_decode(res.token);
      // Set current profile
      dispatch(setCurrentProfile(decoded));
      history.push("/")
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.message
      })
    );
};

// Set logged in profile
export const setCurrentProfile = decoded => {
  return {
    type: SET_CURRENT_PROFILE,
    payload: decoded
  };
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Log profile out
export const logoutProfile = history => dispatch => {
  console.log(history);
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current profile to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentProfile({}));
  history.push("/");
};