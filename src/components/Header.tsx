const Header = ({ headers }: any) => {
  return (
    <thead>
      <tr>
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
