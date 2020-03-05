import React from "react";
import RepoItem from "./RepoItem";

const Repos = ({repos}) => {
  return repos.map((repo, index) => <RepoItem repo={repo} key={index} />);
};

export default Repos;
