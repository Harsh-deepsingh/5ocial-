import React from "react";
import Card from "../components/Card/Card";
import PostAction from "../components/PostComponents/PostAction";
import ProfileLetter from "../components/ProfilePicture/ProfileLetter";
const Content = () => {
  return (
    <div>
      <Card>
        <div className="flex gap-3 h-max justify-start ">
          <ProfileLetter></ProfileLetter>
          <div className=" w-full flex flex-col">
            <p className="text-lg">username</p>
            <p>
              InteractionButtons.js or InteractionButtons.tsx: This name
              suggests that the file contains components related to user
              interactions, like liking and commenting. PostActions.js or
              PostActions.tsx: This name implies that the components are actions
              a user can take on a post, such as liking and commenting.
              SocialButtons.js or SocialButtons.tsx: This name reflects that the
              components are related to social interactions.
              EngagementButtons.js or EngagementButtons.tsx: This name
              highlights that the buttons are for engaging with content, like
              posts. smart mens are always listen music I think I'm not sure
              let's see
            </p>
          </div>
        </div>
        <PostAction></PostAction>
      </Card>
    </div>
  );
};

export default Content;
