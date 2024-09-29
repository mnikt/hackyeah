'use client';

import { FormEvent, FormEventHandler, useState } from "react";
import { Button, FileInput, Spinner } from "@blueprintjs/core";
import AddedFileLabel from "../../molecules/AddedFileLabel";

type FileUploaderProps = {
  multipleUpload: boolean;
  onSubmit: (files: File[]) => Promise<void>;
}

const FileUploader: React.FC<FileUploaderProps> = ({ multipleUpload, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [addedFiles, setAddedFiles] = useState<Array<File>>([]);


  const handleInputChange: FormEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files as FileList;

    setAddedFiles(Object.values(files));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);


    try {
      setLoading(true);
      await onSubmit(addedFiles);
    } catch (error) {
      setError(`Wystąpił błąd podczas analizy pliku: ${error ? error.message : ''}`);
      console.error(error);
    }
    setLoading(false);
  }

  const handleRemove = (fileName: string) => {
    const reducedList = addedFiles.filter(file => file.name !== fileName);
    setAddedFiles(reducedList);
  }

  return (
    <div>
      <form action="/api" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        { loading ? <Spinner /> :
        (
        <div>
          <div>
            <FileInput inputProps={{multiple: multipleUpload}} large disabled={false} text="wybierz plik" buttonText="Wybierz" onInputChange={handleInputChange} />
          </div>
          {addedFiles.map(file => <AddedFileLabel key={file.name} fileName={file.name} handleRemove={handleRemove}/>)}
        </div>
        )
        }
        <div style={submitBtnBoxStyle}>
          <Button disabled={false} type="submit" text="Wrzuć do analizy" style={primaryButton} />
          {error && <p style={errorStyle}>{error}</p>}
        </div>
      </form>
    </div>
  )
};

const primaryButton = {
  padding: '15px 30px',
  backgroundColor: '#407bff',
  color: '#fff',
  border: 'none',
  borderRadius: '15px',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s'
}

const submitBtnBoxStyle = {
  marginTop: '16px',
}

const errorStyle = {
  color: 'red',
  marginTop: '6px',
}

export default FileUploader;
