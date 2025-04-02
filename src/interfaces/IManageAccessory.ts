import { IKeyValuePair } from "./IApiModels";

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
  attributes?: IKeyValuePair<string, string[]>[];
  files?: File[];
  availableCount: number;
}

export interface IBaseAccessoryFormData {
  name: string;
  category: string;
  deviceModel: string;
  brand: string;
}
