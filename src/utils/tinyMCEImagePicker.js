import Traec from "traec";

export const tinyMCEImagePicker = (callBack, value, meta) => {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");

  input.onchange = () => {
    let file = input.files[0];
    let fetch = new Traec.Fetch("store_object", "post");
    let formData = new FormData();
    formData.append("file", file);
    fetch.updateFetchParams({ body: formData });

    fetch
      .rawFetch()
      .then(response => handleImageResponse(response))
      .then(successfulResponse => {
        callBack(successfulResponse.url, { title: file.name });
      })
      .catch(error => {
        console.error(error);
      });
  };

  input.click();
};

const handleImageResponse = response => {
  if (response.ok) {
    return response.json();
  }
};
