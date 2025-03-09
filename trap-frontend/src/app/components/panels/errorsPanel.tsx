'use client';

import React, { useEffect, useRef } from "react";

type TimelinedError = {
  description: string;
  timestamp: string; // czas w sekundach, np. "2"
  positionX: number;
  positionY: number;
  size: number;
};

function timeStringToSeconds(time: string): number {
  // Rozdzielamy minuty oraz sekundy z milisekundami
  const [minutesStr, secondsMillisStr] = time.split(':');
  if (!secondsMillisStr) {
    throw new Error("Niepoprawny format czasu. Oczekiwano formatu mm:ss.mmm");
  }

  // Rozdzielamy sekundy od milisekund
  const [secondsStr, millisStr] = secondsMillisStr.split('.');
  if (millisStr === undefined) {
    throw new Error("Niepoprawny format czasu. Oczekiwano formatu mm:ss.mmm");
  }

  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);
  const millis = parseInt(millisStr, 10);

  return minutes * 60 + seconds + millis / 1000;
}

const ErrorPanel = (props: { error: TimelinedError; videoRef: React.MutableRefObject<HTMLVideoElement | null> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = props.videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const errorTimestamp = timeStringToSeconds(props.error.timestamp) || 3;

    const captureFrame = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = video.videoWidth || 720;
      canvas.height = video.videoHeight || 1280;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    };

    const handleSeeked = () => {
      captureFrame();
      video.removeEventListener("seeked", handleSeeked);
    };

    video.addEventListener("seeked", handleSeeked);
    video.currentTime = errorTimestamp;

    return () => {
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [props.error.timestamp, props.videoRef]);

  return (
    <div>
      <div style={errorsContainer}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

const errorsContainer = {
  marginTop: "15px",
  display: "flex",
  gap: "10px"
};

export default ErrorPanel;