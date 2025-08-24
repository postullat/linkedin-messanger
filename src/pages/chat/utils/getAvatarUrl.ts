import type { Member } from "@/types/Member";

export const getAvatarUrl = (profilePicture: Member["profilePicture"]) => {
  return profilePicture?.rootUrl
    ? profilePicture.rootUrl + profilePicture.artifacts?.[1]?.fileIdentifyingUrlPathSegment
    : null;
};
