const API_URL = "https://van-rossum-team-2-production.up.railway.app/api";

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

export const getAllPosts = (userId) => {
  let url = API_URL + "/posts";
  if (userId != null) {
    url += "/userPosts?userId=" + userId;
  }
  get(url);
};

export const searchPosts = (search) => {
  let url = API_URL + "/posts/search?search=" + search;
  get(url);
};

const get = (url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Display data in an HTML element
      displayPosts(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

getAllPosts();
const searchBar = document.querySelector(".search");
const searchQuery = document.querySelector(".search__input");
searchBar.addEventListener("submit", (e) => {
  e.preventDefault();
  if (searchQuery.value == "") {
    getAllPosts();
  } else {
    searchPosts(searchQuery.value);
  }
});
