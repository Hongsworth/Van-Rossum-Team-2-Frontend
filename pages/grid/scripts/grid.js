import { toggleHeart } from "../../../scripts/utils.js";

const API_URL = "https://van-rossum-team-2-production.up.railway.app/api/posts";
const gridContainer = document.querySelector(".grid__container");

const displayPosts = (posts) => {
  if (!gridContainer) return;
  gridContainer.innerHTML = "";

  const publicIds = posts.filter((p) => p.is_public).map((p) => p.id);
  sessionStorage.setItem("gridPostIds", JSON.stringify(publicIds));

  posts.forEach((post) => {
    if (!post.is_public) return;

    const card = document.createElement("div");
    card.classList.add("grid__post");
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      sessionStorage.setItem("currentPost", JSON.stringify(post));
      window.location.href = `/pages/post-detail/post-detail.html?id=${post.id}`;
    });

    const img = document.createElement("img");
    img.classList.add("grid__post--image");
    img.src = post.photo_url;
    img.alt = post.breed_name ? `${post.breed_name} dog` : "Dog photo";

    const body = document.createElement("div");
    body.classList.add("grid__post__body");

    const dogName = document.createElement("p");
    dogName.classList.add("grid__post--name");
    dogName.textContent = post.dog_name;

    const breedName = document.createElement("p");
    breedName.classList.add("grid__post--breed");
    breedName.textContent = post.breed_name;

    const caption = document.createElement("p");
    caption.classList.add("grid__post--caption");
    const text = post.caption || "";
    caption.textContent = text.length > 50 ? text.slice(0, 50) + "..." : text;

    const location = document.createElement("p");
    location.classList.add("grid__post--location");
    location.innerHTML = `<span class="grid__post--location-icon material-icons">location_on</span> ${post.location || "Unknown location"}`;

    const hearts = document.createElement("div");
    hearts.classList.add("grid__post__hearts");

    const heartBtn = document.createElement("button");
    heartBtn.classList.add("grid__post__heart-btn");
    heartBtn.innerHTML = `
      <span class="material-icons grid__post__heart-icon">favorite_border</span>
      <span class="grid__post__heart-count">${post.hearts ?? 0}</span>
    `;
    heartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleHeart(heartBtn);
    });

    hearts.appendChild(heartBtn);

    body.append(dogName, breedName, caption, location, hearts);
    card.append(img, body);
    gridContainer.appendChild(card);
  });
};

export const fetchAndDisplayPosts = async (
  userId = null,
  searchQuery = "",
  render = true,
) => {
  try {
    let url = API_URL;

    if (searchQuery) {
      url += `/search?search=${encodeURIComponent(searchQuery)}`;
      if (userId) url += `&userId=${userId}`;
    } else if (userId) {
      url += `/userPosts?userId=${userId}`;
    } else {
    }

    const res = await fetch(url);
    const data = await res.json();

    if (render) {
      displayPosts(data);
    }

    return data; // always return data
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchPosts = async (userId = null) => {
  try {
    let url = API_URL;
    if (userId != null) {
      url += `/userPosts?userId=${userId}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("fetchPosts error:", err);
    return [];
  }
};

if (gridContainer) {
  const searchBar = document.querySelector(".search");
  const searchInput = document.querySelector(".search__input");

  if (searchBar) {
    fetchAndDisplayPosts();
    searchBar.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      fetchAndDisplayPosts(null, query);
    });
  }
}
