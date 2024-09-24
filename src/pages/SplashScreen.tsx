import { useEffect } from "react";
import LogoSplash from "../components/LogoSplash";
import { useUserContext } from "../context/UserContext";

const SplashScreen = () => {
  const userContext = useUserContext();
  const setLoadingPage = userContext?.setLoadingPage;

  useEffect(() => {
    if (setLoadingPage) {
      setTimeout(() => {
        setLoadingPage(false);
      }, 80000);
    }
  }, [setLoadingPage]);

  return (
    <>
      <section className="bg-custom-gradient h-screen w-full max-w-sm flex justify-center items-center">
        <LogoSplash />
      </section>
    </>
  );
};

export default SplashScreen;
