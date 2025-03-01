import { Button, Divider, styled, TextField } from "@mui/material";
import BaseAccesoryForm from "./BaseAccessoryForm";
import { FormEvent, FormEventHandler, useRef, useState } from "react";
import VariantAccessoryForm from "./VariantAccessoryForm";
import { IVariantState } from "../../../interfaces/IManageAccessory";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import { v4 as uuidv4 } from "uuid";

interface IMasterAttribute {
  key: string;
  value: string[];
}

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

const getInitialVariantState: () => IVariantState = () => ({
  isLoading: false,
  id: uuidv4(),
});

const AddAccessory = () => {
  const baseRef = useRef<HTMLFormElement>(null);
  const variantRef = useRef<Record<string, HTMLFormElement>>({});
  const [variantStates, setVariantStates] = useState<IVariantState[]>([]);
  const [masterAttributes, setMasterAttributes] = useState<IMasterAttribute[]>([
    { key: "", value: [] },
  ]);

  const cardClasses =
    "card-wrapper p-8 shadow-lg shadow-gray-900 rounded-md abc-layout-clr mb-8";

  const handleSubmitClick = () => {
    baseRef.current?.requestSubmit();
    variantStates.forEach((variant) => {
      variantRef.current[variant.id].requestSubmit();
    });
  };

  const handleAddVariantClick = () => {
    setVariantStates([...variantStates, getInitialVariantState()]);
  };

  const handleBaseFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const handleVariantFormSubmit = (
    event: FormEvent<HTMLFormElement>,
    id: string
  ) => {
    event.preventDefault();
  };

  return (
    <div className="manage-accessory">
      <h1 className="text-center">Add Accessory Details</h1>
      <h3>Base Details:</h3>
      <div className={cardClasses}>
        <BaseAccesoryForm handleSubmit={handleBaseFormSubmit} ref={baseRef} />

        <Divider className="mt-4!"/>

        <h4 className="mt-4"> Master Attributes</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {masterAttributes.map((masterAttribute, index) => (
            <div className="grid grid-cols-1 gap-4 shadow-lg shadow-gray-900 p-4">
              <TextField
                fullWidth
                required
                id={`MasterAttributeName${index}`}
                label="Attribute Name"
                variant="outlined"
              />
              <div>
                <TextField
                  fullWidth
                  required
                  id={`MasterAttributeValue${index}`}
                  label="Value"
                  variant="outlined"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {variantStates.length ? <h3>Variants:</h3> : <></>}

      {variantStates.map((variant) => (
        <div key={variant.id} className={cardClasses}>
          <div className="flex justify-end gap-2 mb-3">
            <Button variant="contained" startIcon={<ContentCopyOutlinedIcon />}>
              Duplicate
            </Button>

            <Button
              disabled={variantStates.length === 1}
              className="min-w-auto!"
              color="error"
              aria-label="Delete"
              variant="contained"
              onClick={() =>
                setVariantStates((prevVariants) =>
                  prevVariants.filter(
                    (prevVariant) => prevVariant.id !== variant.id
                  )
                )
              }
            >
              <DeleteIcon />
            </Button>
          </div>

          <Button
            className="mb-4!"
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload Images
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => console.log(event.target.files)}
              multiple
            />
          </Button>
          <VariantAccessoryForm
            ref={(el: HTMLFormElement) => {
              variantRef.current[variant.id] = el;
            }}
            handleSubmit={(event) => handleVariantFormSubmit(event, variant.id)}
          />
        </div>
      ))}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddVariantClick}
      >
        Add Variant
      </Button>

      <div className="flex mb-4 justify-end">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleSubmitClick}
        >
          Add Accessory
        </Button>
      </div>
    </div>
  );
};

export default AddAccessory;
