export type TApiResponse<T> = {
      success: string;
      message: string;
      data?: T;
};

export type TQueryParams = {
      name: string;
      value: string;
};
