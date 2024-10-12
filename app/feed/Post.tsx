import PostInput from "./PostInput";
import { logUserInfo } from "../lib/actions/getUsername";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";

const Post = async () => {
  const res = await logUserInfo();
  const username = res?.username?.charAt(0);
  const char = username?.toUpperCase();
  return (
    <>
      <div className="w-full flex flex-col justify-between gap-1">
        <div className="flex flex-col">
          <div className="flex gap-2 justify-start items-start">
            <div className="flex flex-col items-center">
              <ProfileLetter username={res?.username}>{char}</ProfileLetter>
            </div>
            <div className="w-full">
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
