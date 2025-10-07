export async function postChat(message: string) {
  const backendHost =
    import.meta.env.VITE_BACKEND_URL ||
    `http://${window.location.hostname}:5001`; // dynamically picks LAN IP
  console.log("Posting chat message:", message, "to", backendHost);
  const response = await fetch(`${backendHost}/chat`, {
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
