// Profile page — loads user data and their posts, renders stats and cards.
import fakeUserSessionData, { fakePosts } from "../data/fake-user.js"; // TODO: remove when login saves session
import { toggleHeart } from "./utils.js";
import { fetchPosts } from "../pages/grid/scripts/grid.js";

const sessionStr = sessionStorage.getItem("userProfile");
const sessionUser = sessionStr ? JSON.parse(sessionStr) : null;
// TODO: remove fakeUserSessionData fallback when login is wired up
const currentUser = sessionUser?.isLoggedIn ? sessionUser : fakeUserSessionData;

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
  const card = document.createElement("div");
  card.classList.add("grid__post");
  card.style.cursor = "pointer";
  card.addEventListener("click", () => {
    sessionStorage.setItem("currentPost", JSON.stringify(post));
    window.location.href = `/pages/post-detail/post-detail.html?id=${post.id}`;
  });

  // Photo
  const img = document.createElement("img");
  img.classList.add("grid__post--image");
  img.src = post.photo_url || post.imageUrl || "";
  const breedLabel = post.breed_name || post.breed || "";
  img.alt = breedLabel ? `${breedLabel} dog` : "Dog photo";

  const body = document.createElement("div");
  body.classList.add("grid__post__body");

  // Caption
  const caption = document.createElement("p");
  caption.classList.add("grid__post--caption");
  const desc = post.description || post.caption || "";
  caption.textContent = desc.length > 50 ? desc.slice(0, 50) + "..." : desc;

  // Location
  const location = document.createElement("p");
  location.classList.add("grid__post--location");
  location.innerHTML = `
    <span class="grid__post--location-icon material-icons">location_on</span>
    ${post.location || "Unknown location"}
  `;

  // Date & time
  const dateTime = document.createElement("p");
  dateTime.classList.add("grid__post__datetime");
  const dateStr = post.created_at || post.createdAt;
  if (dateStr) {
    const date = new Date(dateStr);
    dateTime.innerHTML = `
      <span class="grid__post__datetime-icon material-icons">schedule</span>
      ${date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
      &nbsp;·&nbsp;
      ${date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
    `;
  }

  // Hearts
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

  body.appendChild(caption);
  body.appendChild(location);
  if (dateStr) body.appendChild(dateTime);
  body.appendChild(hearts);

  card.appendChild(img);
  card.appendChild(body);

  return card;
};

// -- Compute and display stats --
const renderStats = (posts) => {
  const uniqueBreeds = new Set(posts.map((p) => p.breed_name || p.breed).filter(Boolean));
  const totalHearts = posts.reduce((sum, p) => sum + (p.hearts ?? 0), 0);

  totalPostsEl.textContent = posts.length;
  breedsCountEl.textContent = uniqueBreeds.size;
  totalHeartsEl.textContent = totalHearts;
};

// -- Render all posts --
const renderPosts = (posts) => {
  postsFeed.innerHTML = "";

  // Store ordered IDs so post-detail Next button works from profile too
  sessionStorage.setItem("gridPostIds", JSON.stringify(posts.map((p) => p.id)));

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
  // TODO: remove fake data fallback when login is wired up
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
    // TODO: remove fake data fallback when login is wired up
    renderStats(fakePosts);
    renderPosts(fakePosts);
  }
};

loadUserPosts();
