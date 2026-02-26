// Shared utility functions

// Toggles the heart icon inside a given button between filled and outlined
export const toggleHeart = (btn) => {
  const icon = btn.querySelector(".material-icons");
  icon.textContent =
    icon.textContent === "favorite_border" ? "favorite" : "favorite_border";
};
