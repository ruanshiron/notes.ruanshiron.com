import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.csrfToken = document.querySelector('meta[name="csrf-token"]').content
    this.uploadParam = "file"
    this.endPoint = "/images"
    this.responseKey = "url"
    this.placeholder = "uploading %filename ..."

    this.element.setAttribute(
      "style",
      "height:" + this.element.scrollHeight + "px;overflow-y:hidden;"
    )

    this.element.addEventListener(
      "input",
      function () {
        this.style.height = "auto"
        this.style.height = this.scrollHeight + "px"
      },
      false
    )

    this.element.addEventListener("paste", (e) => this.paste(e))
    this.element.addEventListener("drop", (e) => this.drop(e))
  }

  paste(event) {
    const files = event.clipboardData.files
    if (files.length > 0) {
      event.preventDefault()
      this.uploadAll(event.clipboardData.files)
    }
  }

  drop(event) {
    event.preventDefault()
    this.uploadAll(event.dataTransfer.files)
  }

  uploadAll(files) {
    Array.from(files, (f) => this.upload(f))
  }

  upload(file) {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (event) => {
      const text =
        "![" + this.placeholder.replace(/\%filename/, file.name) + "]()"

      const beforeRange = this.element.selectionStart
      const beforeText = this.element.value.substring(0, beforeRange)
      const afterText = this.element.value.substring(
        beforeRange,
        this.element.value.length
      )
      this.element.value = `${beforeText}\n${text}\n${afterText}`

      let params = new FormData()
      params.append(this.uploadParam, file)

      let headers = { "X-Requested-With": "XMLHttpRequest" }
      if (this.csrfToken) headers["X-CSRF-Token"] = this.csrfToken

      fetch(this.endPoint, {
        method: "POST",
        headers: headers,
        credentials: "same-origin",
        body: params,
      })
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          const url = json[this.responseKey]
          this.element.value = this.element.value.replace(
            text,
            `![${file.name}](${url})\n`
          )
        })
        .catch((error) => {
          this.element.value = this.element.value.replace(text, "")
          console.warn("parsing failed", error)
        })
    }
  }
}
