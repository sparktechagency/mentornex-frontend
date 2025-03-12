export type TApiResponse<T> = {
      success: string;
      message: string;
      data?: T;
};
export type TApiResponseWithPagination<T = any> = {
      success: string;
      message: string;
      data?: {
            pagination?: {
                  page: number;
                  limit: number;
                  total: number;
            };
            data?: T;
      };
};

export type TQueryParams = {
      name: string;
      value: string;
};
