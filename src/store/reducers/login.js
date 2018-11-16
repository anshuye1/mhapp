import * as types from '../constants'
import {AsyncStorage} from "react-native";

const initialState = {
  token: null
}
const login = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
          token: action.payload,
      }
    default:
      return state
  }
}

export default login
