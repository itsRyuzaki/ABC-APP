export interface IImageDetails {
  altText: string;
  order: number;
  source: string;
}


export interface IAccessoriesDetails {
  accessoryGuid: string;
  name: string;
  description: string;
  specification: string[];
  inBoxDetails: string[];
  sellerName: string;
  discountedPrice: number;
  originalPrice: number;
  imageDetails: IImageDetails[];
  brand: string;
  category: string;
  subCategory: string;
  availableCount: number;
}
