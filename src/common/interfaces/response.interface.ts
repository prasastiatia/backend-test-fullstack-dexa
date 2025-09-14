interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponseSuccess<T = any> {
  status: string;
  data?: T;
  errors?: string[];
}

export interface ApiResponsePaginateStaffListSuccess<T = any> {
  status: string;
  data: {
    staff: T[]; // Array dari tipe generic T
    pagination: Pagination;
  };
  errors?: string[];
}
