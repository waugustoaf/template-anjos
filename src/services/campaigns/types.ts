import { IBoardCampaignCompact } from '@/types/entities/IBoardCampaign';
import { ICampaign, ICampaignFull } from '@/types/entities/ICampaign';

export type ListCampaignsResponse = ICampaign[];
export type CreateCampaignResponse = ICampaign;
export type GetCampaignResponse = ICampaignFull;
export type ListBoardsCompact = IBoardCampaignCompact[];
