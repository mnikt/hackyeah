import { Button, Card, Elevation } from "@blueprintjs/core"

type AddedFileLabelProps = {
  fileName: string;
  handleRemove: (fileName: string) => void;
}

const AddedFileLabel: React.FC<AddedFileLabelProps> = ({ fileName, handleRemove }) => {
  return (
    <Card interactive={true} elevation={Elevation.TWO} className="flex">
      <p>{fileName}</p>
      <Button icon="remove" onClick={() => handleRemove(fileName)}/>
    </Card>
  )
};

export default AddedFileLabel