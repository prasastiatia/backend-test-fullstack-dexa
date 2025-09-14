import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidStatusCampaignException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        code: 'INVALID_STATUS',
        message: `Campaign is already active/paused/stopped`,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class NotExistCampaignException extends HttpException {
  constructor(message: string) {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        code: 'Data Not Found',
        message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class NotAuthorizedCampaignException extends HttpException {
  constructor(message: string) {
    super(
      {
        status: 'error',
        code: 'UNAUTHORIZED',
        message,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class NotValidCampaignException extends HttpException {
  constructor(message: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        code: 'VALIDATION_ERROR',
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
