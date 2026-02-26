// Post Detail page — reads ?id= from URL, fetches post, renders it, wires Next.
import { toggleHeart } from "./utils.js";

const API_URL = "https://van-rossum-team-2-production.up.railway.app/api/posts";
const fetchPosts = async (userId = null) => {
  let url = API_URL;
  if (userId != null) url += "/userPosts?userId=" + userId;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

// -- DOM refs --
const postImage = document.getElementById("postImage");
const postBreed = document.getElementById("postBreed");
const postCaption = document.getElementById("postCaption");
const postLocation = document.getElementById("postLocation");
const postDatetime = document.getElementById("postDatetime");
const postHearts = document.getElementById("postHearts");
const heartBtn = document.getElementById("heartBtn");
const nextBtn = document.getElementById("nextBtn");

// -- Normalise API (snake_case) and fake data (camelCase) into one shape --
const normalisePost = (post) => ({
  id: post.id,
  imageUrl: post.photo_url || post.imageUrl || "",
  breed: post.breed_name || post.breed || "",
  dogName: post.dog_name || "",
  caption: post.caption || post.description || "",
  location: post.location || "Unknown location",
  createdAt: post.created_at || post.createdAt || null,
  hearts: post.hearts ?? 0,
});

// -- Render post into the page --
const renderPost = (raw) => {
  const post = normalisePost(raw);

  postImage.src = post.imageUrl;
  postImage.alt = post.breed ? `${post.breed} dog` : "Dog photo";

  postBreed.textContent = post.dogName
    ? `${post.dogName} — ${post.breed}`
    : post.breed;

  postCaption.textContent = post.caption;
  postLocation.textContent = post.location;
  postHearts.textContent = post.hearts;

  if (post.createdAt) {
    const date = new Date(post.createdAt);
    postDatetime.textContent =
      date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) +
      " · " +
      date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }
};

// -- Heart button toggle --
heartBtn.addEventListener("click", () => toggleHeart(heartBtn));

// -- Load all posts, render current, wire Next button --
const loadPost = async (id) => {
  // Try sessionStorage first — works for private/profile posts without a second fetch
  const stored = sessionStorage.getItem("currentPost");
  const storedPost = stored ? JSON.parse(stored) : null;
  const fromStorage = storedPost && String(storedPost.id) === String(id) ? storedPost : null;

  // Fetch all posts once — used for Next button and as fallback for rendering
  let allPosts = [];
  try {
    allPosts = await fetchPosts();
  } catch (_) { /* Next button stays disabled; may still render from storage */ }

  const current = fromStorage || allPosts.find((p) => String(p.id) === String(id));

  if (current) {
    renderPost(current);
  } else {
    postCaption.textContent = "Post not found.";
    return;
  }

  // Use the grid's ordered post IDs for Next navigation.
  // Fall back to API order if the user navigated directly (no sessionStorage).
  const gridPostIds = JSON.parse(sessionStorage.getItem("gridPostIds") || "[]");
  let nextId;

  if (gridPostIds.length > 0) {
    const idxInGrid = gridPostIds.findIndex((sid) => String(sid) === String(id));
    nextId = gridPostIds[idxInGrid + 1];
  } else {
    const idx = allPosts.findIndex((p) => String(p.id) === String(id));
    nextId = allPosts[idx + 1]?.id;
  }

  if (nextId != null) {
    nextBtn.removeAttribute("disabled");
    nextBtn.addEventListener("click", () => {
      window.location.href = `/pages/post-detail/post-detail.html?id=${nextId}`;
    });
  }
};

// -- Read ?id= from URL and kick off --
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  loadPost(id);
} else {
  postCaption.textContent = "No post selected.";
}
