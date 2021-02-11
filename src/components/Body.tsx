import React from "react";

// interface & enum
import { Table as TableEnum } from "../shared/enums";
import { Draggable } from "../shared/interface";

// components
import Row from "./Row";

interface IBodyType {
  data: any[];
  type: TableEnum;
  draggable: Draggable;
  drag: any;
  drop: any;
}

const Body = ({ data, type, draggable, drag, drop }: IBodyType) => {
  return (
    <tbody>
      {data.map((item, index) => {
        return (
          <Row
            item={item}
            key={index}
            index={index}
            type={type}
            draggable={draggable}
            drag={drag}
            drop={drop}
          />
        );
      })}
    </tbody>
  );
};

export default Body;
