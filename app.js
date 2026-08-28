const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

toggle.addEventListener("click", () => {
  links.classList.toggle("open");
});

links.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => links.classList.remove("open"));
});

document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const type = btn.dataset.filter;
    let visible = 0;
    document.querySelectorAll(".car-card").forEach((card) => {
      const show = type === "all" || card.dataset.type === type;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });
    const saleEmpty = document.getElementById("saleEmpty");
    if (saleEmpty) {
      saleEmpty.hidden = !(type === "sale" && visible === 0);
    }
  });
});

const form = document.getElementById("bookingForm");
const msg = document.getElementById("formMsg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  msg.hidden = false;
  form.reset();
  if (bookingDate) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    bookingDate.value = `${yyyy}-${mm}-${dd}`;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

const bookingDate = document.getElementById("bookingDate");
if (bookingDate) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  bookingDate.value = `${yyyy}-${mm}-${dd}`;
}
