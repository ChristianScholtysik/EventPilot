import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import supabaseClient from "../lib/supabaseClient";
import { MdArrowForwardIos } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Profile = () => {
  const userContext = useUserContext();
  const user = userContext?.user;
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  console.log(avatarUrl);
  console.log(user);

  const navigate = useNavigate();

  // Set the avatar URL from the profile when the component mounts or userContext changes
  useEffect(() => {
    if (userContext?.profile?.avatar_url) {
      setAvatarUrl(userContext.profile.avatar_url);
    }
  }, [userContext]);

  if (!user) {
    return null;
  }

  const handleUpload = async () => {
    if (!avatarFile) {
      return;
    }
    setUploading(true);

    const fileName = `${user.id}_${avatarFile.name}`;
    const uploadAvatarResponse = await supabaseClient.storage
      .from("avatars")
      .upload(fileName, avatarFile, { upsert: true });

    if (uploadAvatarResponse.error) {
      console.error("Error uploading Avatar", uploadAvatarResponse.error);
      setUploading(false);
      return;
    }

    const publicUrlForAvatar = await supabaseClient.storage
      .from("avatars")
      .getPublicUrl(fileName);

    if (!publicUrlForAvatar.data) {
      console.error("Error getting publicUrl");
      setUploading(false);
      return;
    }

    const updateProfilesResponse = await supabaseClient
      .from("profiles")
      .update({ avatar_url: publicUrlForAvatar.data.publicUrl })
      .eq("id", user.id);

    if (updateProfilesResponse.error) {
      console.error(
        "Error setting avatar Url",
        updateProfilesResponse.error.message
      );
      setUploading(false);
      return;
    }

    setAvatarUrl(publicUrlForAvatar.data.publicUrl);
    setUploading(false);
  };

  const handleDelete = async () => {
    if (!avatarUrl) {
      return;
    }

    setIsDeleting(true);

    const filePath = avatarUrl.split("/").slice(-2).join("/");

    const deleteAvatarResponse = await supabaseClient.storage
      .from("avatars")
      .remove([filePath]);

    if (deleteAvatarResponse.error) {
      console.error("Error deleting Avatar", deleteAvatarResponse.error);
      setIsDeleting(false);
      return;
    }

    const updateProfilesResponse = await supabaseClient
      .from("profiles")
      .update({ avatar_url: undefined })
      .eq("id", user.id);

    if (updateProfilesResponse.error) {
      console.error(
        "Error removing avatar Url",
        updateProfilesResponse.error.message
      );
      setIsDeleting(false);
      return;
    }

    setAvatarUrl(null);
    setIsDeleting(false);
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    const signoutResponse = await supabaseClient.auth.signOut();

    if (signoutResponse.error) {
      console.log("Logout error", signoutResponse.error);
    } else {
      userContext?.setUser(null);
      navigate("/signin");
    }
  };

  return (
    <>
      <div className="flex justify-center h-full ">
        <section className="flex flex-col justify-center items-center h-screen w-full max-w-sm bg-gray-100 relative shadow-xl">
          <header>
            <div className="flex items-center">
              <img
                src="/src/assets/img/Logo.png"
                alt=""
                className="h-8 justify-start text-left mr-20 "
              />
              <h2 className="text-2xl font-bold mt-4 mb-4 font-Inter flex">
                {userContext?.profile?.firstName}{" "}
                {userContext?.profile?.lastName}
              </h2>
            </div>
            <div className="flex justify-center">
              {avatarUrl ? (
                <img
                  alt="User Avatar"
                  src={avatarUrl}
                  className="h-32 w-32 rounded-full cursor-pointer object-cover object-center "
                />
              ) : (
                <div className=" h-32 w-32 rounded-full bg-gray-800 flex items-center justify-center">
                  No image
                </div>
              )}{" "}
            </div>
          </header>
          {/* //TODO: Abstände rand anpassen!!! */}

          <section className="  w-max-sm">
            <label className=" mt-4 mb-2 text-bold font-Inter ">
              <div className="text-left pl-6 mb-2 mt-2 font-Inter font-bold">
                About me
              </div>
              <article className="font-Inter pr-6 pl-6 text-justify">
                Candy pastry pie lemon drops cake. Cheesecake pudding croissant
                wafer gummies. Gingerbread gummi bears carrot cake gummi bears
                bear claw donut macaroon cupcake.
              </article>
            </label>
          </section>
          <label className="mt-4 mb-2 text-bold font-Inter ">
            <div className="text-left pl-6 mb-2 mt-2 font-Inter font-bold">
              Upload Image
            </div>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setAvatarFile(e.target.files[0]);
              }
            }}
            className="mt-2 mb-4 text-sm"
          />
          <section className="flex flex-col w-full w-max-sm">
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleUpload}
                disabled={uploading}
                type="submit"
                className={` uppercase bg-primary text-white font-Inter text-normal rounded-lg shadow-lg px-10 py-4  flex justify-between mb-4 ${
                  uploading ? "bg-secondary" : "bg-primary"
                }`}
              >
                <span className="flex justify-center ">
                  {uploading ? "loading" : "Upload"}
                </span>
                {/* <div className="  w-full rounded-full mb-4  p-1 bg-white bg-opacity-40  ">
                <BsArrowRight />
              </div> */}
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`uppercase text-white font-Inter text-normal rounded-lg shadow-lg px-10 py-4  flex justify-between mb-4 ${
                  isDeleting ? "bg-red-700" : "bg-tertiary"
                }`}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>

            <button
              className="bg-secondary text-white text-small font-Inter  rounded-lg shadow-lg ml-12 mr-12 py-4  flex justify-between items-center mb-2"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-2">
                <LuLogOut />
                <span>Logout</span>
              </div>
              <MdArrowForwardIos />
            </button>
          </section>
        </section>
      </div>
      <Navbar />
    </>
  );
};

export default Profile;
