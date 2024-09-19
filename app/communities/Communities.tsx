import { IconUsersGroup } from "@tabler/icons-react";
import ViewCommunity from "./ViewCommunity";
import { getCommunitiesWithUserCounts } from "../lib/actions/getCommunities";
import { logUserInfo } from "../lib/actions/getUsername";

const Communities = async () => {
  const data = await logUserInfo();
  const excludedCommunityId = data?.communityId;
  const res = await getCommunitiesWithUserCounts(excludedCommunityId);
  const communities = res;

  return (
    <div>
      <div className="max-w-4xl mx-auto mt-9">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Explore Other Communities & Shared posts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {communities ? (
            <>
              {" "}
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
                    <p className="text-gray-600">
                      {community.userCount} members
                    </p>{" "}
                    <p className="text-gray-600">112 Shared posts</p>{" "}
                  </div>
                  <div className="mt-2 w-32">
                    <ViewCommunity
                      communityId={community.communityId}
                    ></ViewCommunity>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>No community found</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communities;
