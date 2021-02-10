import React from "react";
import { Table } from "../shared/interface/table";
import { Table as TableEnum } from "../shared/enums/table";

interface IRowType {
  item: Table;
  index: number;
  type: TableEnum;
  drag: any;
  drop: any;
}

const Row = ({ item, index, type, drag, drop }: IRowType) => {
  const dragOver = (event: any) => {
    event.preventDefault();
  };

  return (
    <tr
      draggable={type !== TableEnum.Drop && !item?.isDroped}
      onDragStart={(event) => drag({ index, type })}
      onDrop={(event) => drop({ index, type })}
      onDragOver={(event) => dragOver(event)}
      className={item?.isDroped ? "table-active" : ""}
    >
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>
        <div>
          {item.address.street}, {item.address.suite},
        </div>
        <div>
          {item.address.city}, {item.address.zipcode}
        </div>
      </td>
    </tr>
  );
};

export default Row;
