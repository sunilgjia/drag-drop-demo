export interface Table {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  isDroped?: boolean;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
