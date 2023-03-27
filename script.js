const textData = document.getElementById("text-data");
const fileData = document.getElementById("file-data");
const dropZone = document.getElementById("drop-zone");
const qrOutput = document.getElementById("qr-output");
const downloadButton = document.getElementById("download");

textData.addEventListener("keypress", (e) => {
  try {
    if (e.key === "Enter") {
      qrOutput.innerHTML = "";

      const img = document.createElement("img");

      const qr = new QRious({
        element: img,
        level: "H",
        size: 270,
        value: e.target.value,
      });

      qrOutput.appendChild(img);

      e.target.value = "";

      downloadButton.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      downloadButton.href = img.src;
    }
  } catch (err) {
    console.log(err);
    alert(
      "An error has occured, please raise this as an issue on github, link down below"
    );
  }
});

fileData.addEventListener("change", (e) => {
  try {
    const validFile = getAndReviewFile(fileData);

    if (validFile) {
      const reader = new FileReader();
      reader.readAsDataURL(validFile);

      qrOutput.innerHTML = "";

      reader.onload = () => {
        const fileContent = reader.result.split(",")[1];
        const img = document.createElement("img");

        const qr = new QRious({
          element: img,
          level: "H",
          size: 310,
          value: fileContent,
        });

        qrOutput.appendChild(img);

        downloadButton.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        downloadButton.href = img.src;
      };
    }
  } catch (err) {
    console.log(err);
    alert(
      "An error has occured, please raise this as an issue on github, link down below"
    );
  }
});

dropZone.addEventListener(
  "dragover",
  (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  },
  false
);

dropZone.addEventListener(
  "drop",
  (e) => {
    e.stopPropagation();
    e.preventDefault();

    const validFile = getAndReviewFile(e.dataTransfer.files);

    if (validFile) {
      const reader = new FileReader();
      reader.readAsDataURL(validFile);

      qrOutput.innerHTML = "";

      reader.onload = () => {
        const fileContent = reader.result.split(",")[1];
        const img = document.createElement("img");

        const qr = new QRious({
          element: img,
          level: "H",
          size: 310,
          value: fileContent,
        });

        qrOutput.appendChild(img);

        downloadButton.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        downloadButton.href = img.src;
      };
    }
  },
  false
);

downloadButton.addEventListener("click", (e) => {
  const img = qrOutput.querySelector("img");

  if (img) {
    downloadButton.download = "qr-code.png";
    downloadButton.href = img.src;
    // downloadButton.click();
  } else {
    alert("Generate a code first");
  }
});

const getAndReviewFile = (files) => {
  try {
    let selectedFile;
    let fileSize;

    if (files.files) {
      selectedFile = files.files[0];
      fileSize = selectedFile.size;
    } else {
      selectedFile = files[0];
      fileSize = selectedFile.size;
    }

    if (fileSize <= 5_000) {
      return selectedFile;
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
    alert(
      "An error has occured, please raise this as an issue on github, link down below"
    );
  }
};
