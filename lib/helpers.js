"use babel";

import request from "superagent";
import firebase from "firebase";

export const fbKeyEncode = str => encodeURIComponent(str).replace(/\./g, "%2E");
export const fbKeyDecode = str => decodeURIComponent(str).replace("%2E", ".");

export const repoIdForPath = (goalPath, savedRepos) => {
  const idx = atom.project
    .getDirectories()
    .findIndex(dir => dir.contains(goalPath));
  if (idx === -1 || !savedRepos) {
    return null;
  }
  const url = savedRepos[idx];
  return url ? fbKeyEncode(url) : null;
};

export const postConversation = ({ ref, event }) => {
  const user = firebase.auth().currentUser;
  user.getIdToken().then(jwt => {
    const siteUrl = atom.config.get("codesidestory-atom.siteUrl");
    const payload = { ref, jwt, event };
    request
      .post(`${siteUrl}/api/chat/send`)
      .type("json")
      .accept("json")
      .send(payload)
      .then(() => {})
      .catch(console.error);
  });
};
