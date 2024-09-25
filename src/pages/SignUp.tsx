import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import supabaseClient from "../lib/supabaseClient";
import { useState } from "react";
import Logo from "../components/Logo";
import { BsArrowRight } from "react-icons/bs";
import { IoEye, IoEyeOff } from "react-icons/io5";
import SplashScreen from "./SplashScreen";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);
  const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
    useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const navigate = useNavigate();

  const userContext = useUserContext();
  // const user = userContext?.user;
  const loadingPage = userContext?.loadingPage;

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!termsAccepted) {
      setErrorMessage("You must agree to the terms and service.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const authResponse = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    if (authResponse.data.user) {
      console.log("User registration successful", authResponse.data.user);
      setSuccessMessage(
        "Sign-up successful. Please check your email to confirm your account."
      );

      setTimeout(() => navigate("/signin"), 2000);
    }
  };

  const togglePasswordIsVisible = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };
  const toggleConfirmPasswordIsVisible = () => {
    setConfirmPasswordIsVisible(!confirmPasswordIsVisible);
  };

  return (
    <>
      <section className="flex justify-center">
        {loadingPage ? (
          <SplashScreen />
        ) : (
          <div className="flex flex-col justify-center items-center h-screen w-full max-w-sm bg-gray-100 relative shadow-xl">
            <Logo />
            <form
              className="w-full max-w-sm bg-white p-4 rounded-lg "
              onSubmit={handleSignUp}
            >
              <h2 className="font-bold text-lg font-Inter mb-2">Sign Up</h2>
              <div className="mb-4">
                <img
                  src="/src/assets/img/Profile.png"
                  alt="Profile Icon"
                  className="absolute transform  w-4 h-4 m-5"
                />
                <input
                  type="text"
                  id="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="w-full px-6 py-4 shadow-lg rounded-lg text-stone-500 text-left pl-12"
                  placeholder="First Name"
                />
              </div>
              <div className="mb-4">
                <img
                  src="/src/assets/img/Profile.png"
                  alt="Profile Icon"
                  className="absolute transform  w-4 h-4 m-5"
                />
                <input
                  type="text"
                  id="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="w-full px-6 py-4 shadow-lg rounded-lg text-stone-500 text-left pl-12"
                  placeholder="Last Name"
                />
              </div>
              <div className="relative mb-4">
                <img
                  src="/src/assets/img/Message.png"
                  alt="Email Icon"
                  className="absolute transform  w-4 h-4 m-5"
                />
                <input
                  className="w-full px-6 py-4 shadow-lg rounded-lg text-stone-500 text-left pl-12"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="relative mb-4">
                <img
                  src="/src/assets/img/Password.png"
                  alt="Password Icon"
                  className="absolute transform  w-5 h-5 m-5"
                />
                <input
                  className="w-full px-6 py-4 shadow-lg rounded-lg text-stone-500 text-left pl-12"
                  type={passwordIsVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500"
                  onClick={togglePasswordIsVisible}
                >
                  {passwordIsVisible ? <IoEye /> : <IoEyeOff />}
                </button>
              </div>

              <div className="relative mb-8">
                <img
                  src="/src/assets/img/Password.png"
                  alt="Password Icon"
                  className="absolute transform  w-5 h-5 m-5"
                />
                <input
                  className="w-full px-6 py-4 shadow-lg rounded-lg text-stone-500 text-left pl-12"
                  type={passwordIsVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500"
                  onClick={toggleConfirmPasswordIsVisible}
                >
                  {confirmPasswordIsVisible ? <IoEye /> : <IoEyeOff />}
                </button>
              </div>

              <div className="mb-10">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                  className="mr-2  "
                />
                <label htmlFor="terms" className="text-xs text-tBase ">
                  Agree to our <b>Terms and Service</b>
                </label>
              </div>

              {errorMessage && (
                <p className="error-message text-red-500">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="success-message text-green-500">
                  {successMessage}
                </p>
              )}
              <button
                className="uppercase bg-primary text-white font-Inter text-normal rounded-lg shadow-lg px-24 py-4 w-full flex justify-between"
                type="submit"
              >
                <span className="flex justify-center">Sign In</span>
                <span className="rounded-full p-1 bg-white bg-opacity-40 justify-end ">
                  <BsArrowRight />
                </span>
              </button>
            </form>
            <div className="mt-4 flex">
              <div className="text-stone-600 font-normal font-InterThin">
                Already have an account?
              </div>
              <button
                className="text-primary pl-2 font-normal font-InterThin"
                onClick={() => navigate("/signin")}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default SignUp;
