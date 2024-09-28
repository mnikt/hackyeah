import React from "react";
import FoundErrorsPanel from "./panels/foundErrorsPanel";
import MglistaPanel from "./panels/mglistaPanel";
import KeywordPanel from "./panels/keywordPanel";
import SummaryPanel from "./panels/summaryPanel";
import VidInfoPanel from "./panels/vidInfoPanel";
import TimelinePanel from "./panels/timelinePanel";
import VideoPanel from "./panels/VideoPanel";
import WordSuggestionPanel from "./panels/wordSuggestionPanel";
import QuestionsPanel from "./panels/questionsPanel";
import ErrorsPanel from "./panels/errorsPanel";
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

  const errors = [
    { origin: "Wszystkie usługi resortu", text: "Typowy błąd byłby napisany tutaj z sugestią jakąś.", tag: "video", timestamp: "0:17s" },
    { origin: "zdiagnozowało przyczynę", text: "Typowy błąd byłby napisany tutaj z sugestią jakąś.", tag: "audio", timestamp: "0:25s" },
    { origin: "Sytuacja była spowodowana problemami technicznymi.", text: "Typowy błąd byłby napisany tutaj z sugestią jakąś.", tag: "text", timestamp: "0:40s" },
    { origin: "i rozwiązało problem.", text: "Typowy błąd byłby napisany tutaj z sugestią jakąś.", tag: "video", timestamp: "1:12s" },
    { origin: "a dane podatników niezagrożone.", text: "Typowy błąd byłby napisany tutaj z sugestią jakąś.", tag: "audio", timestamp: "0:30s" },
  ];
  

const PageContent = () => {
  return (
    <main style={container}>
        <div style={videoColumn}>
            <VideoPanel videoSrc="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
            <TimelinePanel textDictionary={textDictionary} />
            <ErrorsPanel errors={errors} />
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