import { Campaign } from './campaign.interface';

export interface Request {
  _id?: string;
  user: string;
  campaign: string | undefined | Campaign;
  isSentByCreator: boolean;
  status?: 'pending' | 'accepted' | 'rejected';
}
