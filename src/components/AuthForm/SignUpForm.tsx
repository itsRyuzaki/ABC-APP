import { FormEvent, useRef } from "react";
import Input from "../../shared/Input/Input";
import { ENDPOINTS } from "../../config/endpoints";
import { IUserData } from "../../interfaces/IApiModels";
import { ApiResponse } from "../../interfaces/IApiResponse";
import { postData } from "../../services/accessories-service";

const SignUpForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSignUpClick = async (event: FormEvent) => {
    event.preventDefault();
    const formData = Object.fromEntries<string>(
      new FormData(
        formRef.current as HTMLFormElement
      ).entries() as FormDataIterator<[string, string]>
    );

    const response = await postData<typeof formData, ApiResponse<IUserData>>(
      ENDPOINTS.userSignUp,
      formData
    );
    console.log(response);
  };

  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSignUpClick} ref={formRef}>
          {/* User Name */}
          <Input id="userName" label="User Name" type="text" required />

          {/* Password */}
          <Input
            id="password"
            label="Create a Password"
            required
            type="password"
          />

          {/* Re-type Password */}
          <Input
            id="reTyepePassword"
            label="Re-Type Password"
            required
            type="password"
          />

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
