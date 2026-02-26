import { loadUserProfile } from "./user-profile-utils.js";
import { getMenu } from "./menu.js";
import { uploadToS3Async } from "./upload-to-s3-async.js";

// Get the user profile object
const userProfile = loadUserProfile();

// Add the menu/hamburger menu to the page
document.querySelector("#navbar").innerHTML = getMenu();

const createOptionTag = (string) => {
    const option = document.createElement("option");
    option.value = string;
    option.innerText = string;
    return option;
};

const getBreeds = async () => {
    const dropdown = document.querySelector("#breedList");
    const response = await fetch("../../data/breeds.json");
    if (!response.ok) {
        throw new Error("There is an issue loading the Breed data");
    }
    const data = await response.json();
    data.breeds.forEach((breed) => {
        dropdown.appendChild(createOptionTag(breed));
    });
};

getBreeds();

document.querySelector("#add-post").addEventListener("submit", (event) => {
    event.preventDefault();
    // If the user is not logged in then they should be uploading anything...
    if (!userProfile.loggedin) {
        alert("You must be logged in before you can upload an image");
        throw new Error("You must be logged in before you can upload an image");
    }

    const breed = document.querySelector("#breedList").selectedOptions[0].value;
    const dogName = document.querySelector("#dog_name").value;
    const location = document.querySelector("#location").value;
    const caption = document.querySelector("#caption").value;
    const photo = document.querySelector("#photo").files[0];
    const [yes] = document.querySelectorAll('input[name="is-public"');

    uploadToS3Async(photo).then((response) => {
        // Call our own API to store the actual post

        fetch("https://van-rossum-team-2-production.up.railway.app/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                dog_name: dogName,
                breed_name: breed,
                location,
                caption,
                photo_url: response.url,
                userId: userProfile.id,
                isPublic: yes.checked,
            }),
        });
    });
    alert("Post submitted");
});

document.querySelector("#photo").addEventListener("change", (event) => {
    const [file] = event.target.files;
    const { name } = file;
    document.querySelector(".file-name").textContent = `File: ${name}`;
});
