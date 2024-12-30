import { FC, FormEvent, MouseEventHandler, useRef } from "react";
import Input from "../../shared/Input/Input";
import { postData } from "../../services/accessories-service";
import { IUserLoginPayload, IUserData } from "../../interfaces/IApiModels";
import { ENDPOINTS } from "../../config/endpoints";
import { useAppDispatch } from "../../store/store-hooks";
import { userLogin } from "../../store/AuthSlice";

interface ILoginFormComponent {
  signInClick: MouseEventHandler;
  closeModal: () => void;
}

const LoginForm: FC<ILoginFormComponent> = ({ signInClick, closeModal }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();

  const handleLoginClick = async (event: FormEvent) => {
    event.preventDefault();
    const formData = Object.fromEntries(
      new FormData(formRef.current as HTMLFormElement).entries()
    );
    const response = await postData<IUserLoginPayload, IUserData>(
      ENDPOINTS.userLogin,
      {
        userName: formData.userName as string,
        password: formData.password as string,
      }
    );
    if (response.success) {
      dispatch(userLogin(response));
      closeModal();
    }
  };

  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6 form-background"
          ref={formRef}
          onSubmit={handleLoginClick}
        >
          {/* User Name */}
          <Input id="userName" label="User Name" type="text" required />

          {/* Password */}
          <Input
            id="password"
            label="Create a Password"
            required
            type="password"
          />

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log In
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <br />
          <button
            className="font-semibold text-indigo-600 hover:text-indigo-500"
            onClick={signInClick}
          >
            Sign Up for a free acoount, takes a minute!
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
