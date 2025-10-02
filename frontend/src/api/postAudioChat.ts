export async function postAudioChat(formData: FormData) {
  const backendHost = window.location.hostname; // dynamically picks LAN IP
  console.log("Posting Audio chat message:", formData);
  const response = await fetch(`http://${backendHost}:5001/chat`, {
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
