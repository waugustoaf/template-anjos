import { ICategory } from '@/types/entities/ICategory';
import {ICampignFull} from "@/types/entities/ICampaign";
import {IBoardCampaignCompact} from "@/types/entities/IBoardCampaign";

export type ListCategoriesResponse = ICategory[];
export type CreateCategoryResponse = ICategory;
export type GetCampaignResponse = ICampignFull;
export type ListBoardsCompact = IBoardCampaignCompact[];
