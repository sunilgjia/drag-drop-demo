import React from "react";

// interface & enum
import { Table as TableEnum } from "../shared/enums";

// components
import Row from "./Row";

interface IBodyType {
  data: any[];
  type: TableEnum;
  drag: any;
  drop: any;
}

const Body = ({ data, type, drag, drop }: IBodyType) => {
  return (
    <tbody>
      {data.map((item, index) => {
        return (
          <Row
            item={item}
            key={index}
            index={index}
            type={type}
            drag={drag}
            drop={drop}
          />
        );
      })}
    </tbody>
  );
};

export default Body;
