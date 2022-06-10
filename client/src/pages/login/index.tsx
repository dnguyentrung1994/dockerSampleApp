import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../validations/login.schema";
import { useEffect, useState } from "react";
import { LoginAsync } from "../../store/user.store";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import Styles from "./Login.module.css";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const response = await dispatch(LoginAsync(data));
      if (response?.status === 200) {
        navigate("/");
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (!errors.password?.message && !errors.username?.message) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [errors.password, errors.username]);
  return (
    <div className={clsx(Styles.overlay)}>
      <div className={clsx(Styles.formContainer)}>
        <p className={clsx(Styles.formHeaderTitle)}>Login</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={clsx(Styles.formBody)}
        >
          <div className={clsx(Styles.inputContainer)}>
            <p className={clsx(Styles.inputTitle)}>Username</p>
            <input
              {...register("username")}
              autoFocus
              autoComplete="off"
              type="text"
              className={clsx(
                errors.username?.message
                  ? Styles.inputError
                  : Styles.inputNormal
              )}
              placeholder="Username"
            />
            <p
              className={clsx(
                errors.username?.message
                  ? Styles.inputMessageShow
                  : Styles.inputMessageHidden
              )}
            >
              {errors.username?.message ?? ""}
            </p>
          </div>

          <div className={clsx(Styles.inputContainer)}>
            <p className={clsx(Styles.inputTitle)}>Password</p>
            <div className={clsx(Styles.passwordInput)}>
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className={clsx(
                  errors.password?.message
                    ? Styles.inputError
                    : Styles.inputNormal
                )}
                placeholder="Password"
              />
              <div className={clsx(Styles.togglePasswordInputSection)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx(
                    showPassword
                      ? Styles.togglePasswordIconHidden
                      : Styles.togglePasswordIconShown
                  )}
                  fill="none"
                  viewBox="0 0 640 512"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <path
                    fill="currentColor"
                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                  ></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={clsx(
                    showPassword
                      ? Styles.togglePasswordIconShown
                      : Styles.togglePasswordIconHidden
                  )}
                  fill="none"
                  viewBox="0 0 640 512"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <path
                    fill="currentColor"
                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                  ></path>
                </svg>
              </div>
            </div>
            <p
              className={clsx(
                errors.password?.message
                  ? Styles.inputMessageShow
                  : Styles.inputMessageHidden
              )}
            >
              {errors.password?.message ?? ""}
            </p>
          </div>

          <div className={clsx(Styles.formFooter)}>
            <button
              className={clsx(
                disableSubmit
                  ? Styles.submitButtonDisabled
                  : Styles.submitButtonEnabled
              )}
              type="submit"
              disabled={disableSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={clsx(Styles.submitButtonIcon)}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <p className={clsx(Styles.submitButtonLabel)}>Log in</p>
            </button>

            <button
              type="button"
              tabIndex={-1}
              className={clsx(Styles.registerButton)}
            >
              Don't have an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
