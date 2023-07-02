import { User } from './user';

export interface Comment {
  id?: string;
  userRef?: string | null;
  postRef?: string | null;
  content: string;
  creator: User;
}
