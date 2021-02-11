import { SET_TABLE_DATA } from "../actions/Types";

const initialState = {};

export default function Table(state = initialState, action: any) {
  switch (action.type) {
    case SET_TABLE_DATA:
      return {
        ...state,
        payload: action.payload.table,
      };
    default:
      return state;
  }
}
