// Profile page — loads user data and their posts, renders stats and cards.
import fakeUserSessionData, { fakePosts } from "../data/fake-user.js";
import { fetchPosts, toggleHeart } from "./utils.js";

// Use real sessionStorage when available, fall back to fake data for development
const sessionStr = sessionStorage.getItem("userProfile");
const sessionUser = sessionStr ? JSON.parse(sessionStr) : null;
const currentUser =
  sessionUser && sessionUser.isLoggedIn ? sessionUser : fakeUserSessionData;

// -- DOM refs --
const profileUsernameEl = document.getElementById("profileUsername");
const totalPostsEl = document.getElementById("totalPosts");
const breedsCountEl = document.getElementById("breedsCount");
const totalHeartsEl = document.getElementById("totalHearts");
const postsFeed = document.getElementById("postsFeed");

// Set page title
profileUsernameEl.textContent = `${currentUser.name} Posts`;

// -- Render a single post card --
const createPostCard = (post) => {
  const card = document.createElement("article");
  card.classList.add("post-card");
  card.style.cursor = "pointer";
  card.addEventListener("click", () => {
    window.location.href = `/pages/post-detail/post-detail.html?id=${post.id}`;
  });

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
  const hearts = document.createElement("div");
  hearts.classList.add("post-card__hearts");

  const heartBtn = document.createElement("button");
  heartBtn.classList.add("post-card__heart-btn");
  heartBtn.innerHTML = `
    <span class="material-icons post-card__heart-icon">favorite_border</span>
    <span class="post-card__heart-count">${post.hearts ?? 0}</span>
  `;

  heartBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleHeart(heartBtn);
  });

  hearts.appendChild(heartBtn);

  body.appendChild(caption);
  body.appendChild(location);
  if (post.createdAt) body.appendChild(dateTime);
  body.appendChild(hearts);

  card.appendChild(img);
  card.appendChild(body);

  return card;
};

// -- Compute and display stats --
const renderStats = (posts) => {
  const uniqueBreeds = new Set(posts.map((p) => p.breed).filter(Boolean));
  const totalHearts = posts.reduce((sum, p) => sum + (p.hearts ?? 0), 0);

  totalPostsEl.textContent = posts.length;
  breedsCountEl.textContent = uniqueBreeds.size;
  totalHeartsEl.textContent = totalHearts;
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
  if (!currentUser.id) {
    renderStats(fakePosts);
    renderPosts(fakePosts);
    return;
  }

  try {
    const posts = await fetchPosts(currentUser.id);
    renderStats(posts);
    renderPosts(posts);
  } catch (err) {
    console.warn("Could not load posts from API, using fake data:", err.message);
    renderStats(fakePosts);
    renderPosts(fakePosts);
  }
};

loadUserPosts();
