import { IsOptional, IsPositive, IsInt, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => parseInt(value))
  limit: number = 20;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
