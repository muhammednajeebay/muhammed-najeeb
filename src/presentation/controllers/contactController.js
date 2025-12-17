export const initContactForm = () => {
  const form = document.querySelector(".contact-form");
  const snackbar = document.getElementById("snackbar");
  if (!form || !snackbar) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          showSnackbar(snackbar, "Message sent successfully!");
          form.reset();
        } else {
          showSnackbar(snackbar, "Something went wrong. Please try again.");
        }
      })
      .catch(() => {
        showSnackbar(snackbar, "Something went wrong. Please try again.");
      });
  });
};

const showSnackbar = (el, message) => {
  el.textContent = message;
  el.classList.add("show");
  setTimeout(() => {
    el.classList.remove("show");
  }, 3000);
};
