import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Table from "../components/Table";

// actions
import { setTableData } from "../redux/actions/Table";

// interface & enums
import { Table as TableEnum } from "../shared/enums/Table";
import { Table as TableInterface } from "../shared/interface/Table";

function TableContainer() {
  // Fetch updated data from redux
  const commonHeaders = useSelector((state: any) => state.Table.commonHeaders);
  const dropTableList = useSelector((state: any) => state.Table.dropTableList);
  const commonDragTableList = useSelector(
    (state: any) => state.Table.commonDragTableList
  );
  const masterDragTableList = useSelector(
    (state: any) => state.Table.masterDragTableList
  );

  // Dispatch updated data to set in redux store
  const dispatch = useDispatch();

  const [draggable, setDraggable] = useState({
    index: 0,
    type: TableEnum.CommonDrag,
  });

  const drag = (event: any) => {
    setDraggable(event);
  };

  const getDraggableObject = (index: number, type: TableEnum) => {
    const data =
      type === TableEnum.CommonDrag ? commonDragTableList : masterDragTableList;
    const object = data[index];
    data.splice(index, 1);
    type === TableEnum.CommonDrag
      ? dispatch(setTableData({ commonDragTableList: [...data] }))
      : dispatch(setTableData({ masterDragTableList: [...data] }));
    return object;
  };
  const drop = (event: any) => {
    if (event.type === draggable.type || event.type !== TableEnum.Drop) {
      return;
    }
    const object: TableInterface = getDraggableObject(
      draggable.index,
      draggable.type
    );
    object.isDroped = true;

    if (event.type === TableEnum.Drop) {
      const data = dropTableList;
      data.splice(event.index, 0, object);
      dispatch(setTableData({ dropTableList: [...data] }));
    } else if (event.type === TableEnum.CommonDrag) {
      const data = commonDragTableList;
      data.splice(event.index, 0, object);
      dispatch(setTableData({ commonDragTableList: [...data] }));
    } else if (event.type === TableEnum.MasterDrag) {
      const data = masterDragTableList;
      data.splice(event.index, 0, object);
      dispatch(setTableData({ masterDragTableList: [...data] }));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Table
            title="Drop table"
            type={TableEnum.Drop}
            headers={commonHeaders}
            data={dropTableList}
            drag={drag}
            drop={drop}
          />
          <Table
            title="Common Drag table"
            type={TableEnum.CommonDrag}
            headers={commonHeaders}
            data={commonDragTableList}
            drag={drag}
            drop={drop}
          />
          <Table
            title="Master drag table"
            type={TableEnum.MasterDrag}
            headers={commonHeaders}
            data={masterDragTableList}
            drag={drag}
            drop={drop}
          />
        </div>
      </div>
    </div>
  );
}

export default TableContainer;
