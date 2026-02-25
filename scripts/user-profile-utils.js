export const loadUserProfile = () => {
    // Attempt to get the user profile from sessionStorage.
    // If it does not exist, we will create one
    let userProfileStr = sessionStorage.getItem("userProfile");
    if (userProfileStr === null) {
        userProfileStr = `{"name": "", "isLoggedIn": false}`;
        sessionStorage.setItem("userProfile", userProfileStr);
    }
    return JSON.parse(userProfileStr);
};