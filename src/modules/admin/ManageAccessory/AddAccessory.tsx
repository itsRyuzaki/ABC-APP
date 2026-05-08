import { Button, Typography } from "@mui/material";
import BaseAccesoryForm from "./BaseAccessoryForm";
import { useRef, useState } from "react";
import VariantAccessoryForm from "./VariantAccessoryForm";
import {
  IAccessoryVariantData,
  IAccessoryVariantEmittedData,
  IVariantState,
} from "../../../interfaces/IManageAccessory";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { v4 as uuidv4 } from "uuid";
import {
  IAddAccessoryBasePayload,
  IAddAccessoryVariantPayload,
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
  data?: IAccessoryVariantData,
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
    { type: ACCESSORY_TYPES[accessoryType] },
  );
  let accessoryBaseId: string;

  const cardClasses =
    "card-wrapper p-8 shadow-lg shadow-gray-900 rounded-md mb-8";

  const handleSubmitClick = () => {
    baseRef.current?.requestSubmit();
  };

  const handleAddVariantClick = () => {
    setVariantStates([...variantStates, getInitialVariantState()]);
  };

  const handleBaseFormSubmit: (
    payload: IAddAccessoryBasePayload,
  ) => void = async (payload) => {
    const response = await postData<IAddAccessoryBasePayload, string>(
      ENDPOINTS.baseAccessory,
      payload,
    );
    if (response.success && response.data) {
      accessoryBaseId = response.data;
      variantStates.forEach((variant) => {
        variantRef.current[variant.id].requestSubmit();
      });
    }
  };

  const handleVariantFormSubmit = async (
    eventData: IAccessoryVariantEmittedData,
    variantId: string,
  ) => {
    const formData = ExtractFormData<IAccessoryVariantData>(
      variantRef.current[variantId],
    );

    const response = await postData<IAddAccessoryVariantPayload, number>(
      ENDPOINTS.accessory,
      {
        type: ACCESSORY_TYPES[accessoryType],
        description: formData.description,
        specifications: formData.specifications.split("\n"),
        inBoxItems: formData.inBoxItems.split("\n"),
        availableCount: formData.availableCount,
        sellerPrice: Number(formData.sellerPrice),
        abcPrice: Number(formData.abcPrice),
        originalPrice: Number(formData.originalPrice),
        sellerIds: [eventData.seller.id],
        accessoryBaseId,
        itemAttributes: masterAttributes.reduce(
          (mappedData: Record<string, string>, attribute) => {
            const key = `attributeKey@@${attribute.id}` as const;
            const value = `attributeValue@@${attribute.id}` as const;

            if (formData[key]) {
              mappedData[formData[key]] = formData[value];
            }
            return mappedData;
          },
          {},
        ),
      },
    );

    if (response.success) {
      const imagesPayload = new FormData();
      const helperPayload = {
        type: ACCESSORY_TYPES[accessoryType],
        accessoryGuid: response.data,
        itemImages: eventData.imageFiles.map((imgFile, index) => {
          const key = `altText@@${imgFile.id}` as const;
          return {
            altText: formData[key],
            order: index,
          };
        }),
      };
      imagesPayload.append(
        "requestPayload",
        new File([JSON.stringify(helperPayload)], "helper.json"),
      );
      eventData.imageFiles.forEach((imgFile) =>
        imagesPayload.append("images", imgFile.file),
      );

      await postData<FormData, boolean[]>(
        ENDPOINTS.accessoryImages,
        imagesPayload,
      );
    }
  };

  return (
    <div className="manage-accessory">
      <Typography variant="h2" className="text-center">
        Add Accessory Details
      </Typography>
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
                        variantRef.current[variant.id],
                      ),
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
                    (prevVariant) => prevVariant.id !== variant.id,
                  ),
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
            emitvariantFormData={(payload) =>
              handleVariantFormSubmit(payload, variant.id)
            }
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
