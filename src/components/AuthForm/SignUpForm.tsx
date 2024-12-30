import { FC, FormEvent, MouseEventHandler, useRef } from "react";
import Input from "../../shared/Input/Input";
import { ENDPOINTS } from "../../config/endpoints";
import { IUserData } from "../../interfaces/IApiModels";
import { postData } from "../../services/accessories-service";
import { useAppDispatch } from "../../store/store-hooks";
import { userLogin } from "../../store/AuthSlice";

interface ISignUpFormComponent {
  loginClick: MouseEventHandler;
  closeModal: () => void;
}

const SignUpForm: FC<ISignUpFormComponent> = ({ loginClick, closeModal }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  const handleSignUpClick = async (event: FormEvent) => {
    event.preventDefault();
    const formData = Object.fromEntries<string>(
      new FormData(
        formRef.current as HTMLFormElement
      ).entries() as FormDataIterator<[string, string]>
    );

    const response = await postData<typeof formData, IUserData>(
      ENDPOINTS.userSignUp,
      formData
    );
    if (response.success) {
      dispatch(userLogin(response));

      closeModal();
    }
  };

  return (
    <>
      <div className="mt-10">
        <h6>Fields Marked with * are mandatory</h6>
        <form
          className="form-background"
          onSubmit={handleSignUpClick}
          ref={formRef}
        >
          <div className="flex flex-wrap bg-inherit gap-4 items-center my-4 justify-between">
            {/* First Name */}
            <Input id="firstName" label="First Name*" type="text" required />

            {/* Last Name */}
            <Input id="lastName" label="Last Name" type="text" />

            {/* E-mail */}
            <Input id="emailId" label="E-mail Id*" type="email" required />

            {/* Mobile Number */}
            <Input
              id="mobileNumber"
              label="Mobile Number*"
              type="tel"
              required
            />

            {/* User Name */}
            <Input id="userName" label="User Name*" type="text" required />

            {/* Password */}
            <Input
              id="password"
              label="Create a Password*"
              required
              type="password"
            />

            {/* Re-type Password */}
            <Input
              id="reTyepePassword"
              label="Re-Type Password*"
              required
              type="password"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-80 md:w-96 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?
            <br />
            <button
              className="font-semibold text-indigo-600 hover:text-indigo-500"
              onClick={loginClick}
            >
              Log In to your account
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
