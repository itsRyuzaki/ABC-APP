import TextField from "@mui/material/TextField";
import FileUpload from "../../../shared/FileUpload/FileUpload";
import { FC, FormEventHandler, useState } from "react";
import { IFileConfig } from "../../../interfaces/IFileUpload";
import Button from "@mui/material/Button";
import { postData } from "../../../services/accessories-service";
import { ENDPOINTS } from "../../../config/endpoints";
import { ICategoryDetails } from "../../../interfaces/IApiModels";
import { ExtractFormData } from "../../../utils/formUtils";
import { ACCESSORY_TYPES } from "../../../config/variation";

interface IManageCategory {
  saveCategory: (categoryDetails: ICategoryDetails) => void;
}

const ManageCategory: FC<IManageCategory> = ({ saveCategory }) => {
  const [imageFiles, setImageFiles] = useState<IFileConfig[]>([]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.append("file", imageFiles[0].file);
    formData.append("type", ACCESSORY_TYPES.mobiles);

    formData.append(
      "altText",
      formData.get(`altText@@${imageFiles[0].id}`) as string
    );

    const response = await postData<FormData, number>(
      ENDPOINTS.categories,
      formData
    );

    if (response.success && response.data) {
      saveCategory({
        ...ExtractFormData(event.target as HTMLFormElement),
        id: response.data,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="m-8">
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
          name="description"
          label="Description"
          variant="outlined"
          multiline
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

export default ManageCategory;
