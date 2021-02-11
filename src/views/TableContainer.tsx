import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import Table from "../components/Table";

// actions
import { setTableData } from "../redux/actions/Table";

// interface & enums
import { Table as TableEnum } from "../shared/enums/Table";
import { Draggable } from "../shared/interface";
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

  /**
   * Used to get dummy draggale object
   */
  const getDummyDraggableValue = (): Draggable => {
    return {
      index: -1,
      type: TableEnum.Drop,
    };
  };

  const [draggable, setDraggable] = useState<Draggable>(
    getDummyDraggableValue()
  );

  /**
   * Used to set drag object
   * @param event
   */
  const drag = (event: Draggable) => {
    setDraggable(event);
  };

  /**
   * Used to get draggable object
   * @param dragObj
   * @param dropObj
   */
  const getDraggableObject = (dragObj: Draggable, dropObj: Draggable) => {
    const list =
      dragObj.type === TableEnum.CommonDrag
        ? commonDragTableList
        : masterDragTableList;

    const object = list[dragObj.index];
    if (dropObj.type !== TableEnum.Drop) {
      list.splice(dragObj.index, 1);
    } else {
      list[dragObj.index].isDroped = true;
    }
    dragObj.type === TableEnum.CommonDrag
      ? dispatch(setTableData({ commonDragTableList: [...list] }))
      : dispatch(setTableData({ masterDragTableList: [...list] }));
    return object;
  };

  /**
   * Used to set drop object
   * @param dropObject
   */
  const drop = (dropObject: Draggable) => {
    setDraggable(getDummyDraggableValue);
    if (!(dropObject.type === draggable.type || dropObject.type === TableEnum.Drop)) {
      return;
    }
    const object: TableInterface = getDraggableObject(draggable, dropObject);
    object.isDroped = !(
      dropObject.index === draggable.index && dropObject.type === draggable.type
    );
    switch (dropObject.type) {
      case TableEnum.Drop: {
        const data = dropTableList;
        data.splice(dropObject.index, 0, object);
        dispatch(setTableData({ dropTableList: [...data] }));
        break;
      }
      case TableEnum.CommonDrag: {
        const data = commonDragTableList;
        data.splice(dropObject.index, 0, object);
        dispatch(setTableData({ commonDragTableList: [...data] }));
        break;
      }
      case TableEnum.MasterDrag: {
        const data = masterDragTableList;
        data.splice(dropObject.index, 0, object);
        dispatch(setTableData({ masterDragTableList: [...data] }));
        break;
      }
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
            draggable={draggable}
            drag={drag}
            drop={drop}
          />
          <Table
            title="Common Drag table"
            type={TableEnum.CommonDrag}
            headers={commonHeaders}
            data={commonDragTableList}
            draggable={draggable}
            drag={drag}
            drop={drop}
          />
          <Table
            title="Master drag table"
            type={TableEnum.MasterDrag}
            headers={commonHeaders}
            data={masterDragTableList}
            draggable={draggable}
            drag={drag}
            drop={drop}
          />
        </div>
      </div>
    </div>
  );
}

export default TableContainer;
