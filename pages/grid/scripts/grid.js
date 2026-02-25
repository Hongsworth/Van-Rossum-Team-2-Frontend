const API_URL = "https://van-rossum-team-2-production.up.railway.app/api/posts";

const gridContainer = document.querySelector(".grid__container");

const displayPosts = (json) => {
  //Remove all current posts displayed
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
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
    caption.innerHTML = post["caption"];
    image.setAttribute("src", post["photo_url"]);

    //Append to container
    cardContainer.appendChild(dogName);
    cardContainer.appendChild(image);
    cardContainer.appendChild(breedName);
    cardContainer.appendChild(location);
    cardContainer.appendChild(caption);
  });
};

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

fetchPosts()
  .then(displayPosts)
  .catch((error) => console.error("Error:", error));
