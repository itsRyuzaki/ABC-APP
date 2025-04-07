import { IKeyValuePair, ISellerDetails } from "./IApiModels";
import { IFileConfig } from "./IFileUpload";

export interface IVariantState {
  isLoading: boolean;
  id: string;
  initialData: IAccessoryVariantData | null;
}

export interface IAccessoryVariantData {
  description: string;
  sellerPrice: string;
  abcPrice: string;
  specifications: string;
  inBoxItems: string;
  [k:`altText@@${string}`]: string;
  [k:`attributeKey@@${string}`]: string;
  [k:`attributeValue@@${string}`]: string;
  files?: File[];
  availableCount: number;
}

export interface IAccessoryVariantEmittedData {
  imageFiles: IFileConfig[];
  seller: ISellerDetails;
}

export interface IBaseAccessoryFormData {
  name: string;
  category: string;
  deviceModel: string;
  brand: string;
}
