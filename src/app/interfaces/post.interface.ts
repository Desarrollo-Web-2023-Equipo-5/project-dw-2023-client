export interface IPost {
  _id?: number;
  creator: string;
  title: string;
  message: string;
  createdAt?: number;
  updatedAt?: number;
  deleted: boolean;
  category: string;
}
