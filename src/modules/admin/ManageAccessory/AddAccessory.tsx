import { Button } from "@mui/material";
import BaseAccesoryForm from "./BaseAccessoryForm";
import { FormEvent, useRef, useState } from "react";
import VariantAccessoryForm from "./VariantAccessoryForm";
import {
  IAccessoryVariantData,
  IVariantState,
} from "../../../interfaces/IManageAccessory";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { v4 as uuidv4 } from "uuid";
import {
  IAddAccessoryBasePayload,
  IKeyValuePair,
  ISellerDetails,
} from "../../../interfaces/IApiModels";
import { ExtractFormData } from "../../../utils/formUtils";
import { useFetch } from "../../../hooks/useFetch";
import { ENDPOINTS } from "../../../config/endpoints";
import { ACCESSORY_TYPES } from "../../../config/variation";
import { useParams } from "react-router-dom";
import { postData } from "../../../services/accessories-service";

const getInitialVariantState: (
  data?: IAccessoryVariantData
) => IVariantState = (data?: IAccessoryVariantData) => ({
  isLoading: false,
  id: uuidv4(),
  initialData: data ?? null,
});

const AddAccessory = () => {
  const { accessoryType = "" } = useParams();
  const baseRef = useRef<HTMLFormElement>(null);
  const variantRef = useRef<Record<string, HTMLFormElement>>({});
  const [variantStates, setVariantStates] = useState<IVariantState[]>([]);
  const [masterAttributes, setMasterAttributes] = useState<
    IKeyValuePair<string, string[]>[]
  >([{ key: "", value: [], id: uuidv4() }]);
  const [sellersData, setSellersData] = useFetch<ISellerDetails[]>(
    ENDPOINTS.sellers,
    { type: ACCESSORY_TYPES[accessoryType] }
  );

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

  const handleBaseFormSubmit: (
    payload: IAddAccessoryBasePayload
  ) => void = async (payload) => {
    await postData(ENDPOINTS.baseAccessory, payload);
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
          emitBaseFormData={handleBaseFormSubmit}
          ref={baseRef}
          masterAttributes={masterAttributes}
          setMasterAttributes={setMasterAttributes}
        />
      </div>

      {variantStates.length ? <h3>Variants:</h3> : <></>}

      {variantStates.map((variant) => (
        <div key={variant.id} className={cardClasses}>
          <div className="flex justify-end gap-4 mb-8">
            <Button
              variant="contained"
              startIcon={<ContentCopyOutlinedIcon />}
              onClick={() =>
                setVariantStates((prevStates) => {
                  return [
                    ...prevStates,
                    getInitialVariantState(
                      ExtractFormData<IAccessoryVariantData>(
                        variantRef.current[variant.id]
                      )
                    ),
                  ];
                })
              }
            >
              Duplicate
            </Button>

            <Button
              disabled={variantStates.length === 1}
              className="min-w-auto! p-2!"
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
            initialData={variant.initialData}
            sellersData={sellersData}
            setSellersData={setSellersData}
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
