import { Campaign } from './campaign.interface';
import { User } from './user';

export interface Notification {
  title: string;
  user: string;
  type: Campaign | User;
}
