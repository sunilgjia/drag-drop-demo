import { SET_TABLE_DATA } from "./Types";

export const setTableData = (tableData: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: SET_TABLE_DATA,
      payload: tableData,
    });
    resolve("");
  });
};
