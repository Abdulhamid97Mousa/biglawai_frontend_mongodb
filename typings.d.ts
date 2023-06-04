interface Message {
  text: string;
  messageId: string;
  checked: boolean;
  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
}

interface AskOurAPI{
  id?: string,
  query: string,
  ts_path: string|null,
  hide_pii: false,
  output_language: "english",
  response: string | null,
  outline?: dry_lease_of_aircraft,
  chat_history?: {}
}

interface OurAPIResponse{
  response: string,
  finish_reason: string,
  total_tokens: 0,
  message_id: string
}

