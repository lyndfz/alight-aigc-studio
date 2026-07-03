const header = document.querySelector("[data-header]");
const filterButtons = document.querySelectorAll(".filter-button");
const clipCards = document.querySelectorAll(".clip-card");

const updateHeader = () => {
  header.classList.toggle("is-solid", window.scrollY > 40);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    clipCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const canAutoplay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canAutoplay) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.45 }
  );

  clipCards.forEach((card) => observer.observe(card));
}
