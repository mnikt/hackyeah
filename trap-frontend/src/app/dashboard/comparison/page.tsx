'use client';

import Header from "@/app/components/header";
import FileUploader from "@/app/components/organisms/FileUploader";
import { Card } from "@blueprintjs/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      const response = await fetch("http://localhost:8000/comparison", {
        method: "POST",
        body: formData,
      });


      const jsonResponse = await response.json();
      console.log('comparison: ', jsonResponse);

      const fileNames = Object.keys(jsonResponse.comparison);
      const data: ComparisonData = [];
      fileNames.forEach(fileName => {
        const errorsKeys = Object.keys(jsonResponse[fileName]);

        const dataForFile = errorsKeys.map((errorKey) => ({
          title: errorKey,
          errors: [{
            timestamp: jsonResponse[fileName][errorKey].timestamp,
            description: jsonResponse[fileName][errorKey].description,
          }]
        }))
        data.push(dataForFile);
      })

      setComparisonData(data);

      localStorage.setItem('comparison', JSON.stringify(jsonResponse));
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div style={pageStyle}>
      <Header />
      <div style={titleStyle}>
        <h1>Porównaj nagrania</h1>
        <p>Możliwe jest dodanie tylko dwóch filmów do porówniania. Możliwy czas oczekiwania na odpowiedź może być dłuższy niż przy zwykłej analizie</p>
      </div>
      <Card style={uploadContainerStyle}>
        <h3>Dodaj filmy do porówniania</h3>
        <FileUploader multipleUpload={true} onSubmit={handleSubmit} />
      </Card>
      {comparisonData?.length && (
        <div style={comparisonContainerStyle}>
          <Card style={comparisonReportContainerStyle}>
            {comparisonData[0].map(dataForFile => (
              <div>
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
                <div>
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
  );
};

const pageStyle = {
  padding: '10px'
}

const titleStyle = {
  marginTop: '40px',
  marginBottom: '20px',
  marginLeft: '10px',
}

const uploadContainerStyle = {
  marginLeft: '10px',
  width: '500px',
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
