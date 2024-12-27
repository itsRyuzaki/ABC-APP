export type ApiResponse<T> = {
  data: T | null;
  isLoading: boolean;
  hasError: boolean;
};

export type RawApiResponse<T> = {
    data: T | null;
    success: boolean;
    errorDetails?: string[];
}

