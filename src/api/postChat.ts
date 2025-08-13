export async function postChat(message: string) {
  console.log("Posting chat message:", message);
  const response = await fetch("http://localhost:5001/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to post chat message");
  }

  const data = await response.json();
  console.log(data);
  return data;
}
