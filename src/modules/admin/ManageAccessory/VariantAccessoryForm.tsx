import { Autocomplete, Button, TextField } from "@mui/material";
import { FC, FormEventHandler, Ref, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface IVariantAccessoryForm {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  ref: Ref<HTMLFormElement>;
}

const VariantAccessoryForm: FC<IVariantAccessoryForm> = ({
  ref,
  handleSubmit,
}) => {
  const [attributes, setAttributes] = useState<string[]>([uuidv4()]);

  const gridClass =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4";

  return (
    <>
      <form ref={ref} onSubmit={handleSubmit}>
        <div className={`${gridClass} mb-4`}>
          <TextField
            id="description"
            label="Description"
            className="md:col-span-2"
            fullWidth
            multiline
            required
            maxRows={4}
          />
          <TextField fullWidth required id="sellerPrice" label="Seller Price" />
          <TextField fullWidth required id="abcPrice" label="ABC Price" />
          <TextField
            id="specifications"
            label="Specifications"
            className="md:col-span-2"
            multiline
            fullWidth
            helperText="Separate details in new line"
            required
          />
          <TextField
            id="inBoxItems"
            label="Items in Box"
            className="md:col-span-2"
            multiline
            fullWidth
            helperText="Separate details in new line"
            required
          />
        </div>

        <h4 className="mb-4">Attributes:</h4>

        <div className={`${gridClass} items-center mb-4`}>
          {attributes.map((attributeId, attrIndex) => (
            <div
              key={attributeId}
              className="col-span-1 grid grid-cols-1 gap-4 shadow-lg shadow-gray-900 shadow-lg shadow-gray-900 p-4"
            >
              <Button
                disabled={attributes.length === 1}
                className="justify-self-end min-w-auto!"
                color="error"
                variant="contained"
                onClick={() =>
                  setAttributes((prevAttr) =>
                    prevAttr.filter((_val, index) => index !== attrIndex)
                  )
                }
              >
                <RemoveCircleOutlineIcon />
              </Button>
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
                    id={`attributeType-${attributeId}`}
                    label="Select Attribute"
                    required
                  />
                )}
              />
              <TextField
                fullWidth
                id={`attributeValue-${attributeId}`}
                label="Value"
                required
              />
            </div>
          ))}
        </div>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAttributes([...attributes, uuidv4()])}
        >
          Add Attributes
        </Button>
      </form>
    </>
  );
};

export default VariantAccessoryForm;
