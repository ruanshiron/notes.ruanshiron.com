import TextareaMarkdown from "textarea-markdown"

document.addEventListener("turbo:load", function () {
  const textareas = document.getElementsByTagName("textarea")

  for (let i = 0; i < textareas.length; i++) {
    textareas[i].setAttribute(
      "style",
      "height:" + textareas[i].scrollHeight + "px;overflow-y:hidden;"
    )
    textareas[i].addEventListener(
      "input",
      function (params) {
        this.style.height = "auto"
        this.style.height = this.scrollHeight + "px"
      },
      false
    )
  }

  const token = document.querySelector("meta[name=\"csrf-token\"]").content;
  const textarea = document.querySelector('#note_body');
 
  new TextareaMarkdown(textarea, {
    endPoint: '/api/image',
    paramName: 'file',
    responseKey: 'url',
    csrfToken: token,
    placeholder: 'uploading %filename ...'
  })

  console.log(TextareaMarkdown);
})
