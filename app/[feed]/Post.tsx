import PostInput from "./PostInput";
import { communityInfo } from "../lib/actions/getUsername";
import { logUserInfo } from "../lib/actions/getUsername";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";
import { IconUsersGroup } from "@tabler/icons-react";
const Post = async () => {
  const user = await communityInfo();
  const community = user?.communityName.toUpperCase();
  const res = await logUserInfo();
  const username = res?.username?.charAt(0);
  const char = username?.toUpperCase();
  return (
    <>
      <div className="w-full flex flex-col justify-between gap-1">
        <div className="flex gap-1 text-theme-blue">
          <IconUsersGroup className="w-4 h-4"></IconUsersGroup>
          <p className="text-xs">{community}</p>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 justify-start items-start">
            <div className="flex flex-col items-center">
              <ProfileLetter>{char}</ProfileLetter>
            </div>
            <div
              className="w-full
            "
            >
              <PostInput></PostInput>
            </div>
          </div>
          <div className="flex items-end justify-end mt-2">
            {/* <Button>Post</Button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
