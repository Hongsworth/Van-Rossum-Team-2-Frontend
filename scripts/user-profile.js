// Profile page — loads user data and their posts, renders stats and cards.
import fakeUserSessionData, { fakePosts } from "../data/fakeUser.js";

// -- Nav dropdown toggle --
const navToggle = document.getElementById("navToggle");
const navDropdown = document.getElementById("navDropdown");

navToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navDropdown.classList.toggle("nav__dropdown--open");
});

document.addEventListener("click", () => {
  navDropdown.classList.remove("nav__dropdown--open");
});

const API_URL = "http://localhost:8080/api/v1/";

// Use real sessionStorage when available, fall back to fake data for development
const sessionStr = sessionStorage.getItem("userProfile");
const sessionUser = sessionStr ? JSON.parse(sessionStr) : null;
const currentUser =
  sessionUser && sessionUser.isLoggedIn ? sessionUser : fakeUserSessionData;

// -- DOM refs --
const profileUsernameEl = document.getElementById("profileUsername");
const totalPostsEl = document.getElementById("totalPosts");
const breedsCountEl = document.getElementById("breedsCount");
const totalLikesEl = document.getElementById("totalLikes");
const postsFeed = document.getElementById("postsFeed");

// Set page title
profileUsernameEl.textContent = `${currentUser.name} Posts`;

// -- Render a single post card --
const createPostCard = (post) => {
  const card = document.createElement("article");
  card.classList.add("post-card");

  // Photo
  const img = document.createElement("img");
  img.classList.add("post-card__image");
  img.src = post.imageUrl || "";
  img.alt = post.breed ? `${post.breed} dog` : "Dog photo";

  const body = document.createElement("div");
  body.classList.add("post-card__body");

  // Caption
  const caption = document.createElement("p");
  caption.classList.add("post-card__caption");
  caption.textContent = post.description || "";

  // Location
  const location = document.createElement("p");
  location.classList.add("post-card__location");
  location.innerHTML = `
    <span class="post-card__location-icon material-icons">location_on</span>
    ${post.location || "Unknown location"}
  `;

  // Date & time
  const dateTime = document.createElement("p");
  dateTime.classList.add("post-card__datetime");
  if (post.createdAt) {
    const date = new Date(post.createdAt);
    dateTime.innerHTML = `
      <span class="post-card__datetime-icon material-icons">schedule</span>
      ${date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
      &nbsp;·&nbsp;
      ${date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
    `;
  }

  // Heart placeholder
  const likes = document.createElement("div");
  likes.classList.add("post-card__likes");

  const heartBtn = document.createElement("button");
  heartBtn.classList.add("post-card__heart-btn");
  heartBtn.innerHTML = `
    <span class="material-icons post-card__heart-icon">favorite_border</span>
    <span class="post-card__heart-count">${post.likes ?? 0}</span>
  `;

  heartBtn.addEventListener("click", () => {
    const icon = heartBtn.querySelector(".post-card__heart-icon");
    icon.textContent = icon.textContent === "favorite_border" ? "favorite" : "favorite_border";
  });

  likes.appendChild(heartBtn);

  body.appendChild(caption);
  body.appendChild(location);
  if (post.createdAt) body.appendChild(dateTime);
  body.appendChild(likes);

  card.appendChild(img);
  card.appendChild(body);

  return card;
};

// -- Compute and display stats --
const renderStats = (posts) => {
  const uniqueBreeds = new Set(posts.map((p) => p.breed).filter(Boolean));
  const totalLikes = posts.reduce((sum, p) => sum + (p.likes ?? 0), 0);

  totalPostsEl.textContent = posts.length;
  breedsCountEl.textContent = uniqueBreeds.size;
  totalLikesEl.textContent = totalLikes;
};

// -- Render all posts --
const renderPosts = (posts) => {
  postsFeed.innerHTML = "";

  if (!posts.length) {
    const empty = document.createElement("p");
    empty.classList.add("posts-empty");
    empty.textContent = "No posts yet. Add your first dog encounter!";
    postsFeed.appendChild(empty);
    return;
  }

  posts.forEach((post) => {
    postsFeed.appendChild(createPostCard(post));
  });
};

// -- Fetch posts from API --
const loadUserPosts = async () => {
  try {
    // TODO: switch to userID endpoint once the API supports fetching posts by user
    const response = await fetch(`${API_URL}users/${currentUser.name}/posts`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const posts = await response.json();
    renderStats(posts);
    renderPosts(posts);
  } catch (err) {
    console.warn("Could not load posts from API, using fake data:", err.message);
    renderStats(fakePosts);
    renderPosts(fakePosts);

  }
};

loadUserPosts();
