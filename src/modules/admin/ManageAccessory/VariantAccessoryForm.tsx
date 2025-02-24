import { Autocomplete, TextField } from "@mui/material";
import { FC, FormEventHandler, Ref } from "react";

interface IVariantAccessoryForm {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  ref: Ref<HTMLFormElement>;
}

const VariantAccessoryForm: FC<IVariantAccessoryForm> = ({
  ref,
  handleSubmit,
}) => {
  return (
    <>
      <form ref={ref} onSubmit={handleSubmit}>
        <TextField
          id="description"
          label="Description"
          multiline
          required
          maxRows={4}
        />
        <TextField
          id="specifications"
          label="Specification"
          multiline
          helperText="Separate details in new line"
          required
        />
        <TextField
          id="inBoxItems"
          label="Items in Box "
          multiline
          helperText="Separate details in new line"
          required
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
        <TextField required id="sellerPrice" label="Seller Price" />
        <TextField required id="abcPrice" label="ABC Price" />
      </form>
    </>
  );
};

export default VariantAccessoryForm;
