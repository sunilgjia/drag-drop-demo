import { useState } from "react";
import Table from "./components/Table";
import {
  DropTableMockData,
  CommonDragTableMockData,
  MasterDragTableMockData,
} from "./shared/mocks/table.mock";

import { Table as TableEnum } from "./shared/enums/table";
import { Table as TableInterface } from "./shared/interface/table";
import { useDispatch, useSelector } from "react-redux";
import { setTableData } from "./redux/actions/Table";

function App() {
  const [headers] = useState(["ID", "Name", "User name", "Email", "Address"]);
  const [dropTableData, setDopTableData] = useState(DropTableMockData);
  const [commonDragTableData, setCommonDragTableData] = useState(
    CommonDragTableMockData
  );
  const [masterDragTableData, setMasterDragTableData] = useState(
    MasterDragTableMockData
  );
  const [draggable, setDraggable] = useState({
    index: 0,
    type: TableEnum.CommonDrag,
  });

  const drag = (event: any) => {
    setDraggable(event);
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
      const data = dropTableData;
      data.splice(event.index, 0, object);
      setDopTableData([...data]);
    } else if (event.type === TableEnum.CommonDrag) {
      const data = commonDragTableData;
      data.splice(event.index, 0, object);
      setCommonDragTableData([...data]);
    } else if (event.type === TableEnum.MasterDrag) {
      const data = masterDragTableData;
      data.splice(event.index, 0, object);
      setMasterDragTableData([...data]);
    }
  };

  const getDraggableObject = (index: number, type: TableEnum) => {
    const data =
      type === TableEnum.CommonDrag ? commonDragTableData : masterDragTableData;
    const object = data[index];
    data.splice(index, 1);
    type === TableEnum.CommonDrag
      ? setCommonDragTableData([...data])
      : setMasterDragTableData([...data]);
    return object;
  };

  // Fetch updated data from redux
  const tableData = useSelector((state: any) => state.Table?.tableData);

  // Dispatch updated data to set in redux store
  const dispatch = useDispatch();
  dispatch(setTableData({}));

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Table
            title="Drop table"
            type={TableEnum.Drop}
            headers={headers}
            data={dropTableData}
            drag={drag}
            drop={drop}
          />
          <Table
            title="Common Drag table"
            type={TableEnum.CommonDrag}
            headers={headers}
            data={commonDragTableData}
            drag={drag}
            drop={drop}
          />
          <Table
            title="Master drag table"
            type={TableEnum.MasterDrag}
            headers={headers}
            data={masterDragTableData}
            drag={drag}
            drop={drop}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
