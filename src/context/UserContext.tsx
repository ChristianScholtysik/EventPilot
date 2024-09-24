import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import supabaseClient from "../lib/supabaseClient";
import { Profile } from "../types/supabase-types-own";

interface IUserContext {
  user: User | null;

  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  loading: boolean;
  loadingPage: boolean;
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  useEffect(() => {
    const fetchSession = async () => {
      const sessionResponse = await supabaseClient.auth.getSession();
      if (sessionResponse.error) {
        return;
      }

      if (sessionResponse.data.session) {
        setUser(sessionResponse.data.session.user);
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoadingPage,
        loadingPage,
        profile,
        setProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
