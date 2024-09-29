import { Button, Card, Elevation } from "@blueprintjs/core"

type AddedFileLabelProps = {
  fileName: string;
  handleRemove: (fileName: string) => void;
}

const AddedFileLabel: React.FC<AddedFileLabelProps> = ({ fileName, handleRemove }) => {
  return (
    <Card interactive={true} elevation={Elevation.TWO} style={{display: "flex", justifyContent: "flex-start", alignItems: 'center'}}>
      <p style={{marginBottom: 0}}>{fileName}</p>
      <Button icon="delete" style={{marginLeft: "6px"}} onClick={() => handleRemove(fileName)}/>
    </Card>
  )
};

export default AddedFileLabel