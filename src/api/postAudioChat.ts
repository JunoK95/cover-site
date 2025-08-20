export async function postAudioChat(formData: FormData) {
  console.log("Posting Audio chat message:", formData);
  const response = await fetch("http://localhost:5001/chat", {
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
