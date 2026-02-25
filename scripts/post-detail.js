// Post Detail page — reads ?id= from URL, fetches post, renders it, wires Next.
import { fakePosts } from "../data/fake-user.js";
import { fetchPosts, toggleHeart } from "./utils.js";

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
      date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) +
      " · " +
      date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }
};

// -- Heart button toggle --
heartBtn.addEventListener("click", () => toggleHeart(heartBtn));

// -- Load all posts, render current, wire Next button --
const loadPost = async (id) => {
  let allPosts;

  try {
    allPosts = await fetchPosts();
  } catch (err) {
    console.warn("Could not load posts from API, using fake data:", err.message);
    allPosts = fakePosts;
  }

  const currentIndex = allPosts.findIndex((p) => String(p.id) === String(id));
  const current = allPosts[currentIndex];

  if (current) {
    renderPost(current);
  } else {
    postCaption.textContent = "Post not found.";
    return;
  }

  const nextPost = allPosts[currentIndex + 1];
  if (nextPost) {
    nextBtn.removeAttribute("disabled");
    nextBtn.addEventListener("click", () => {
      window.location.href = `/pages/post-detail/post-detail.html?id=${nextPost.id}`;
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
