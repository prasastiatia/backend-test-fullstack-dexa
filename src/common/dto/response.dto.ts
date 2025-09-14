import {
  ApiResponseSuccess,
  ApiResponsePaginateStaffListSuccess,
} from '../interfaces/response.interface';

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export class ResponseSuccessDto<T = any> implements ApiResponseSuccess<T> {
  statusResponse: string;
  data?: T;
  errors?: string[];
  status: string;

  constructor(statusResponse: string, data?: T, errors?: string[]) {
    this.status = statusResponse;
    this.data = data;
    this.errors = errors;
  }
}

export class ResponseSuccessStaffListPaginateDto<T = any>
  implements ApiResponsePaginateStaffListSuccess<T>
{
  status: string;
  data: {
    staff: T[];
    pagination: Pagination;
  };
  errors?: string[];

  constructor(
    status: string,
    staff: T[],
    pagination: Pagination,
    errors?: string[],
  ) {
    this.status = status;
    this.data = {
      staff,
      pagination,
    };
    this.errors = errors;
  }
}

export class PaginatedResponseDataStaffListDto<
  T,
> extends ResponseSuccessStaffListPaginateDto<T> {
  constructor(
    status: string,
    data: T[],
    page: number,
    limit: number,
    total: number,
    errors?: string[],
  ) {
    const totalPages = Math.ceil(total / limit);
    const pagination: Pagination = { page, limit, total, totalPages };
    super(status, data, pagination, errors);
  }
}

export class ResponseDeleteDto<T = any> implements ApiResponseSuccess<T> {
  statusResponse: string;
  message: string;
  errors?: string[];
  status: string;

  constructor(statusResponse: string, message: string, errors?: string[]) {
    this.status = statusResponse;
    this.message = message;
    this.errors = errors;
  }
}
