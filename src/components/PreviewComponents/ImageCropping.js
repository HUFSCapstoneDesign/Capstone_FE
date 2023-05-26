function ImageCropping(dataURL) {
  const image = new Image();
  image.src = dataURL;

  const width = image.naturalWidth;
  const height = image.naturalHeight;
  let size = 0;
  if (width > height) {
    size = height;
  } else {
    size = width;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = size;
  context.drawImage(image, 0, 0, size, size, 0, 0, size, size);

  const croppedDataURL = canvas.toDataURL("image/jpeg");

  //dataURL을 s3에 저장하기 위한 파일생성
  function dataURLtoFile(dataURL, fileName) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  }

  const fileName = "main.jpg";
  const file = dataURLtoFile(croppedDataURL, fileName);
  //body: file로? (작동하는지 확인되지 않음)

  return file;
}

export default ImageCropping;
