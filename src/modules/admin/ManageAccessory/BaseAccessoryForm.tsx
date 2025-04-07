import {
  TextField,
  Autocomplete,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Button,
  Chip,
  Dialog,
} from "@mui/material";
import {
  Dispatch,
  FC,
  FormEventHandler,
  RefObject,
  SetStateAction,
  useState,
} from "react";
import {
  IAddAccessoryBasePayload,
  IBrandDetails,
  ICategoryDetails,
  IDeviceModels,
  IKeyValuePair,
} from "../../../interfaces/IApiModels";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import { ENDPOINTS } from "../../../config/endpoints";
import { useFetch } from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { ACCESSORY_TYPES } from "../../../config/variation";
import ManageCategory from "../shared/ManageCategory";
import ManageDeviceModel from "../shared/ManageDeviceModel";
import ManageBrand from "../shared/ManageBrand";
import { ExtractFormData, getCustomAddOption } from "../../../utils/formUtils";
import { IBaseAccessoryFormData } from "../../../interfaces/IManageAccessory";

interface BaseFormInterface {
  emitBaseFormData: (payload: IAddAccessoryBasePayload) => void;
  ref: RefObject<HTMLFormElement | null>;
  masterAttributes: IKeyValuePair<string, string[]>[];
  setMasterAttributes: Dispatch<
    SetStateAction<IKeyValuePair<string, string[]>[]>
  >;
}

