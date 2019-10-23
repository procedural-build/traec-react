export const nameFormFields = {
  name: { label: "", value: "", class: "col", endRow: true }
};

export const titleDescriptionFields = {
  title: { value: "", class: "col", endRow: true },
  description: {
    value: "",
    inputType: "tinymce",
    rows: "3",
    class: "col mb-1 mt-1",
    label: "",
    placeholder: "Body",
    config: {
      menubar: false,
      statusbar: false,
      content_css: "/static/bootstrap/css/bootstrap.css",
      plugins: "autolink link image lists print preview",
      block_formats: "Paragraph=p;Header 3=h3;Header 4=h4;Header 5=h5;",
      toolbar:
        "bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | sup sub | formatselect | removeformat"
    },
    endRow: true
  }
};
