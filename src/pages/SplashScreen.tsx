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
      }, 3000);
    }
  }, []);

  return (
    <>
      <section className="bg-custom-gradient h-screen w-full max-w-sm flex items-center justify-center">
        <div className="flex justify-center">
          <LogoSplash />
        </div>
      </section>
    </>
  );
};

export default SplashScreen;
