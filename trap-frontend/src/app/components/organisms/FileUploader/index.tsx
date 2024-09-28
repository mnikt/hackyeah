'use client';

import { FormEvent, FormEventHandler, useState } from "react";
import { Button, FileInput } from "@blueprintjs/core";
import AddedFileLabel from "../../molecules/AddedFileLabel";

const FileUploader = () => {
  const [addedFiles, setAddedFiles] = useState<Array<File>>([]);

  console.log('addedFiles: ', addedFiles)

  const handleInputChange: FormEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files as FileList;

    setAddedFiles(Object.values(files));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    addedFiles.forEach((file, idx) => {
      formData.append(`file_${idx}`, file);
    })


    try {
      const response = await fetch("http://34.118.88.52:8000/api", {
        method: "POST",
        body: formData,
      });

      console.log('response: ', response);
    } catch (error) {
      console.error(error);
    }
  }

  const handleRemove = (fileName: string) => {
    const reducedList = addedFiles.filter(file => file.name !== fileName);
    setAddedFiles(reducedList);
  }

  return (
    <div>
      <p>Dodaj jeden lub dwa nagrania</p>
      <form action="/api" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          <FileInput inputProps={{multiple: true}} large disabled={false} text="wybierz plik" buttonText="Wybierz" onInputChange={handleInputChange} />
        </div>
        <div>
          <Button type="submit" text="Wrzuć do analizy"/>
        </div>
      </form>
      {addedFiles.map(file => <AddedFileLabel key={file.name} fileName={file.name} handleRemove={handleRemove}/>)}
    </div>
  )
};

export default FileUploader;
