import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../validations/login.schema";
import { useEffect, useState } from "react";
import { LoginAsync } from "../../store/user.store";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [disableSubmit, setDisableSubmit] = useState(true);
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
    <div className=" bg-slate-100 w-screen h-screen flex align-middle justify-center">
      <div className="m-auto max-h-[70vh] max-w-full min-h-[350px] min-w-[60%] md:min-w-[45%] lg:min-w-[30%] h-fit w-fit bg-white shadow-lg rounded-lg">
        <p className=" text-2xl italic w-fit m-auto pt-3 pb-1 font-bold underline-offset-2">
          Login
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-t border-gray-300 shadow-inner"
        >
          <p className="text-lg italic pl-[5%] py-2 ">Username</p>
          <input
            {...register("username")}
            autoFocus
            autoComplete="off"
            type="text"
            className={`text-base block px-3 py-2 rounded-lg m-auto w-[90%] min-w-[200px] max-w-[40vw]
                bg-white border-2 placeholder-gray-600 shadow-md 
                focus:placeholder-gray-500 focus:bg-white focus:outline-none
                ${
                  errors.username?.message
                    ? " border-red-400 focus:border-red-600"
                    : "border-gray-300 focus:border-gray-600"
                }`}
            placeholder="Username"
          />
          {errors.username?.message && (
            <p
              className={`text-xs text-red-400 italic pl-[5%] py-2 
                transition duration-200 
                ${errors.username?.message ? " h-fit" : "h-0"}
            `}
            >
              {errors.username?.message ?? ""}
            </p>
          )}
          <p className="text-lg italic pl-[5%] py-2">Password</p>
          <div>
            <input
              {...register("password")}
              type="password"
              className="text-base block px-3 py-2 rounded-lg m-auto w-[90%] min-w-[200px] max-w-[40vw]
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                focus:placeholder-gray-500
                focus:bg-white 
                focus:border-gray-600  
                focus:outline-none"
              placeholder="Password"
            />
          </div>
          {errors.password?.message && (
            <p className="text-xs text-red-400 italic pl-[5%] py-2 ">
              {errors.password.message}
            </p>
          )}

          <div className="border-t border-gray-300 mt-8 w-full flex flex-col">
            <button
              className={`border-2 flex flex-nowrap transition duration-200
                    cursor-default w-1/4 min-w-[88px] self-end mr-8 shadow-lg 
                    rounded-lg p-[2px] my-2 focus:outline-none text-ellipsis overflow-hidden
                    ${
                      disableSubmit
                        ? "bg-gray-400"
                        : "bg-blue-400 hover:bg-indigo-500 hover:-translate-y-1 hover:scale-110"
                    }
                    `}
              type="submit"
              disabled={disableSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              <p className="text-base text-center">Log in</p>
            </button>

            <button
              type="button"
              tabIndex={-1}
              className="self-start pl-4 cursor-default hover:underline text-blue-500"
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
