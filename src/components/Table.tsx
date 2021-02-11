import React from "react";
import { Table as TableInterface } from "../shared/interface";

// components
import Body from "./Body";
import Header from "./Header";

// interface & enum
import { Table as TableEnum } from "../shared/enums/Table";

interface ITableType {
  title: string;
  type: TableEnum;
  headers: string[];
  data: TableInterface[];
  drag: any;
  drop: any;
}

const Table = ({ title, type, data, headers, drag, drop }: ITableType) => {
  return (
    <div className="table-responsive">
      <h2>{title}</h2>
      <table className="table">
        <Header headers={headers} />
        <Body data={data} type={type} drag={drag} drop={drop} />
      </table>
    </div>
  );
};

export default Table;
