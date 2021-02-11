interface IHeaderType {
  headers: string[];
}

const Header = ({ headers }: IHeaderType) => {
  return (
    <thead>
      <tr className="table-secondary">
        {headers.map((header: string, index: number) => {
          return (
            <th scope="col" key={index}>
              {header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default Header;
