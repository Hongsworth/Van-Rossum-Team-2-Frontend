// Shared utility functions

const API_URL = "https://van-rossum-team-2-production.up.railway.app/api/posts";

// Fetches posts from the API. Pass a userId to get user-specific posts.
export const fetchPosts = async (userId = null) => {
  let url = API_URL;
  if (userId != null) url += "/userPosts?userId=" + userId;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

// Toggles the heart icon inside a given button between filled and outlined
export const toggleHeart = (btn) => {
  const icon = btn.querySelector(".material-icons");
  icon.textContent =
    icon.textContent === "favorite_border" ? "favorite" : "favorite_border";
};
