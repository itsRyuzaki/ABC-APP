export interface IAccessoryList {
  id: number;
  name: string;
  description: string;
  price: string;
  imageURLs: string[];
}

export interface IAccessoriesDetails {
  name: string;
  description: string;
  specification: string[];
  inBoxDetails: string[];
  sellerName: string;
  ourPrice: string;
  imageURLs: { alt: string; src: string }[];
  brand: string;
  category: string;
  subCategory: string;
}
