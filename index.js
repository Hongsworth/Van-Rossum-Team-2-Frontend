async function imageToBlob() {
    const response = await fetch("./img/Dog1.jpg");
    const blob = await response.blob();
    return blob;
}

imageToBlob().then((blob) => {
    console.log(blob);
});
