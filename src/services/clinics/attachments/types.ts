import { PaginationProps } from '@/types/app/pagination';
import { IClinicAttachment } from '@/types/entities/IClinic';

export type GetAttachmentRequest = PaginationProps & { id: string };
export type GetAttachmentResponse = IClinicAttachment[];

export type UploadAttachmentResponse = {
  Location: string;
};

export type CreateAttachmentRequest = {
  description: string;
  clinicId: string;
  url: string;
};
export type CreateAttachmentResponse = IClinicAttachment;
