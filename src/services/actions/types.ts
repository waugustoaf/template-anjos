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
  customerId: string;
  boardId: string;
  date: string;
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