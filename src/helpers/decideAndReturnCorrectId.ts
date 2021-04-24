import { DecideAndReturnCorrectId } from "../constants/interfaces";

export const decideAndReturnCorrectId: DecideAndReturnCorrectId = (
  { fetchingUser, user },
  { fetchingNUser, nUser },
  username
) => {
  let id = 0;
  let isLoggedUser = false;
  if (!fetchingUser && user && user.me.user.username === username) {
    id = user.me.user.id;
    isLoggedUser = true;
  } else if (!fetchingNUser && nUser) {
    id = nUser.getUserByUsername.user.id;
    isLoggedUser = false;
  }

  return { id, isLoggedUser };
};
