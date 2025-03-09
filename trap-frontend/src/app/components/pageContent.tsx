'use client';

import React, { useEffect, useRef, useState } from "react";
import ErrorPanel from "./panels/errorsPanel";

type TimelinedError = {
  description: string;
  timestamp: string;
  positionX: number;
  positionY: number;
  size: number;
};

type ErrorsTimeline = Array<TimelinedError>;

const PageContent = () => {
  const [errorsTimeline, setErrorsTimeline] = useState<ErrorsTimeline>([]);
  const [score, setScore] = useState<number>(0);
  const [videoURL, setVideoURL] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Pobieramy dane z localStorage
  useEffect(() => {
    const response = localStorage.getItem("response");
    if (response) {
      try {
        const parsedData = JSON.parse(response);
        setVideoURL(parsedData.video_url);
        setErrorsTimeline(parsedData.errors);
        setScore(70); // Przykładowa wartość wyniku
      } catch (error) {
        console.error("Błąd przy parsowaniu danych z localStorage:", error);
      }
    }
  }, []);

  // Ustawienie źródła wideo po zmianie videoURL
  useEffect(() => {
    if (videoRef.current && videoURL) {
      videoRef.current.src = videoURL;
      videoRef.current.load();
    }
  }, [videoURL]);         

  return (
    <main style={container}>
      {videoURL && (
        <>
          <video
            controls
            key={videoURL}
            ref={videoRef}
            src={videoURL}
            style={videoStyle}
          ></video>
          <div style={errorsColumn}>
            {errorsTimeline.map((error, idx) => (
              <ErrorPanel error={error} videoRef={videoRef} key={idx} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column", // Ustawienie kolumnowego układu
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  padding: "15px"
};

const videoStyle = {
  width: "100%",
  maxWidth: "800px"
};

const errorsColumn = {
  display: "flex",
  flexDirection: "column", // Układ kolumnowy dla paneli błędów
  gap: "15px",
  width: "100%",
  alignItems: "center"
};

export default PageContent;