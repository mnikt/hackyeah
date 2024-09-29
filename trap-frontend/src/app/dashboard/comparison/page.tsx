'use client';

import Header from "@/app/components/header";
import FileUploader from "@/app/components/organisms/FileUploader";
import { Card } from "@blueprintjs/core";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import generatePDF from 'react-to-pdf';

type TimestampedError = {
  timestamp: string;
  description: string;
}
type ComparisonReport = Array<{title: string, errors: TimestampedError[]}>;
type ComparisonData = Array<ComparisonReport>;

const ComparisonPage = () => {
  const [comparisonData, setComparisonData] = useState<ComparisonData>();
  const router = useRouter();

  useEffect(() => {
    const response = localStorage.getItem('comparison');
    if (response) {
      const parsedData = JSON.parse(response);

      const comparison = parsedData.comparison;

      const fileNames = Object.keys(comparison);
      const data: ComparisonData = [];
      fileNames.forEach(fileName => {
        const errorsKeys = Object.keys(comparison[fileName]);

        const dataForFile = errorsKeys.map((errorKey) => ({
          title: errorKey,
          errors: [{
            timestamp: comparison[fileName][errorKey].timestamp,
            description: comparison[fileName][errorKey].description,
          }]
        }))
        data.push(dataForFile);
      });

      setComparisonData(data);
    }
  }, []);

  const handleSubmit = async (files: File[]) => {
    const formData = new FormData();

    files.forEach((file, idx) => {
      formData.append(`file_${idx}`, file);
    })


    try {
      const response = await fetch("http://34.118.88.52:8000/comparison", {
        method: "POST",
        body: formData,
      });


      const jsonResponse = await response.json();
      console.log('comparison: ', jsonResponse);

      const fileNames = Object.keys(jsonResponse.comparison);
      const data: ComparisonData = [];
      fileNames.forEach(fileName => {
        const errorsKeys = Object.keys(jsonResponse.comparison[fileName]);

        const dataForFile = errorsKeys.map((errorKey) => ({
          title: errorKey,
          errors: [{
            timestamp: jsonResponse.comparison[fileName][errorKey].timestamp,
            description: jsonResponse.comparison[fileName][errorKey].description,
          }]
        }))
        data.push(dataForFile);
      });

      setComparisonData(data);

      localStorage.setItem('comparison', JSON.stringify(jsonResponse));
    } catch (error) {
      console.error(error);
    }
  };

  const targetRef = useRef(null);

  return (
    <div style={pageStyle}>
      <Header action={() => generatePDF(targetRef, {filename: 'raport.pdf'})} />

      <div style={container} ref={targetRef}>
        <Card style={titleStyle}>
          <h1 style={title}>Porównaj nagrania</h1>
          <p style={subtitle}>Możliwe jest dodanie tylko dwóch filmów do porówniania. Możliwy czas oczekiwania na odpowiedź może być dłuższy niż przy zwykłej analizie.</p>
          <p style={subtitle}>Aby dodać dwa pliki naraz naley wcisnąć control/cmd</p>
          <FileUploader multipleUpload={true} onSubmit={handleSubmit} />
        </Card>

        {comparisonData && (
          <div style={comparisonContainerStyle}>
            <Card style={comparisonReportContainerStyle}>
              {comparisonData[0].map(dataForFile => (
                <div key={dataForFile.title}>
                  <h4>{dataForFile.title}</h4>
                  <div>
                    <p>{dataForFile.errors[0].timestamp}</p>
                    <p>{dataForFile.errors[0].description}</p>
                  </div>
                </div>
              ))}
            </Card>
            <Card style={comparisonReportContainerStyle}>
              {comparisonData[1].map(dataForFile => (
                  <div key={dataForFile.title}>
                    <h4>{dataForFile.title}</h4>
                    <div>
                      <p>{dataForFile.errors[0].timestamp}</p>
                      <p>{dataForFile.errors[0].description}</p>
                    </div>
                  </div>
                ))}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const pageStyle = {
  fontFamily: 'sans-serif',
  margin: 0,
  boxSizing: 'border-box',
  maxWidth: '100%',
  maxHeight: '100%',
  minWidth: '100vw',
  minHeight: '100vh',
  backgroundColor: '#fff'
}

const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '15px',
  padding: '15px 15px 30px 15px'
}

const titleStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
}

const title = {
  fontSize: '28px',
  fontWeight: 'bold'
}

const subtitle = {
  fontSize: '16px',
  fontWeight: 'regular'
}

const comparisonContainerStyle = {
  marginTop: '10px',
  display: 'flex',
}

const comparisonReportContainerStyle = {
  marginRight: '10px',
  marginLeft: '10px',
}

export default ComparisonPage
