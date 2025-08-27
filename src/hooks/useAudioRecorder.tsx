import { useRef, useState } from "react";

export default function useAudioRecorder(
  onAudioSend?: (formData: FormData) => void
) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e: BlobEvent) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });
      const formData = new FormData();
      formData.append("audio", audioBlob, "recorded.webm");
      await onAudioSend?.(formData);
      stream.getTracks().forEach((t) => t.stop());
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setRecording(true);

    // Auto-stop after 15s
    setTimeout(stopRecording, 15000);

    // Silence detection
    const ctx = new AudioContext();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.fftSize);
    let silenceStart = performance.now();
    const THRESHOLD = 10;
    const DURATION = 3000;

    const checkSilence = () => {
      analyser.getByteTimeDomainData(dataArray);
      const avg =
        dataArray.reduce((a, v) => a + Math.abs(v - 128), 0) / dataArray.length;

      if (avg < THRESHOLD) {
        if (performance.now() - silenceStart > DURATION) {
          stopRecording();
          ctx.close();
          return;
        }
      } else {
        silenceStart = performance.now();
      }
      if (mediaRecorder.state !== "inactive")
        requestAnimationFrame(checkSilence);
    };
    requestAnimationFrame(checkSilence);
  };

  return { recording, startRecording, stopRecording };
}
