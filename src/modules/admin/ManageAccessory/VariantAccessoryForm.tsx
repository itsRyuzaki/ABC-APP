import {
  Autocomplete,
  Button,
  Dialog,
  IconButton,
  TextField,
} from "@mui/material";
import {
  Dispatch,
  FC,
  FormEventHandler,
  RefCallback,
  SetStateAction,
  useState,
} from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IKeyValuePair, ISellerDetails } from "../../../interfaces/IApiModels";
import {
  IAccessoryVariantData,
  IAccessoryVariantEmittedData,
} from "../../../interfaces/IManageAccessory";
import FileUpload from "../../../shared/FileUpload/FileUpload";
import { IFileConfig } from "../../../interfaces/IFileUpload";
import { ApiResponse } from "../../../interfaces/IApiResponse";
import { getCustomAddOption } from "../../../utils/formUtils";
import CancelIcon from "@mui/icons-material/Cancel";
import ManageSeller from "../shared/ManageSeller";
import { ACCESSORY_TYPES } from "../../../config/variation";
import { useParams } from "react-router-dom";

interface IVariantAccessoryForm {
  emitvariantFormData: (payload: IAccessoryVariantEmittedData) => void;
  ref: RefCallback<HTMLFormElement>;
  masterAttributes: IKeyValuePair<string, string[]>[];
  initialData: IAccessoryVariantData | null;
  sellersData: ApiResponse<ISellerDetails[]>;
  setSellersData: Dispatch<SetStateAction<ApiResponse<ISellerDetails[]>>>;
}

const VariantAccessoryForm: FC<IVariantAccessoryForm> = ({
  ref,
  emitvariantFormData,
  masterAttributes,
  initialData,
  sellersData,
  setSellersData,
}) => {
  const { accessoryType = "" } = useParams();
  const [disabledAttributes, setDisabledAttributes] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<IFileConfig[]>([]);
  const [seller, setSeller] = useState<ISellerDetails | null>(null);
  const [isDialogOpen, toggleDialogOpen] = useState(false);

  const gridClass =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (seller && imageFiles.length) {
      emitvariantFormData({
        seller,
        imageFiles,
      });
    }
  };

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

          {/* Seller */}
          <Autocomplete
            options={sellersData.data ?? []}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id == value.id}
            value={seller}
            onChange={(_event, newValue) => {
              if (newValue?.id == -1) {
                setSeller(null);
                toggleDialogOpen(true);
              } else {
                setSeller(newValue);
              }
            }}
            {...getCustomAddOption<ISellerDetails>()}
            renderInput={(params) => (
              <TextField {...params} label="Seller" required name="seller" />
            )}
          />

          <TextField
            fullWidth
            required
            type="number"
            name="availableCount"
            label="Available Inventory"
            defaultValue={initialData?.availableCount}
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
                      slotProps={{
                        htmlInput: {
                          readOnly: true,
                          className: "Mui-disabled",
                        },
                      }}
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

      <Dialog open={isDialogOpen}>
        <div className="p-2">
          <IconButton
            className="min-w-auto! self-end"
            color="error"
            onClick={() => toggleDialogOpen(false)}
          >
            <CancelIcon fontSize="large" />
          </IconButton>
          {
            <ManageSeller
              accessoryType={ACCESSORY_TYPES[accessoryType]}
              saveSellerDetails={(sellerDetails: ISellerDetails) => {
                setSellersData((prevSeller) => ({
                  ...prevSeller,
                  data: prevSeller.data?.concat(sellerDetails) ?? [],
                }));
                setSeller(sellerDetails);
                toggleDialogOpen(false);
              }}
            />
          }
        </div>
      </Dialog>
    </>
  );
};

export default VariantAccessoryForm;
