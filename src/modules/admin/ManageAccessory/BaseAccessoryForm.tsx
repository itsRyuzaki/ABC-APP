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
} from "@mui/material";
import { Dispatch, FC, FormEventHandler, Ref, SetStateAction } from "react";
import { IKeyValuePair } from "../../../interfaces/IApiModels";
import SendIcon from "@mui/icons-material/Send";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";

interface BaseFormInterface {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  ref: Ref<HTMLFormElement>;
  masterAttributes: IKeyValuePair<string, string[]>[];
  setMasterAttributes: Dispatch<
    SetStateAction<IKeyValuePair<string, string[]>[]>
  >;
}

const BaseAccesoryForm: FC<BaseFormInterface> = ({
  handleSubmit,
  ref,
  masterAttributes,
  setMasterAttributes,
}) => {
  const gridClass =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4";

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
          options={[
            { id: 1, name: "Test" },
            { id: 2, name: "Somehting" },
          ]}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          renderInput={(params) => (
            <TextField {...params} label="Category" required name="category" />
          )}
        />

        {/* Brand */}
        <Autocomplete
          options={[
            { id: 1, name: "Test" },
            { id: 2, name: "Somehting" },
          ]}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          renderInput={(params) => (
            <TextField {...params} label="Brand" required name="brand" />
          )}
        />

        {/* Device Name */}
        <Autocomplete
          options={[
            { id: 1, name: "Test" },
            { id: 2, name: "Somehting" },
          ]}
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
            className="grid grid-cols-1 gap-4 shadow-lg shadow-gray-900 p-4 content-start"
          >
            <Button
              disabled={masterAttributes.length === 1}
              className="justify-self-end min-w-auto! size-fit"
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
    </>
  );
};

export default BaseAccesoryForm;
