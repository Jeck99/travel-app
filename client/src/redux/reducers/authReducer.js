
import { SET_CURRENT_PROFILE, PROFILE_LOADING } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_PROFILE:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}