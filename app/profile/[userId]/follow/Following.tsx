"use client";
import ProfileLetter from "../../../components/ProfilePicture/ProfileLetter";
import PrimaryButton from "../../../components/Buttons/Button";
import Line from "../../../components/Line/Line";
import { useEffect, useState } from "react";
import axios from "axios";
import { log } from "console";

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
          `http://localhost:3000/api/follower/followers?userId=${userId}`
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
      {following == undefined || following == null || following.length < 1 ? (
        <>
          {" "}
          {following.map((follow) => (
            <div className="mb-4" key={follow.id}>
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-4">
                  <ProfileLetter>
                    {follow.username[0].toUpperCase()}
                  </ProfileLetter>
                  <p className="font-bold text-lg">{follow.username}</p>
                </div>
                <PrimaryButton>Follow</PrimaryButton>
              </div>
              <Line />
            </div>
          ))}
        </>
      ) : (
        <>No following yet!</>
      )}
    </div>
  );
};

export default Following;
