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