const BaseAccesoryForm: FC<BaseFormInterface> = ({
  emitBaseFormData,
  ref,
  masterAttributes,
  setMasterAttributes,
}) => {
  const { accessoryType = "" } = useParams();
  const [categoryData, setCategoryData] = useFetch<ICategoryDetails[]>(
    ENDPOINTS.categories,
    { type: ACCESSORY_TYPES[accessoryType] }
  );
  const [brandsData, setBrandsData] = useFetch<IBrandDetails[]>(
    ENDPOINTS.brands,
    { type: ACCESSORY_TYPES[accessoryType] }
  );
  const [deviceModelsData, setDeviceModelsData] = useFetch<IDeviceModels[]>(
    ENDPOINTS.deviceModels,
    { type: ACCESSORY_TYPES[accessoryType] }
  );
  const [dialogConfig, setDialogConfig] = useState({ isOpen: false, type: "" });
  const [category, setCategory] = useState<ICategoryDetails | null>(null);
  const [deviceModel, setDeviceModel] = useState<IDeviceModels | null>(null);
  const [brand, setBrand] = useState<IBrandDetails | null>(null);

  const gridClass =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-4";

  const addAttributeValues = (
    masterAttribute: IKeyValuePair<string, string[]>,
    attrIndex: number
  ) => {
    const value = (
      document.getElementById(
        `value@@${masterAttribute.id}`
      ) as HTMLInputElement
    ).value;

    if (!!value && !masterAttribute.value?.find((val) => val === value)) {
      setMasterAttributes((prevAttr) => {
        prevAttr[attrIndex].value.push(value);
        return prevAttr.slice();
      });
    }
  };

  const getDialogForm = (type: string) => {
    switch (type) {
      case "category":
        return (
          <ManageCategory
            accessoryType={ACCESSORY_TYPES[accessoryType]}
            saveCategory={(categoryDetails: ICategoryDetails) => {
              setCategoryData((prevCategory) => ({
                ...prevCategory,
                data: prevCategory.data?.concat(categoryDetails) ?? [],
              }));
              setCategory(categoryDetails);
              setDialogConfig({ isOpen: false, type: "" });
            }}
          />
        );
      case "deviceModel":
        return (
          <ManageDeviceModel
            accessoryType={ACCESSORY_TYPES[accessoryType]}
            saveDeviceModel={(modelDetails: IDeviceModels) => {
              setDeviceModelsData((prevModel) => ({
                ...prevModel,
                data: prevModel.data?.concat(modelDetails) ?? [],
              }));
              setDeviceModel(modelDetails);
              setDialogConfig({ isOpen: false, type: "" });
            }}
          />
        );
      case "brand":
        return (
          <ManageBrand
            accessoryType={ACCESSORY_TYPES[accessoryType]}
            saveBrand={(brandDetails: IBrandDetails) => {
              setBrandsData((prevBrand) => ({
                ...prevBrand,
                data: prevBrand.data?.concat(brandDetails) ?? [],
              }));
              setBrand(brandDetails);
              setDialogConfig({ isOpen: false, type: "" });
            }}
          />
        );
      default:
        return <></>;
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (ref.current) {
      const formData = ExtractFormData<IBaseAccessoryFormData>(ref.current);
      emitBaseFormData({
        name: formData.name,
        categoryId: category?.id ?? 0,
        deviceModelId: deviceModel?.id ?? 0,
        brandId: brand?.id ?? 0,
        type: ACCESSORY_TYPES[accessoryType],
        masterData: masterAttributes,
      });
    }
  };

  return (
    <>
      <form ref={ref} onSubmit={handleSubmit} className={gridClass}>
        {/* Accessory Name */}
        <TextField
          fullWidth
          required
          name="name"
          label="Name"
          variant="outlined"
        />

        {/* Category */}
        <Autocomplete
          options={categoryData.data ?? []}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          value={category}
          onChange={(_event, newValue) => {
            if (newValue?.id == -1) {
              setCategory(null);
              setDialogConfig({
                isOpen: true,
                type: "category",
              });
            } else {
              setCategory(newValue);
            }
          }}
          {...getCustomAddOption<ICategoryDetails>()}
          renderInput={(params) => (
            <TextField {...params} label="Category" required name="category" />
          )}
        />

        {/* Brand */}
        <Autocomplete
          options={brandsData.data ?? []}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          value={brand}
          onChange={(_event, newValue) => {
            if (newValue?.id == -1) {
              setBrand(null);
              setDialogConfig({
                isOpen: true,
                type: "brand",
              });
            } else {
              setBrand(newValue);
            }
          }}
          {...getCustomAddOption<IBrandDetails>()}
          renderInput={(params) => (
            <TextField {...params} label="Brand" required name="brand" />
          )}
        />

        {/* Device Model */}
        <Autocomplete
          options={deviceModelsData.data ?? []}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          value={deviceModel}
          onChange={(_event, newValue) => {
            if (newValue?.id == -1) {
              setDeviceModel(null);
              setDialogConfig({
                isOpen: true,
                type: "deviceModel",
              });
            } else {
              setDeviceModel(newValue);
            }
          }}
          {...getCustomAddOption<IDeviceModels>()}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Device model"
              name="deviceModel"
              required
            />
          )}
        />
      </form>

      <Divider className="mb-4!" />

      <h4 className="mb-4"> Master Attributes</h4>

      <div className={gridClass}>
        {masterAttributes.map((masterAttribute, attrIndex) => (
          <div
            key={masterAttribute.id}
            className="grid grid-cols-1 gap-6 shadow-lg shadow-gray-900 p-4 content-start"
          >
            <Button
              disabled={masterAttributes.length === 1}
              className="justify-self-end min-w-auto! size-fit p-2!"
              color="error"
              variant="contained"
              onClick={() =>
                setMasterAttributes((prevAttr) =>
                  prevAttr.filter((val) => val.id !== masterAttribute.id)
                )
              }
            >
              <RemoveCircleOutlineIcon />
            </Button>

            <TextField
              fullWidth
              required
              name={`name@@${masterAttribute.id}`}
              label="Attribute Name"
              variant="outlined"
              onChange={(event) => {
                setMasterAttributes((prevAttr) => {
                  const newAttr = prevAttr.slice();
                  newAttr[attrIndex].key = event.target.value;
                  return newAttr;
                });
              }}
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor={`value@@${masterAttribute.id}`}>
                Add Value:
              </InputLabel>
              <OutlinedInput
                id={`value@@${masterAttribute.id}`}
                label="Add Value:"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      color="secondary"
                      aria-label="Add Attribute Value"
                      edge="end"
                      onClick={() =>
                        addAttributeValues(masterAttribute, attrIndex)
                      }
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <div className="flex gap-2 flex-wrap">
              {masterAttribute.value?.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  color="info"
                  onDelete={() =>
                    setMasterAttributes((prevAtttr) =>
                      prevAtttr.map((attr) => {
                        if (attr.id === masterAttribute.id) {
                          attr.value = attr.value.filter(
                            (val) => val !== value
                          );
                        }
                        return attr;
                      })
                    )
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() =>
          setMasterAttributes([
            ...masterAttributes,
            { key: "", value: [], id: uuidv4() },
          ])
        }
      >
        Add
      </Button>

      <Dialog open={dialogConfig.isOpen}>
        <div className="p-2">
          <IconButton
            className="min-w-auto! self-end"
            color="error"
            onClick={() => setDialogConfig({ isOpen: false, type: "" })}
          >
            <CancelIcon fontSize="large" />
          </IconButton>
          {getDialogForm(dialogConfig.type)}
        </div>
      </Dialog>
    </>
  );
};

export default BaseAccesoryForm;
