import { SET_TABLE_DATA } from "../actions/Types";

// mocks
import {
  DropTableMockData,
  CommonDragTableMockData,
  MasterDragTableMockData,
} from "../../shared/mocks";

const initialState = {
  commonHeaders: ["#", "Name", "User name", "Email", "Address"],
  dropTableList: DropTableMockData,
  commonDragTableList: CommonDragTableMockData,
  masterDragTableList: MasterDragTableMockData,
};

export default function Table(state = initialState, action: any) {
  switch (action.type) {
    case SET_TABLE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
