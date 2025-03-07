import { Button } from "@mui/material";
import BaseAccesoryForm from "./BaseAccessoryForm";
import { FormEvent, FormEventHandler, useRef, useState } from "react";
import VariantAccessoryForm from "./VariantAccessoryForm";
import { IVariantState } from "../../../interfaces/IManageAccessory";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { v4 as uuidv4 } from "uuid";
import { IKeyValuePair } from "../../../interfaces/IApiModels";
import { ExtractFormData } from "../../../utils/formUtils";



const getInitialVariantState: () => IVariantState = () => ({
  isLoading: false,
  id: uuidv4(),
});

const AddAccessory = () => {
  const baseRef = useRef<HTMLFormElement>(null);
  const variantRef = useRef<Record<string, HTMLFormElement>>({});
  const [variantStates, setVariantStates] = useState<IVariantState[]>([]);
  const [masterAttributes, setMasterAttributes] = useState<
    IKeyValuePair<string, string[]>[]
  >([{ key: "", value: [], id: uuidv4() }]);

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
    console.log(ExtractFormData<any>(variantRef.current[id]));
  };

  return (
    <div className="manage-accessory">
      <h1 className="text-center">Add Accessory Details</h1>
      <h3>Base Details:</h3>
      <div className={cardClasses}>
        <BaseAccesoryForm
          handleSubmit={handleBaseFormSubmit}
          ref={baseRef}
          masterAttributes={masterAttributes}
          setMasterAttributes={setMasterAttributes}
        />
      </div>

      {variantStates.length ? <h3>Variants:</h3> : <></>}

      {variantStates.map((variant) => (
        <div key={variant.id} className={cardClasses}>
          <div className="flex justify-end gap-2 mb-4">
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

          
          <VariantAccessoryForm
            ref={(el: HTMLFormElement) => {
              variantRef.current[variant.id] = el;
            }}
            handleSubmit={(event) => handleVariantFormSubmit(event, variant.id)}
            masterAttributes={masterAttributes}
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
