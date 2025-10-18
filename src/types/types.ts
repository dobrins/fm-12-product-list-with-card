export type TDessert = {
  id: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
};

export type CartLine = {
  id: TDessert["id"];
  qty: number;
};
