'use client';

import React, { useEffect, useState } from "react";
import MglistaPanel from "./panels/mglistaPanel";
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
  const [errorsTimeline, setErrorsTimeline] = useState<ErrorsTimeline>();
  const [score, setScore] = useState<number>();
  const [videoURL, setVideoURL] = useState<string>();
  const videoRef = React.useRef<HTMLVideoElement>();

  useEffect(() => {
    const response = localStorage.getItem('response');
    if (response) {
      const parsedData = JSON.parse(response);

      setErrorsTimeline(parsedData.errors);
      setVideoURL(parsedData.video_url);

      // const score = Math.round(Math.min(Math.random() * 10 + errorsNum * 7, 86));
      setScore(70);
    }
  }, []);

  return (
    <main style={container}>
        <video controls>
          <source src={videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>      
      { errorsTimeline?.map( error => <ErrorPanel error={error} videoRef={videoRef}></ErrorPanel> ) }
    </main>
  );
};

const container = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '15px',
    padding: '15px 15px 30px 15px'
}

const videoColumn = {
    flexGrow: 2,
    maxWidth: '570px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
}

const errorColumn = {
    flexGrow: 1,
    maxWidth: '285px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
}

const questionColumn = {
    flexGrow: 1,
    maxWidth: '285px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
}

export default PageContent;