import React, { useState, useEffect } from "react";
import ProfileLetter from "../../../components/ProfilePicture/ProfileLetter";
import Line from "../../../components/Line/Line";
import axios from "axios";
import Follow from "../../../components/PostComponents/Follow";
interface Follower {
  user: {
    id: string;
    username: string;
  };
}

const Followers = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;
  const [followers, setFollowers] = useState<Follower[]>([]);

  useEffect(() => {
    async function fetchFollowers() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/follower/followers?userId=${userId}`
        );
        setFollowers(res.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    }
    fetchFollowers();
  }, [userId]);

  return (
    <div>
      {followers.length > 0 && followers !== undefined ? (
        followers.map((follow) => (
          <div key={follow.user.id} className="mb-4">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-4">
                <ProfileLetter username={follow.user.username}>
                  {follow.user.username[0].toUpperCase()}
                </ProfileLetter>
                <p className="font-bold text-lg">{follow.user.username}</p>
              </div>
              <Follow followingId={follow.user.id}></Follow>
            </div>
            <Line />
          </div>
        ))
      ) : (
        <div className="text-red-600 font-bold flex justify-center items-center w-full h-32">
          <p>No followers yet!</p>
        </div>
      )}
    </div>
  );
};

export default Followers;
