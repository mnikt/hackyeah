'use client';

import { FormEvent, FormEventHandler, useState } from "react";
import { Button, FileInput, Spinner } from "@blueprintjs/core";
import AddedFileLabel from "../../molecules/AddedFileLabel";
import { useRouter } from "next/navigation";

const FileUploader = () => {
  const [loading, setLoading] = useState(false);
  const [addedFiles, setAddedFiles] = useState<Array<File>>([]);

  const router = useRouter();

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
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api", {
        method: "POST",
        body: formData,
      });

      const jsonResponse = await response.json();
      localStorage.setItem('response', JSON.stringify(jsonResponse));

      router.push('/dashboard');
      setLoading(false);
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
      <form action="/api" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          { loading ? <Spinner /> :
            <FileInput inputProps={{multiple: true}} large disabled={false} text="wybierz plik" buttonText="Wybierz" onInputChange={handleInputChange} />
          }
        </div>
        {addedFiles.map(file => <AddedFileLabel key={file.name} fileName={file.name} handleRemove={handleRemove}/>)}
        <div>
          <Button disabled={loading} type="submit" text="Wrzuć do analizy"/>
        </div>
      </form>
    </div>
  )
};

export default FileUploader;
