export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimestampEntity {
  createdAt: Date;
  updatedAt: Date;
}
