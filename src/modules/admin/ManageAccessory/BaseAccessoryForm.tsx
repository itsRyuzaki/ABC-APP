import { TextField, Autocomplete } from "@mui/material";
import { FC, FormEventHandler, Ref } from "react";

interface BaseFormInterface {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  ref: Ref<HTMLFormElement>;
}

const BaseAccesoryForm: FC<BaseFormInterface> = ({ handleSubmit, ref }) => {
  return (
    <>
      <form ref={ref} onSubmit={handleSubmit}>
        <TextField required id="name" label="Name" variant="outlined" />
        <Autocomplete
          options={[
            { id: 1, name: "Test" },
            { id: 2, name: "Somehting" },
          ]}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          renderInput={(params) => (
            <TextField {...params} label="Brand" required />
          )}
        />

        <Autocomplete
          options={[
            { id: 1, name: "Test" },
            { id: 2, name: "Somehting" },
          ]}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          renderInput={(params) => (
            <TextField {...params} label="Device Name" required />
          )}
        />
        <Autocomplete
          options={[
            { id: 1, name: "Test" },
            { id: 2, name: "Somehting" },
          ]}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          renderInput={(params) => (
            <TextField {...params} label="Category" required />
          )}
        />
      </form>
    </>
  );
};

export default BaseAccesoryForm;
