import { Button, styled } from "@mui/material";
import BaseAccesoryForm from "./BaseAccessoryForm";
import { FormEvent, FormEventHandler, useRef, useState } from "react";
import VariantAccessoryForm from "./VariantAccessoryForm";
import { IVariantState } from "../../../interfaces/IManageAccessory";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { v4 as uuidv4 } from "uuid";

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

  const handleSubmitClick = () => {
    baseRef.current?.requestSubmit();
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
    <>
      <h2>Add Accessory</h2>
      <div>
        <h4>Base Details:</h4>
        <BaseAccesoryForm handleSubmit={handleBaseFormSubmit} ref={baseRef} />
      </div>

      {variantStates.length ? <h4>Variants:</h4> : <></>}

      {variantStates.map((variant) => (
        <div>
          <Button variant="contained" startIcon={<ContentCopyOutlinedIcon />}>
            Duplicate
          </Button>
          <VariantAccessoryForm
            ref={(el: HTMLFormElement) => {
              variantRef.current[variant.id] = el;
            }}
            handleSubmit={(event) => handleVariantFormSubmit(event, variant.id)}
          />
          <Button
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
        </div>
      ))}

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddVariantClick}
      >
        Add Variant
      </Button>

      <Button onClick={handleSubmitClick}>Submit</Button>
    </>
  );
};

export default AddAccessory;
