import { tinyMCEImagePicker } from "../../../../traec-react/src/utils/tinyMCEImagePicker";

export const titleDescriptionFields = {
  title: { value: "", class: "col", endRow: true },
  text: {
    value: "",
    inputType: "tinymce",
    rows: "5",
    class: "col mb-1 mt-1",
    label: "",
    placeholder: "Body",
    config: {
      menubar: false,
      statusbar: true,
      resize: true,
      content_css: "/static/bootstrap/css/bootstrap.css",
      plugins: "autolink link image lists print preview table",
      block_formats: "Paragraph=p;Header 1=h3;Header 2=h4;Header 3=h5;",
      toolbar:
        "bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | sup sub | table | formatselect | removeformat | image",
      file_picker_types: "image",
      file_picker_callback: (callBack, value, meta) => tinyMCEImagePicker(callBack, value, meta)
    },
    endRow: true
  }
};
