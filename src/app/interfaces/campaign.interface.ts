import { User } from './user';

export interface Campaign {
  _id?: string;
  creator: User;
  title: string;
  description: string;
  playersNeeded: number;
  currentPlayers: User[];
  createdAt?: number;
  updatedAt?: number;
  img?: string;
}
