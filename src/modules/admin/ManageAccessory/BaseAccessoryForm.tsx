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
  createFilterOptions,
  Dialog,
} from "@mui/material";
import {
  Dispatch,
  FC,
  FormEventHandler,
  Ref,
  SetStateAction,
  useState,
} from "react";
import {
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

interface BaseFormInterface {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  ref: Ref<HTMLFormElement>;
  masterAttributes: IKeyValuePair<string, string[]>[];
  setMasterAttributes: Dispatch<
    SetStateAction<IKeyValuePair<string, string[]>[]>
  >;
}

const filter = createFilterOptions<ICategoryDetails>();

const BaseAccesoryForm: FC<BaseFormInterface> = ({
  handleSubmit,
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
  const [open, toggleOpen] = useState(false);
  const [category, setCategory] = useState<ICategoryDetails | null>(null);

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
          value={category}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          onChange={(event, newValue) => {
            if (newValue?.id == -1) {
              setCategory(null);
              toggleOpen(true);
            } else {
              setCategory(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== "") {
              filtered.push({
                id: -1,
                name: `Add "${params.inputValue}"`,
              } as any);
            }

            return filtered;
          }}
          renderInput={(params) => (
            <TextField {...params} label="Category" required name="category" />
          )}
        />

        {/* Brand */}
        <Autocomplete
          options={brandsData.data ?? []}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          renderInput={(params) => (
            <TextField {...params} label="Brand" required name="brand" />
          )}
        />

        {/* Device Name */}
        <Autocomplete
          options={deviceModelsData.data ?? []}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="Device Name"
              name="deviceName"
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

      <Dialog open={open}>
        <div className="p-2">
          <IconButton
            className="min-w-auto! self-end"
            color="error"
            onClick={() => toggleOpen(false)}
          >
            <CancelIcon fontSize="large" />
          </IconButton>
          <ManageCategory
            saveCategory={(categoryDetails: ICategoryDetails) => {
              setCategoryData((prevCategory) => ({
                ...prevCategory,
                data: prevCategory.data?.concat(categoryDetails) ?? [],
              }));
              setCategory(categoryDetails);
              toggleOpen(false);
            }}
          />
        </div>
      </Dialog>
    </>
  );
};

export default BaseAccesoryForm;
