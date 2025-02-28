export type TApiResponse<T> = {
      success: string;
      message: string;
      data?: T;
      pagination?: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
      };
};

export type TQueryParams = {
      name: string;
      value: string | number;
};
