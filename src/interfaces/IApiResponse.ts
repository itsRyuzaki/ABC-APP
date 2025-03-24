export type ApiResponse<T> = {
  data: T | null;
  isLoading: boolean;
  hasError: boolean;
};

export interface IErrorDetails {
  code: number;
  details: string[];
}

export type RawApiResponse<T> = {
    data: T | null;
    success: boolean;
    errorDetails?: IErrorDetails;
}

