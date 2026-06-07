export function setupProjects() {
  const loadMoreBtn = document.getElementById("load-more-projects");
  const hiddenProjects = document.querySelectorAll(".project-item.hidden");

  if (!loadMoreBtn || hiddenProjects.length === 0) return;

  loadMoreBtn.addEventListener("click", () => {
    hiddenProjects.forEach((project) => {
      project.classList.remove("hidden");
    });
    loadMoreBtn.parentElement?.remove();
  });
}