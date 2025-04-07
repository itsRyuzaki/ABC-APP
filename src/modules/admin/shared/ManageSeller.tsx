import TextField from "@mui/material/TextField";
import { FC, FormEventHandler, useRef } from "react";
import Button from "@mui/material/Button";
import { postData } from "../../../services/accessories-service";
import { ENDPOINTS } from "../../../config/endpoints";
import {
  IAddSellerPayload,
  ISellerDetails,
} from "../../../interfaces/IApiModels";
import { ExtractFormData } from "../../../utils/formUtils";

interface IManageSeller {
  saveSellerDetails: (sellerDetails: ISellerDetails) => void;
  accessoryType: string;
}

const ManageSeller: FC<IManageSeller> = ({
  saveSellerDetails,
  accessoryType,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = ExtractFormData<IAddSellerPayload>(formRef.current);
      formData.type = accessoryType;

      const response = await postData<IAddSellerPayload, number>(
        ENDPOINTS.sellers,
        formData
      );

      if (response.success && response.data) {
        saveSellerDetails({
          ...formData,
          id: response.data,
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="m-8" ref={formRef}>
        <TextField
          fullWidth
          required
          name="name"
          label="Name"
          variant="outlined"
          className="mb-4!"
        />

        <TextField
          fullWidth
          required
          name="mobileNumber"
          label="Mobile Number"
          variant="outlined"
          className="mb-4!"
        />
        <TextField
          fullWidth
          required
          name="address"
          label="Address"
          variant="outlined"
          multiline
          className="mb-4!"
        />
        <TextField
          fullWidth
          name="website"
          label="Seller Website"
          variant="outlined"
          className="mb-4!"
        />

        <div className="flex mt-4 justify-end">
          <Button variant="contained" color="secondary" type="submit">
            Save Details
          </Button>
        </div>
      </form>
    </>
  );
};

export default ManageSeller;
