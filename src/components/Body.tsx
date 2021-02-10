import React from "react";
import Row from "./Row";
import { Table as TableEnum } from "../shared/enums/table";

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
        return <Row item={item} key={index} index={index} type={type} drag={drag} drop={drop} />;
      })}
    </tbody>
  );
};

export default Body;
