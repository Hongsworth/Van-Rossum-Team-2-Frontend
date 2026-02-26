export const uploadToS3Async = async (file) => {
    // console.log("Uploading to S3...");
    // console.log("Photo file passed:", (file !== null ? "True" : "False"));
    // return "https://example.com/photo.jpg";
    new Promise((resolve, reject) => {
        console.log(file !== null ? "We've got a file" : "Ain't no file present");
        if (!file) {
            reject("No file sent");
        }

        resolve({ photo_url: "https://example.com/photo.jpg" });
    });
};