'use client';

import React, { useEffect, useState } from "react";
import FoundErrorsPanel from "./panels/foundErrorsPanel";
import MglistaPanel from "./panels/mglistaPanel";
import KeywordPanel from "./panels/keywordPanel";
import SummaryPanel from "./panels/summaryPanel";
import VidInfoPanel from "./panels/vidInfoPanel";
import TimelinePanel from "./panels/timelinePanel";
import VideoPanel from "./panels/VideoPanel";
import WordSuggestionPanel from "./panels/wordSuggestionPanel";
import QuestionsPanel from "./panels/questionsPanel";
// import ErrorsPanel from "./panels/errorsPanel";
import AudiencePanel from "./panels/audiencePanel";

const keywords = [
    "cooked soup", 
    "cooked soup", 
    "cooked soup extr", 
    "kostka rosołowa", 
    "cooked", 
    "cooked soup", 
    "super bad"
  ];

  const educationLevel = {
    PRIMARY: { title: 'Podstawowe', emoji: '📚' },
    SECONDARY: { title: 'Średnie', emoji: '🎒' },
    HIGHER: { title: 'Wyższe', emoji: '🎓' }
  };
  
  // Define the "knowledgeLevel" enum
  const knowledgeLevel = {
    GENERAL: { title: 'Ogólne', emoji: '📝' },
    ACADEMIC: { title: 'Akademickie', emoji: '🧑‍🔬' },
    BUSINESS: { title: 'Biznesowe', emoji: '💼' },
  };

  const questions = [
    "Typowy błąd byłby napisany tutaj z sugestią jakąś.",
    "Typowy błąd byłby napisany tutaj z sugestią jakąś.",
    "Typowy błąd byłby napisany tutaj z sugestią jakąś.",
    "Typowy błąd byłby napisany tutaj z sugestią jakąś.",
    "Typowy błąd byłby napisany tutaj z sugestią jakąś.",
    "Typowy błąd byłby napisany tutaj z sugestią jakąś.",
    "Typowy błąd byłby napisany tutaj z sugestią jakąś.",
    "Typowy błąd byłby napisany tutaj z sugestią jakąś.",
    "Typowy błąd byłby napisany tutaj z sugestią jakąś.",
    "Typowy błąd byłby napisany tutaj z sugestią jakąś."
  ];

type DerivedError = {
  timestamp: string;
  description: string;
}

type TimelinedError = {
  errorName: string;
  derivedErrors: Array<DerivedError>;
};

type ErrorsTimeline = Array<TimelinedError>;
  

const PageContent = () => {
  const [errorsTimeline, setErrorsTimeline] = useState<ErrorsTimeline>();

  useEffect(() => {
    const response = localStorage.getItem('response');
    if (response) {
      const parsedErrors = JSON.parse(response);
      const timelinedErrors = parsedErrors.timelined_errors[0];
      const keys = Object.keys(timelinedErrors);

      const errors: ErrorsTimeline = [];
      keys.forEach(key => {
        const timelinedError: TimelinedError = {
          errorName: key,
          derivedErrors: timelinedErrors[key] as DerivedError[],
        }
        errors.push(timelinedError)
      })

      setErrorsTimeline(errors);
    }
  }, []);

  console.log('errorsTimeline: ', errorsTimeline);

  return (
    <main style={container}>
        <div style={videoColumn}>
            <VideoPanel videoSrc="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
            <TimelinePanel timelinedErrors={errorsTimeline}/>
            {/* <ErrorsPanel errors={errors} /> */}
        </div>

        <div style={errorColumn}>
            <FoundErrorsPanel videoErrors={7} audioErrors={11} textErrors={9} />
            <SummaryPanel summary="Na podstawie załączonego zrzutu ekranu, analiza tekstu oraz wideo dotyczy sprawdzenia treści pod kątem błędów językowych, złożoności tekstu i proponowanych sugestii poprawy. Indeks mglistości (Fog Index) wynosi 75, co sugeruje, że tekst jest trudny do zrozumienia. Znaleziono 21 błędów, podzielonych na różne kategorie (np. 4 błędy merytoryczne, 11 stylowych i 6 innych). System wyświetla również sugestie dotyczące doboru słów, fraz kluczowych oraz zawiera pytania diagnostyczne dotyczące tekstu. Cały proces opiera się na analizie audiowizualnej oraz tekstowej, wspieranej przez automatyczne sugestie poprawy i ocenę czytelności." />
            <QuestionsPanel questions={questions} />
        </div>

        <div style={questionColumn}>
            <VidInfoPanel videoDuration="0:31" videoSize="76" date="14.10.2024" textWordCount="473" textSize="53" />
            <MglistaPanel score={33}/>

            <AudiencePanel title="Grupa Odbiorcza" 
                icon={educationLevel.HIGHER.emoji}
                label={educationLevel.HIGHER.title}
                icon2={knowledgeLevel.BUSINESS.emoji}
                label2={knowledgeLevel.BUSINESS.title}
            />

            <WordSuggestionPanel keywords={keywords} />

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