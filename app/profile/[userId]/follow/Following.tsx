"use client";
import ProfileLetter from "../../../components/ProfilePicture/ProfileLetter";
import Follow from "../../../components/PostComponents/Follow";
import Line from "../../../components/Line/Line";
import { useEffect, useState } from "react";
import axios from "axios";

interface Follower {
  id: string;
  username: string;
}

const Following = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;

  const [following, setFollowing] = useState<Follower[]>([]);

  useEffect(() => {
    async function fetchFollowing() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/follower/following?userId=${userId}`
        );
        setFollowing(res.data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    }
    fetchFollowing();
  }, [userId]);

  return (
    <div>
      {following == undefined || following == null || following.length > 0 ? (
        <>
          {following.map((follow) => (
            <div className="mb-4" key={follow.id}>
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-4">
                  <ProfileLetter username={follow.username}>
                    {follow.username.charAt(0).toUpperCase()}
                  </ProfileLetter>
                  <p className="font-bold text-lg">{follow.username}</p>
                </div>

                <Follow followingId={follow.id}></Follow>
              </div>
              <Line />
            </div>
          ))}
        </>
      ) : (
        <div className="text-red-600 font-bold flex justify-center items-center w-full h-32">
          <p>No following yet!</p>
        </div>
      )}
    </div>
  );
};

export default Following;
