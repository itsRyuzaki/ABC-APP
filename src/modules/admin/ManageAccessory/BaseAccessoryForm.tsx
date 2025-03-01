import { TextField, Autocomplete } from "@mui/material";
import { FC, FormEventHandler, Ref } from "react";

interface BaseFormInterface {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  ref: Ref<HTMLFormElement>;
}

const BaseAccesoryForm: FC<BaseFormInterface> = ({ handleSubmit, ref }) => {
  return (
    <>
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {/* Accessory Name */}
        <TextField
          fullWidth
          required
          id="name"
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
            <TextField {...params} label="Category" required id="category" />
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
            <TextField {...params} label="Brand" required id="brand" />
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
              id="deviceName"
              required
            />
          )}
        />
      </form>
    </>
  );
};

export default BaseAccesoryForm;
