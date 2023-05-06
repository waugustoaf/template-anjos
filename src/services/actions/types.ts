export type ActionMessageRequest = {
  customerId: string;
  boardId: string;
  message: string;
}

export type ActionConversationRequest = {
  customerId: string;
  boardId: string;
  resume: string;
}

export type ActionScheduleRequest = {
  id: string;
  customerId: string;
  boardId: string;
  date: string;
  resume: string;
  confirm1: boolean;
  confirm2: boolean;
  confirmed: boolean;
}

export type ActionAppointmentRequest = {
  customerId: string;
  boardId: string;
  date: string;
  resume: string;
}

export type ActionSaleRequest = {
  customerId: string;
  boardId: string;
  productId: string;
  strategySaleId: string;
  productValue: number;
}


export type ActionSetTagRequest = {
  customerId: string;
  boardId: string;
  tagIds: string[];
}

export type ActionDeleteSaleRequest = {
  customerId: string;
  saleId: string;
}