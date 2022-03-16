import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const isDark = localStorage.getItem('dark')
    if (isDark) document.body.classList.add("dark")
    this.element.textContent = isDark ? "💡" : "🌒"
    this.element.addEventListener("click", () => {
      document.body.classList.toggle("dark")
      const isDark = document.body.classList.contains("dark") 
      this.element.textContent = isDark ? "💡" : "🌒"
      if (isDark) {
        localStorage.setItem('dark', true)
      } else {
        localStorage.removeItem('dark')
      }
    })
  }
}
