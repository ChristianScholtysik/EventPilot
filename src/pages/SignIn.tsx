import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import supabaseClient from "../lib/supabaseClient";
import { useState } from "react";
import Logo from "../components/Logo";
import { BsArrowRight } from "react-icons/bs";
import { IoEye, IoEyeOff } from "react-icons/io5";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const userContext = useUserContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    const authResponse = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (authResponse.error) {
      console.error("Login error", authResponse.error.message);
      setErrorMessage(authResponse.error.message);
      return;
    }

    if (authResponse.data?.user) {
      console.log("User erfolgreich angemeldet", authResponse.data.user);
      setSuccessMessage("Login successful.");

      userContext?.setUser(authResponse.data.user);

      setTimeout(() => navigate("/"), 1000);

      // navigate('/');
    }
  };
  const togglePasswordIsVisible = () => {
    setPasswordIsVisible(!passwordIsVisible);
  };

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const resetResponse = await supabaseClient.auth.resetPasswordForEmail(
      email
    );

    if (resetResponse.error) {
      console.error(resetResponse.error.message);
      setErrorMessage(resetResponse.error.message);
      return;
    }

    if (resetResponse.data) {
      setSuccessMessage("Password reset link has been sent to your email.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 relative">
      <Logo />
      <form
        className="w-full max-w-sm bg-white p-8 rounded-lg "
        onSubmit={handleLogin}
      >
        <h2 className=" font-bold text-lg font-Inter mb-4">Sign In</h2>
        <img
          src="/src/assets/img/Message.png"
          alt="Email Icon"
          className="absolute transform  w-5 h-5 m-5"
        />
        <input
          className="w-full px-6 py-4 shadow-lg rounded-lg text-stone-500 mb-4 text-left pl-12"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" Enter your email"
          required
        />
        <img
          src="/src/assets/img/Password.png"
          alt="Email Icon"
          className="absolute transform  w-5 h-5 m-5"
        />
        <input
          className="w-full px-6 py-4 shadow-lg  rounded-lg text-stone-500 mb-64 text-left pl-12"
          type={passwordIsVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button
          type="button"
          className="absolute  transform -translate-x-10 -translate-y-[-80%]  w-5 h-5 text-stone-500"
          onClick={togglePasswordIsVisible}
        >
          {passwordIsVisible ? <IoEye /> : <IoEyeOff />}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button
          className=" uppercase bg-primary text-white font-Inter text-normal rounded-lg shadow-lg px-24 py-4 w-full flex justify-between"
          type="submit"
        >
          <span className="flex justify-center">Sign In</span>
          <span className="rounded-full p-1 bg-white bg-opacity-40 justify-end ">
            <BsArrowRight />
          </span>
        </button>
      </form>
      <div>
        <button
          className="text-stone-600 font-normal font-InterThin"
          onClick={handleResetPassword}
        >
          Forgot your password?
        </button>
        <button
          className="text-primary pl-2 font-normal font-InterThin"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default SignIn;
