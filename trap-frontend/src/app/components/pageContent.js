import React from "react";
import FoundErrorsPanel from "./panels/foundErrorsPanel";
import MglistaPanel from "./panels/mglistaPanel";
import KeywordPanel from "./panels/keywordPanel";
import SummaryPanel from "./panels/summaryPanel";
import VidInfoPanel from "./panels/vidInfoPanel";
import TimelinePanel from "./panels/timelinePanel";
import VideoPanel from "./panels/VideoPanel";

const keywords = [
    "cooked soup", 
    "cooked soup", 
    "cooked soup extr", 
    "kostka rosołowa", 
    "cooked", 
    "cooked soup", 
    "super bad"
  ];

  const textDictionary = {
    1: [
      { text: "Wszystkie usługi resortu", highlight: true },
      { text: " są już dostępne, a dane podatników niezagrożone.", highlight: false }
    ],
    2: [
      { text: "Sytuacja była spowodowana problemami technicznymi.", highlight: false }
    ],
    3: [
      { text: "Centrum Informatyki ", highlight: false },
      { text: "zdiagnozowało przyczynę", highlight: true },
      { text: " i rozwiązało problem.", highlight: false }
    ],
    4: [
    { text: "Wszystkie usługi resortu", highlight: true },
    { text: " są już dostępne, a dane podatników niezagrożone.", highlight: false }
    ],
    5: [
    { text: "Sytuacja była spowodowana problemami technicznymi.", highlight: false }
    ],
    6: [
    { text: "Centrum Informatyki ", highlight: false },
    { text: "zdiagnozowało przyczynę", highlight: true },
    { text: " i rozwiązało problem.", highlight: false }
    ]
  };

const PageContent = () => {
  return (
    <main style={container}>
        <div style={videoColumn}>
            <VideoPanel videoSrc="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
            <TimelinePanel textDictionary={textDictionary} />
            <VidInfoPanel videoDuration="31" videoSize="76" date="14.10.2024" textWordCount="473" textSize="53" />
        </div>

        <div style={errorColumn}>
            <FoundErrorsPanel videoErrors={7} audioErrors={11} textErrors={9} />

            <SummaryPanel summary="Na podstawie załączonego zrzutu ekranu, analiza tekstu oraz wideo dotyczy sprawdzenia treści pod kątem błędów językowych, złożoności tekstu i proponowanych sugestii poprawy. Indeks mglistości (Fog Index) wynosi 75, co sugeruje, że tekst jest trudny do zrozumienia. Znaleziono 21 błędów, podzielonych na różne kategorie (np. 4 błędy merytoryczne, 11 stylowych i 6 innych). System wyświetla również sugestie dotyczące doboru słów, fraz kluczowych oraz zawiera pytania diagnostyczne dotyczące tekstu. Cały proces opiera się na analizie audiowizualnej oraz tekstowej, wspieranej przez automatyczne sugestie poprawy i ocenę czytelności." />
        </div>

        <div style={questionColumn}>
            <MglistaPanel score={33}/>

            <KeywordPanel keywords={keywords} />
        </div>
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
    paddingTop: '15px'
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