import { toggleHeart } from "../../../scripts/utils.js";

const API_URL = "https://van-rossum-team-2-production.up.railway.app/api/posts";

const gridContainer = document.querySelector(".grid__container");

// Fetches posts from the API. Pass a userId to get user-specific posts.
export const fetchPosts = async (userId = null) => {
  let url = API_URL;
  if (userId != null) {
    url += "/userPosts?userId=" + userId;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

const displayPosts = (json) => {
  //Remove all current posts displayed
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  // Store the ordered list of public post IDs so post-detail can use them for Next navigation
  const publicIds = json.filter(p => p["is_public"]).map(p => p["id"]);
  sessionStorage.setItem("gridPostIds", JSON.stringify(publicIds));

  //Generate HTML for all json objects that are returned
  json.forEach((post) => {
    // Skip posts that are not public
    if (!post["is_public"]) {
      return;
    }
    // Card Container
    const cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "grid__post");
    cardContainer.style.cursor = "pointer";
    cardContainer.addEventListener("click", () => {
      sessionStorage.setItem("currentPost", JSON.stringify(post));
      window.location.href = `/pages/post-detail/post-detail.html?id=${post["id"]}`;
    });
    gridContainer.appendChild(cardContainer);

    //Card Body

    //Element creation
    const image = document.createElement("img");
    image.setAttribute("class", "grid__post--image");
    image.setAttribute("src", post["photo_url"]);
    image.setAttribute("alt", post["breed_name"] ? `${post["breed_name"]} dog` : "Dog photo");

    const body = document.createElement("div");
    body.setAttribute("class", "grid__post__body");

    const dogName = document.createElement("p");
    dogName.setAttribute("class", "grid__post--name");
    dogName.innerHTML = post["dog_name"];

    const breedName = document.createElement("p");
    breedName.setAttribute("class", "grid__post--breed");
    breedName.innerHTML = post["breed_name"];

    const caption = document.createElement("p");
    caption.setAttribute("class", "grid__post--caption");
    const captionText = post["caption"] || "";
    caption.innerHTML = captionText.length > 50 ? captionText.slice(0, 50) + "..." : captionText;

    const location = document.createElement("p");
    location.setAttribute("class", "grid__post--location");
    location.innerHTML = `<span class="grid__post--location-icon material-icons">location_on</span> ${post["location"] || "Unknown location"}`;

    const dateTime = document.createElement("p");
    dateTime.setAttribute("class", "grid__post__datetime");
    const dateStr = post["created_at"];
    if (dateStr) {
      const date = new Date(dateStr);
      dateTime.innerHTML = `
        <span class="grid__post__datetime-icon material-icons">schedule</span>
        ${date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        &nbsp;·&nbsp;
        ${date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
      `;
    }

    const hearts = document.createElement("div");
    hearts.setAttribute("class", "grid__post__hearts");

    const heartBtn = document.createElement("button");
    heartBtn.setAttribute("class", "grid__post__heart-btn");
    heartBtn.innerHTML = `
      <span class="material-icons grid__post__heart-icon">favorite_border</span>
      <span class="grid__post__heart-count">${post["hearts"] ?? 0}</span>
    `;
    heartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleHeart(heartBtn);
    });
    hearts.appendChild(heartBtn);

    //Append to container
    body.appendChild(dogName);
    body.appendChild(breedName);
    body.appendChild(caption);
    body.appendChild(location);
    if (dateStr) body.appendChild(dateTime);
    body.appendChild(hearts);

    cardContainer.appendChild(image);
    cardContainer.appendChild(body);
  });
};

if (gridContainer) {
  fetchPosts()
    .then(displayPosts)
    .catch((error) => console.error("Error:", error));
}
