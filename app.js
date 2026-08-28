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

document.getElementById("year").textContent = new Date().getFullYear();

const bookingDate = document.getElementById("bookingDate");
function setDefaultDate() {
  if (!bookingDate) return;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  bookingDate.value = `${yyyy}-${mm}-${dd}`;
}
setDefaultDate();

const BOOKING_EMAIL_ENDPOINT = "https://formsubmit.co/ajax/primewheelsafrica@gmail.com";
const form = document.getElementById("bookingForm");
const msg = document.getElementById("formMsg");
const err = document.getElementById("formErr");
const submitBtn = document.getElementById("bookingSubmit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.hidden = true;
  err.hidden = true;

  const data = new FormData(form);
  data.append("_captcha", "false");

  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  try {
    const res = await fetch(BOOKING_EMAIL_ENDPOINT, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error("send failed");

    msg.hidden = false;
    form.reset();
    setDefaultDate();
  } catch (error) {
    err.hidden = false;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});
