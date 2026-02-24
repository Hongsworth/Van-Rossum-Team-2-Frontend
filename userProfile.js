export const loadUserProfile = () => {
    let userProfileStr = sessionStorage.getItem("userProfile");
    if (userProfileStr === null) {
        userProfileStr = `{"name": "", "isLoggedIn": false}`;
        sessionStorage.setItem("userProfile", userProfileStr);
    }
    return JSON.parse(userProfileStr);
};