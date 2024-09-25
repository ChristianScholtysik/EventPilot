// import { User } from "@supabase/supabase-js";
// import { createContext, useContext, useState } from "react";
// import supabaseClient from "../lib/supabaseClient";
// import { Profile } from "../types/supabase-types-own";

// interface IUserContext {
//   user: User | null;

//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
//   profile: Profile | null;
//   setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
//   loading: boolean;
//   loadingPage: boolean;
//   setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const UserContext = createContext<IUserContext | null>(null);

// export const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [profile, setProfile] = useState<Profile | null>(null);
//   const [loadingPage, setLoadingPage] = useState<boolean>(true);

//   const fetchSessionAndProfile = async () => {
//     setLoading(true);

//     const { data: sessionData, error: sessionError } =
//       await supabaseClient.auth.getSession();

//     if (sessionError || !sessionData?.session) {
//       setLoading(false);
//       console.error("Error fetching session:", sessionError?.message);
//       return;
//     }

//     const user = sessionData.session.user;
//     setUser(user);

//   //* Profile
//   const { data: profileData, error: profileError } = await supabaseClient
//     .from("profiles")
//     .select("*")
//     .eq("id", user.id)
//     .single();

//   if (profileError || !profileData) {
//     console.error("Error fetching profile:", profileError?.message);
//     setLoading(false);
//     return;
//   }

//   setProfile(profileData);

//   fetchSessionAndProfile();
// }, []);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         loading,
//         setLoadingPage,
//         loadingPage,
//         profile,
//         setProfile,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUserContext = () => useContext(UserContext);

import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState, useEffect } from "react";
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

  const fetchSessionAndProfile = async () => {
    setLoading(true);

    const { data: sessionData, error: sessionError } =
      await supabaseClient.auth.getSession();

    if (sessionError || !sessionData?.session) {
      setLoading(false);
      console.error("Error fetching session:", sessionError?.message);
      return;
    }

    const user = sessionData.session.user;
    setUser(user);

    //* Fetch Profile
    const { data: profileData, error: profileError } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profileData) {
      console.error("Error fetching profile:", profileError?.message);
      setLoading(false);
      return;
    }

    setProfile(profileData);
    setLoading(false); // Data fetched, stop loading
  };

  // Use useEffect to run fetchSessionAndProfile on component mount
  useEffect(() => {
    fetchSessionAndProfile();
  }, []); // Empty dependency array to run on mount only

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
