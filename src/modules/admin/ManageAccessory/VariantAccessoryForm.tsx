import { Autocomplete, Button, TextField } from "@mui/material";
import { FC, FormEventHandler, Ref, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IKeyValuePair } from "../../../interfaces/IApiModels";
import { IAccessoryVariantData } from "../../../interfaces/IManageAccessory";
import FileUpload from "../../../shared/FileUpload/FileUpload";
import { IFileConfig } from "../../../interfaces/IFileUpload";

interface IVariantAccessoryForm {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  ref: Ref<HTMLFormElement>;
  masterAttributes: IKeyValuePair<string, string[]>[];
  initialData: IAccessoryVariantData | null;
}

const VariantAccessoryForm: FC<IVariantAccessoryForm> = ({
  ref,
  handleSubmit,
  masterAttributes,
  initialData,
}) => {
  const [disabledAttributes, setDisabledAttributes] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<IFileConfig[]>([]);

  const gridClass =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

  return (
    <>
      <form ref={ref} onSubmit={handleSubmit}>
        <div className={`${gridClass} mb-4`}>
          <FileUpload
            buttonClass="mb-4! col-start-1 size-fit"
            label="Add Image"
            controlName="files"
            acceptedTypes={["image/*", "video/*"]}
            files={imageFiles}
            setFiles={setImageFiles}
            maxLimit={6}
          />

          <TextField
            name="description"
            label="Description"
            className="md:col-span-2 col-start-1!"
            fullWidth
            multiline
            required
            maxRows={4}
            defaultValue={initialData?.description}
          />
          <TextField
            fullWidth
            required
            name="sellerPrice"
            defaultValue={initialData?.sellerPrice}
            label="Seller Price"
          />
          <TextField
            fullWidth
            required
            name="abcPrice"
            label="ABC Price"
            defaultValue={initialData?.abcPrice}
          />
          <TextField
            name="specifications"
            label="Specifications"
            className="md:col-span-2"
            multiline
            fullWidth
            helperText="Separate details in new line"
            required
            defaultValue={initialData?.specifications}
          />
          <TextField
            name="inBoxItems"
            label="Items in Box"
            className="md:col-span-2"
            multiline
            fullWidth
            helperText="Separate details in new line"
            required
            defaultValue={initialData?.inBoxItems}
          />
        </div>

        <h4 className="mb-4">Attributes:</h4>

        <div className={`${gridClass} items-center mb-4`}>
          {masterAttributes
            .filter((attribute) => attribute.key && attribute.value.length)
            .map((attribute) => (
              <div key={attribute.id}>
                {disabledAttributes.find((val) => val === attribute.id) ? (
                  <div className="p-4 shadow-lg shadow-gray-900 text-center">
                    <p className="mb-8 text-base">
                      Click below to enable "{attribute.key}" attribute.
                    </p>
                    <Button
                      className="min-w-auto!"
                      color="success"
                      variant="contained"
                      onClick={() =>
                        setDisabledAttributes((prevAttr) =>
                          prevAttr.filter((attr) => attr !== attribute.id)
                        )
                      }
                    >
                      Enable
                    </Button>
                  </div>
                ) : (
                  <div
                    className="col-span-1 grid grid-cols-1 gap-6
                   shadow-lg shadow-gray-900 p-4"
                  >
                    <Button
                      className="justify-self-end min-w-auto! p-2!"
                      color="error"
                      variant="contained"
                      onClick={() =>
                        setDisabledAttributes((prevAttr) =>
                          prevAttr.concat([attribute.id as string])
                        )
                      }
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
                    <TextField
                      disabled
                      name={`attributeKey@@${attribute.id}`}
                      label="Attribute"
                      defaultValue={attribute.key}
                    />
                    <Autocomplete
                      options={attribute.value}
                      getOptionLabel={(option) => option}
                      isOptionEqualToValue={(option, value) => option == value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          name={`attributeValue@@${attribute.id}`}
                          label="Value"
                          required
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </form>
    </>
  );
};

export default VariantAccessoryForm;
