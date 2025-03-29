import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import { Dispatch, FC } from "react";
import { IFileConfig } from "../../interfaces/IFileUpload";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface IFileUpload {
  buttonClass?: string;
  label: string;
  controlName: string;
  acceptedTypes: string[];
  files: IFileConfig[];
  setFiles: Dispatch<React.SetStateAction<IFileConfig[]>>;
  maxLimit: number;
}

const  FileUpload: FC<IFileUpload> = ({
  buttonClass,
  label,
  controlName,
  acceptedTypes,
  files,
  setFiles,
  maxLimit,
}) => {
  return (
    <>
      {files.map((fileConfig) => (
        <div
          className="p-4 flex flex-col shadow-lg shadow-gray-900"
          key={fileConfig.id}
        >
          <IconButton
            className="min-w-auto! bottom-10 left-10 self-end"
            color="error"
            onClick={() =>
              setFiles((prevFiles) =>
                prevFiles.filter((prevFile) => prevFile.id !== fileConfig.id)
              )
            }
          >
            <CancelIcon fontSize="large" />
          </IconButton>
          <img
            src={URL.createObjectURL(fileConfig.file)}
            alt={fileConfig.file.name}
            className="object-contain h-64 mb-4"
          />
          <TextField
            fullWidth
            required
            name={`altText@@${fileConfig.id}`}
            label="Image Description"
            variant="outlined"
          />
        </div>
      ))}

      {files.length < maxLimit ? (
        <Button
          className={buttonClass}
          variant="contained"
          component="label"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          {label}
          <VisuallyHiddenInput
            type="file"
            name={controlName}
            accept={acceptedTypes.join(", ")}
            onChange={(event) => {
              const file = event.target.files?.item(0);
              if (file) {
                setFiles((prevFile) =>
                  prevFile.concat([{ file, id: uuidv4(), altText: "" }])
                );
              }
            }}
          />
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default FileUpload;
