export const uploadToS3Async = async (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject("No file sent");
        }

        resolve({ photo_url: "https://example.com/photo.jpg" });
    });
};