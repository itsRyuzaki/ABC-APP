import TextField from "@mui/material/TextField";
import FileUpload from "../../../shared/FileUpload/FileUpload";
import { FC, FormEventHandler, useRef, useState } from "react";
import { IFileConfig } from "../../../interfaces/IFileUpload";
import Button from "@mui/material/Button";
import { postData } from "../../../services/accessories-service";
import { ENDPOINTS } from "../../../config/endpoints";
import { IBrandDetails } from "../../../interfaces/IApiModels";
import { ExtractFormData } from "../../../utils/formUtils";

interface IManageBrand {
  saveBrand: (modelDetails: IBrandDetails) => void;
  accessoryType: string;
}

const ManageBrand: FC<IManageBrand> = ({
  saveBrand,
  accessoryType,
}) => {
  const [imageFiles, setImageFiles] = useState<IFileConfig[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.append("file", imageFiles[0].file);
    formData.append("type", accessoryType);

    formData.append(
      "altText",
      formData.get(`altText@@${imageFiles[0].id}`) as string
    );

    const response = await postData<FormData, number>(
      ENDPOINTS.brands,
      formData
    );

    if (response.success && response.data && formRef.current) {
      saveBrand({
        ...ExtractFormData(formRef.current),
        id: response.data,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="m-8" ref={formRef}>
        <TextField
          fullWidth
          required
          name="name"
          label="Name"
          variant="outlined"
          className="mb-4!"
        />
        <TextField
          fullWidth
          required
          name="officialSite"
          label="Official Site"
          variant="outlined"
          className="mb-4!"
        />
        <FileUpload
          label="Add Image"
          controlName="files"
          acceptedTypes={["image/*", "video/*"]}
          files={imageFiles}
          setFiles={setImageFiles}
          maxLimit={1}
        />

        <div className="flex mt-4 justify-end">
          <Button variant="contained" color="secondary" type="submit">
            Save Details
          </Button>
        </div>
      </form>
    </>
  );
};

export default ManageBrand;
