import Emoji from "./Emoji";
import Gif from "./Gifs";
import Images from "./Images";
import Poll from "./Poll";

const PostFeatures = ({
  sendUrl,
  communityId,
  sharedCommunity,
  userId,
}: {
  sendUrl: (arg0: string) => void;
  communityId: string | string[];
  sharedCommunity: string | string[];
  userId: string | undefined;
}) => {
  return (
    <div className="flex justify-between w-1/2 items-center flex-row text-theme-blue h-min">
      <Images sendUrl={sendUrl}></Images>
      {/* <Gif></Gif> */}
      {/* <Emoji sendEmoji={sendEmoji}></Emoji> */}
      <Poll
        communityId={communityId}
        userId={userId}
        sharedCommunity={sharedCommunity}
      ></Poll>
    </div>
  );
};

export default PostFeatures;
