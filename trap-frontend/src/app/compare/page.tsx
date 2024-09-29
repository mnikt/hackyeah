import React from 'react';
import Image from 'next/image'; // Next.js image component for better optimization
import styles from '../css/Home.module.css'; // Import custom CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Header from "../components/header"
import FoundErrorsPanel from "../components/panels/foundErrorsPanel";
import MglistaPanel from "../components/panels/mglistaPanel";
import KeywordPanel from "../components/panels/keywordPanel";
import SummaryPanel from "../components/panels/summaryPanel";
import VidInfoPanel from "../components/panels/vidInfoPanel";
import TimelinePanel from "../components/panels/timelinePanel";
import VideoPanel from "../components/panels/VideoPanel";
import WordSuggestionPanel from "../components/panels/wordSuggestionPanel";
import QuestionsPanel from "../components/panels/questionsPanel";
import ErrorsPanel from "../components/panels/errorsPanel";
import AudiencePanel from "../components/panels/audiencePanel";

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
  

export default function Home() {
  return (
    <div style={containerLarge}>
        <Header />

        <main style={container}>
            <div style={subContainer}>
                <VideoPanel videoSrc="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" style={video} />
                <div style={columns}>
                <div style={errorColumn}>
                    <SummaryPanel summary="Na podstawie załączonego zrzutu ekranu, analiza tekstu oraz wideo dotyczy sprawdzenia treści pod kątem błędów językowych, złożoności tekstu i proponowanych sugestii poprawy. Indeks mglistości (Fog Index) wynosi 75, co sugeruje, że tekst jest trudny do zrozumienia. Znaleziono 21 błędów, podzielonych na różne kategorie (np. 4 błędy merytoryczne, 11 stylowych i 6 innych). System wyświetla również sugestie dotyczące doboru słów, fraz kluczowych oraz zawiera pytania diagnostyczne dotyczące tekstu. Cały proces opiera się na analizie audiowizualnej oraz tekstowej, wspieranej przez automatyczne sugestie poprawy i ocenę czytelności." />
                    <FoundErrorsPanel videoErrors={7} audioErrors={11} textErrors={9} />
                    <ErrorsPanel errors={errors} />
                </div>

                <div style={questionColumn}>
                    {/* <VidInfoPanel videoDuration="0:31" videoSize="76" date="14.10.2024" textWordCount="473" textSize="53" /> */}
                    <MglistaPanel score={33}/>

                    <AudiencePanel title="Grupa Odbiorcza" 
                        icon={educationLevel.HIGHER.emoji}
                        label={educationLevel.HIGHER.title}
                        icon2={knowledgeLevel.BUSINESS.emoji}
                        label2={knowledgeLevel.BUSINESS.title}
                    />

                    <QuestionsPanel questions={questions} />
                </div>
                </div>
                
            </div>

            <div style={subContainer}>
                <VideoPanel videoSrc="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" style={video} />
                <div style={columns}>
                <div style={errorColumn}>
                    <SummaryPanel summary="Na podstawie załączonego zrzutu ekranu, analiza tekstu oraz wideo dotyczy sprawdzenia treści pod kątem błędów językowych, złożoności tekstu i proponowanych sugestii poprawy. Indeks mglistości (Fog Index) wynosi 75, co sugeruje, że tekst jest trudny do zrozumienia. Znaleziono 21 błędów, podzielonych na różne kategorie (np. 4 błędy merytoryczne, 11 stylowych i 6 innych). System wyświetla również sugestie dotyczące doboru słów, fraz kluczowych oraz zawiera pytania diagnostyczne dotyczące tekstu. Cały proces opiera się na analizie audiowizualnej oraz tekstowej, wspieranej przez automatyczne sugestie poprawy i ocenę czytelności." />
                    <FoundErrorsPanel videoErrors={7} audioErrors={11} textErrors={9} />
                    <ErrorsPanel errors={errors} />
                </div>

                <div style={questionColumn}>
                    {/* <VidInfoPanel videoDuration="0:31" videoSize="76" date="14.10.2024" textWordCount="473" textSize="53" /> */}
                    <MglistaPanel score={33}/>

                    <AudiencePanel title="Grupa Odbiorcza" 
                        icon={educationLevel.HIGHER.emoji}
                        label={educationLevel.HIGHER.title}
                        icon2={knowledgeLevel.BUSINESS.emoji}
                        label2={knowledgeLevel.BUSINESS.title}
                    />

                    <QuestionsPanel questions={questions} />
                </div>
                </div>
            </div>
            
        </main>
    </div>
  );
}

const containerLarge = {
    fontFamily: 'sans-serif',
    margin: 0,
    boxSizing: 'border-box',
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100vw',
    minHeight: '100vh',
    backgroundColor: '#fff',
    color: '#333'
}

const container = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '50px',
    padding: '15px 15px 30px 15px'
}

const video = {
    maxWidth: '575px',
    width: '100%'
}

const subContainer = {
    maxWidth: '100%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '15px',
}

const columns = {
    maxWidth: '575px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '15px',
}

const videoColumn = {
    flexGrow: 2,
    maxWidth: '570px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
}

const errorColumn = {
    flexGrow: 1,
    maxWidth: '277.5px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
}

const questionColumn = {
    flexGrow: 1,
    maxWidth: '277.5px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
}