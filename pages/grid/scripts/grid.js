const API_URL = "https://van-rossum-team-2-production.up.railway.app/api/posts";

const gridContainer = document.querySelector(".grid__container");

// Fetches posts from the API. Pass a userId to get user-specific posts.
const fetchPosts = async (userId = null) => {
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

  // Sort by most recent first
  const sorted = [...json].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // Store the ordered list of public post IDs so post-detail can use them for Next navigation
  const publicIds = sorted.filter(p => p["is_public"]).map(p => p["id"]);
  sessionStorage.setItem("gridPostIds", JSON.stringify(publicIds));

  //Generate HTML for all json objects that are returned
  sorted.forEach((post) => {
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
    const dogName = document.createElement("p");
    dogName.setAttribute("class", "grid__post--name");

    const breedName = document.createElement("p");
    breedName.setAttribute("class", "grid__post--breed");

    const location = document.createElement("p");
    location.setAttribute("class", "grid__post--location");

    const caption = document.createElement("p");
    caption.setAttribute("class", "grid__post--caption");

    const image = document.createElement("img");
    image.setAttribute("class", "grid__post--image");

    //Adding information to elements
    dogName.innerHTML = post["dog_name"];
    breedName.innerHTML = post["breed_name"];
    location.innerHTML = post["location"];
    const captionText = post["caption"] || "";
    caption.innerHTML = captionText.length > 50 ? captionText.slice(0, 50) + "..." : captionText;
    image.setAttribute("src", post["photo_url"]);

    //Append to container
    cardContainer.appendChild(dogName);
    cardContainer.appendChild(image);
    cardContainer.appendChild(breedName);
    cardContainer.appendChild(location);
    cardContainer.appendChild(caption);
  });
};

fetchPosts()
  .then(displayPosts)
  .catch((error) => console.error("Error:", error));
