export interface IPost {
  _id?: number;
  creator: number;
  message: string;
  createdAt?: number;
  updatedAt?: number;
  deleted: boolean;
}
