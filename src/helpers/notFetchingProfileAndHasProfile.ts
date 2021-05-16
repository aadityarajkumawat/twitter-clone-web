export const notFetchingProfileAndHasProfile = (
    fetching: boolean,
    profileObj: any
) => {
    return (
        !fetching && profileObj && profileObj.profileStuffAndUserTweets.profile
    );
};
