'use client';

import React, { useEffect, useState } from "react";
import FoundErrorsPanel from "./panels/foundErrorsPanel";
import MglistaPanel from "./panels/mglistaPanel";
import KeywordPanel from "./panels/keywordPanel";
import SummaryPanel from "./panels/summaryPanel";
import VidInfoPanel from "./panels/vidInfoPanel";
import TimelinePanel from "./panels/timelinePanel";
import VideoPanel from "./panels/videoPanel";
import WordSuggestionPanel from "./panels/wordSuggestionPanel";
import QuestionsPanel from "./panels/questionsPanel";
// import ErrorsPanel from "./panels/errorsPanel";
import AudiencePanel from "./panels/audiencePanel";
import { Spinner } from "@blueprintjs/core";
import SemanticsPanel, { Semantics } from "./organisms/SemanticsPanel";

  const educationLevelMap = {
    podstawowe: { title: 'Podstawowe', emoji: '📚' },
    średnie: { title: 'Średnie', emoji: '🎒' },
    wyższe: { title: 'Wyższe', emoji: '🎓' }
  };
  
  // Define the "knowledgeLevel" enum
  const knowledgeLevelMap = {
    ogólne: { title: 'Ogólne', emoji: '📝' },
    akademickie: { title: 'Akademickie', emoji: '🧑‍🔬' },
    biznesowe: { title: 'Biznesowe', emoji: '💼' },
  };

type DerivedError = {
  timestamp: string;
  description: string;
}

type TimelinedError = {
  errorName: string;
  derivedErrors: Array<DerivedError>;
};

type ErrorsTimeline = Array<TimelinedError>;

type Stats = {
  duration: string;
  size: number;
  score: number;
  wordCount: number;
};

const PageContent = () => {
  const [errorsTimeline, setErrorsTimeline] = useState<ErrorsTimeline>();
  const [educationLevel, setEducationLevel] = useState<'PRIMARY' | 'SECONDARY' | 'HIGHER'>();
  const [knowledgeLevel, setKnowledgeLevel] = useState<'GENERAL' | 'ACADEMIC' | 'BUSINESS'>();
  const [summary, setSummary] = useState<string>();
  const [questions, setQuestions] = useState<Array<string>>();
  const [keywords, setKeywords] = useState<Array<string>>();
  const [stats, setStats] = useState<Stats>();
  const [semantics, setSemantics] = useState<Semantics>();
  const [fileName, setFileName] = useState<string>();

  useEffect(() => {
    const response = localStorage.getItem('response');
    setFileName(localStorage.getItem("fileName") as string);
    if (response) {
      const parsedData = JSON.parse(response);
      const timelinedErrors = parsedData.timelined_errors[0];
      const keys = Object.keys(timelinedErrors);

      const errors: ErrorsTimeline = [];
      keys.forEach(key => {
        const timelinedError: TimelinedError = {
          errorName: key,
          derivedErrors: timelinedErrors[key] as DerivedError[],
        }
        errors.push(timelinedError);
      })

      setErrorsTimeline(errors);

      setEducationLevel(parsedData.education_level);
      setKnowledgeLevel(parsedData.interest_level);
      setSummary(parsedData.summary);
      setQuestions(parsedData.questions);
      setKeywords(parsedData.keywords);
      setStats({
        duration: parsedData.video_duration,
        size: parsedData.video_size,
        score: parsedData.overall_score,
        wordCount: parsedData.word_count,
      });
      setSemantics(parsedData.semantic_analysis);
    }
  }, []);

  return (
    <main style={container}>
        <div style={videoColumn}>
            <VideoPanel videoSrc={`http://34.118.88.52:99/${fileName}`} />
            {/* <TimelinePanel timelinedErrors={errorsTimeline}/> */}
            {/* <ErrorsPanel errors={errors} /> */}
        </div>

        <div style={errorColumn}>
            <FoundErrorsPanel videoErrors={7} audioErrors={11} textErrors={9} />
            {!summary ? <Spinner /> : <SummaryPanel summary={summary} />}
            {!questions ? <Spinner /> : <QuestionsPanel questions={questions} />}
        </div>

        <div style={questionColumn}>
            {!stats ? 
              <Spinner /> :
              <VidInfoPanel videoDuration={stats.duration} videoSize={stats.size} textWordCount={stats.wordCount} textSize={"0"} />
            }
            {
              !semantics ?
              <Spinner /> : <SemanticsPanel voice={semantics.voice} expression={semantics.expression} impact={semantics.impact} integrity={semantics.integrity} />
            }
            <MglistaPanel score={33}/>

            {!educationLevel || !knowledgeLevel ? 
              <Spinner /> : 
              <AudiencePanel title="Grupa Odbiorcza"
                  icon={educationLevelMap[educationLevel].emoji}
                  label={educationLevelMap[educationLevel].title}
                  icon2={knowledgeLevelMap[knowledgeLevel].emoji}
                  label2={knowledgeLevelMap[knowledgeLevel].title}
              />
            }

            <WordSuggestionPanel keywords={keywords} />
            {!keywords ? <Spinner /> : <KeywordPanel keywords={keywords} />}
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