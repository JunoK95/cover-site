export async function postAudioChat(formData: FormData) {
  const backendHost =
    import.meta.env.VITE_BACKEND_URL ||
    `http://${window.location.hostname}:5001`; // dynamically picks LAN IP
  console.log("Posting Audio chat message:", formData);
  const response = await fetch(`${backendHost}/chat`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to post audio chat message");
  }

  const data = await response.json();
  console.log(data);
  return data;
}
