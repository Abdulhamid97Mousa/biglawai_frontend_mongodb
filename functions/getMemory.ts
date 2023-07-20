const getMemory = async (chatId: string) => {
  // Send a fetch request to the GetMemory API
  const res = await fetch(`/api/GetMemory?chatId=${chatId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch memory from the API");
  }
  const memory = await res.json();

  return memory;
};

export default getMemory;
