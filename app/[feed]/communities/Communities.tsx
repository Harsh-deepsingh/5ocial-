"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { IconUsersGroup } from "@tabler/icons-react";
import ViewCommunity from "./ViewCommunity";

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const params = useParams();
  const ids = params.feed;
  const id = ids.toString().split("%26");
  const communityId = id[1];

  useEffect(() => {
    async function getCommunity() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/community/search?communityId=${communityId}`
        );
        setCommunities(res.data.CommunitiesInfo);
      } catch (error) {
        return { message: `error` };
      }
    }
    getCommunity();
  }, []);

  return (
    <div>
      <div className="max-w-4xl mx-auto mt-9">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Explore Other Communities & Shared posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {communities.map((community) => (
            <div
              key={community.communityId}
              className="p-6 border border-theme-border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-2">
                <IconUsersGroup></IconUsersGroup>
                <h3 className="text-xl font-semibold mb-2">
                  {community.communityName}
                </h3>
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-gray-600">{community.userCount} members</p>{" "}
                <p className="text-gray-600">112 Shared posts</p>{" "}
              </div>
              <div className="mt-2 w-32">
                <ViewCommunity
                  communityId={community.communityId}
                ></ViewCommunity>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communities;
