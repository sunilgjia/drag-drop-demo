// interface & enum
import { Table as TableEnum } from "../shared/enums";
import { Draggable, Table } from "../shared/interface";

interface IRowType {
  item: Table;
  index: number;
  type: TableEnum;
  draggable: Draggable;
  drag: any;
  drop: any;
}

const Row = ({ item, index, type, draggable, drag, drop }: IRowType) => {
  const dragOver = (event: any) => {
    event.preventDefault();
  };

  return (
    <tr
      draggable={type !== TableEnum.Drop && !item?.isDroped}
      onDragStart={() => drag({ index, type })}
      onDrop={() => drop({ index, type })}
      onDragOver={(event) => dragOver(event)}
      className={
        (item?.isDroped ? "table-active not-allowed" : "") +
        (draggable.type === type && draggable.index === index
          ? " table-success"
          : "")
      }
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
