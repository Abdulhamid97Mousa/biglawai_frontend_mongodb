
// Utility function to check the response
const checkResponse = async (res: Response) => {
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data = await res.json();
  return data;
};

const getStreamed = async (messageId: string) => {
  const res = await fetch(`/api/GetStreamed`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messageId }),
  });

  return checkResponse(res);
};

const editMessage = async (messageId: string, newContent: string) => {
  const res = await fetch(`/api/EditMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messageId, newContent }),
  });

  return checkResponse(res);
};

const likeMessage = async (messageId: string) => {
  const res = await fetch(`/api/LikeMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messageId }),
  });

  return checkResponse(res);
};

const undoLikeMessage = async (messageId: string) => {
  const res = await fetch(`/api/UndoLikeMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messageId }),
  });

  return checkResponse(res);
};

const dislikeMessage = async (messageId: string) => {
  const res = await fetch(`/api/DislikeMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messageId }),
  });

  return checkResponse(res);
};

const undoDislikeMessage = async (messageId: string) => {
  const res = await fetch(`/api/UndoDislikeMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messageId }),
  });

  return checkResponse(res);
};

const deleteMessage = async (messageId: string) => {
  const res = await fetch(`/api/DeleteMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messageId }),
  });

  return checkResponse(res);
};

export {
  getStreamed,
  editMessage,
  likeMessage,
  undoLikeMessage,
  dislikeMessage,
  undoDislikeMessage,
  deleteMessage,
};
