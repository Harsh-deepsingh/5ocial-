import React from "react";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";

const SubContent = async () => {
  // const router = useRouter();
  // const openProfile = () => {
  //   router.push("profile");

  return (
    <div>
      <div className="flex gap-3 h-max justify-start ">
        <ProfileLetter>H</ProfileLetter>
        <div className=" w-full flex flex-col">
          <p className="text-lg">H</p>
          <p>// show posts here</p>
        </div>
      </div>
    </div>
  );
};

export default SubContent;
