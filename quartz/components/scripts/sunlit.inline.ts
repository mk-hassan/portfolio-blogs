document.addEventListener("nav", () => {
  const dappledLight = document.getElementById("dappled-light")
  if (!dappledLight) return

  // Set initial state without animation
  const currentTheme = document.documentElement.getAttribute("saved-theme")
  if (currentTheme === "dark") {
    dappledLight.classList.add("dark")
  } else {
    dappledLight.classList.remove("dark")
  }

  const handleThemeChange = (e: CustomEvent) => {
    dappledLight.classList.add("animation-ready")
    if (e.detail.theme === "dark") {
      dappledLight.classList.add("dark")
    } else {
      dappledLight.classList.remove("dark")
    }
  }

  document.addEventListener("themechange", handleThemeChange as EventListener)
  window.addCleanup(() =>
    document.removeEventListener("themechange", handleThemeChange as EventListener),
  )
})
