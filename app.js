const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

const scrollCue = document.getElementById("scrollCue");

window.addEventListener(
  "scroll",
  () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    if (scrollCue) {
      scrollCue.classList.toggle("is-hidden", window.scrollY > 90);
    }
  },
  { passive: true }
);

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
    const moreFleet = document.getElementById("moreFleet");
    if (saleEmpty) {
      saleEmpty.hidden = !(type === "sale" && visible === 0);
    }
    if (moreFleet) {
      moreFleet.hidden = type === "sale";
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

async function sendToInbox(formEl) {
  const data = new FormData(formEl);
  data.append("_captcha", "false");
  const res = await fetch(BOOKING_EMAIL_ENDPOINT, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("send failed");
}

const form = document.getElementById("bookingForm");
const msg = document.getElementById("formMsg");
const err = document.getElementById("formErr");
const submitBtn = document.getElementById("bookingSubmit");

const fleetForm = document.getElementById("fleetRequestForm");
const fleetOk = document.getElementById("fleetRequestOk");
const fleetFail = document.getElementById("fleetRequestFail");
const fleetSubmit = document.getElementById("fleetRequestSubmit");

if (fleetForm) {
  fleetForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    fleetOk.hidden = true;
    fleetFail.hidden = true;
    const original = fleetSubmit.textContent;
    fleetSubmit.disabled = true;
    fleetSubmit.textContent = "Sending…";
    try {
      await sendToInbox(fleetForm);
      fleetOk.hidden = false;
      fleetForm.reset();
    } catch {
      fleetFail.hidden = false;
    } finally {
      fleetSubmit.disabled = false;
      fleetSubmit.textContent = original;
    }
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.hidden = true;
  err.hidden = true;

  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  try {
    await sendToInbox(form);
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
