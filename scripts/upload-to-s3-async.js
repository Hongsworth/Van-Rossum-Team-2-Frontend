export const uploadToS3Async = async (file) => {
    if (!file) {
        throw new Error("No file sent");
    }

    const formData = new FormData();
    formData.append("file", file); // key must match @RequestParam name

    const response = await fetch(
        "https://van-rossum-team-2-production.up.railway.app/api/S3/upload",
        {
            method: "POST",
            body: formData,
        },
    );

    if (!response.ok) {
        throw new Error("Upload failed");
    }

    return await response.json(); // or response.text() depending on your API
};
