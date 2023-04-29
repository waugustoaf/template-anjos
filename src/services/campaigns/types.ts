import {IBoardCampaign, IBoardCampaignCompact,} from '@/types/entities/IBoardCampaign';
import {ICampaign, ICampaignFull} from '@/types/entities/ICampaign';
import {IStrategyCampaignCompact} from "@/types/entities/IStrategyCampaigns";

export type ListCampaignsResponse = ICampaign[];
export type CreateCampaignResponse = ICampaignFull;
export type GetCampaignResponse = ICampaignFull;
export type ListBoardsCompact = IBoardCampaignCompact[];
export type ListStrategiesCompact = IStrategyCampaignCompact[];
export type ListBoards = IBoardCampaign[];
