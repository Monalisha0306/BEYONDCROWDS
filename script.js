// =========================================================
// 🌍 BEYONDCROWDS Main JavaScript
// Author: Eminence Team | 2025
// =========================================================

// ======= ACTIVE NAVBAR LINK HIGHLIGHT =======
document.querySelectorAll(".icon-nav a").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

// ======= DARK MODE TOGGLE =======
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "🌙";
toggleBtn.className = "theme-toggle";
document.body.appendChild(toggleBtn);

toggleBtn.style.position = "fixed";
toggleBtn.style.bottom = "20px";
toggleBtn.style.right = "20px";
toggleBtn.style.border = "none";
toggleBtn.style.borderRadius = "50%";
toggleBtn.style.padding = "10px";
toggleBtn.style.background = "#f4a261";
toggleBtn.style.color = "#1b263b";
toggleBtn.style.cursor = "pointer";
toggleBtn.style.fontSize = "18px";
toggleBtn.style.zIndex = "999";

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  }
});

// Load previously saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}

// ======= DARK MODE STYLES =======
const darkModeStyle = document.createElement("style");
darkModeStyle.innerHTML = `
  .dark-mode {
    background: #0c0c0c !important;
    color: #eaeaea;
  }
  .dark-mode header, 
  .dark-mode nav, 
  .dark-mode footer,
  .dark-mode .booking-form,
  .dark-mode .card,
  .dark-mode .auth-container {
    background: rgba(30, 30, 30, 0.8) !important;
  }
  .dark-mode a { color: #f4a261 !important; }
`;
document.head.appendChild(darkModeStyle);

// ======= BOOKING FORM VALIDATION =======
const bookingForm = document.querySelector("#bookingForm") || document.querySelector(".booking-form");
if (bookingForm) {
  bookingForm.addEventListener("submit", e => {
    e.preventDefault();
    const inputs = bookingForm.querySelectorAll("input, textarea");
    let valid = true;
    inputs.forEach(input => {
      if (input.hasAttribute("required") && !input.value.trim()) {
        valid = false;
      }
    });
    if (!valid) {
      alert("⚠️ Please fill all required fields before submitting!");
    } else {
      alert("✅ Booking/Message sent successfully!");
      bookingForm.reset();
    }
  });
}

// ======= PAYMENT PAGE VALIDATION =======
const paymentForm = document.querySelector("#paymentForm");
if (paymentForm) {
  paymentForm.addEventListener("submit", e => {
    const cardNum = document.getElementById("cardNumber").value.trim();
    const cvv = document.getElementById("cvv").value.trim();
    if (cardNum.length !== 16 || cvv.length !== 3) {
      alert("❌ Invalid Card Details! Please check your inputs.");
      e.preventDefault();
    } else {
      alert("💳 Payment Successful! Thank you for booking with BEYONDCROWDS.");
    }
  });
}

// ======= PROFILE PAGE MANAGEMENT =======
if (document.getElementById("editBtn")) {
  const nameEl = document.getElementById("userName");
  const emailEl = document.getElementById("userEmail");
  const countryEl = document.getElementById("userCountry");
  const editForm = document.getElementById("editForm");
  const editName = document.getElementById("editName");
  const editEmail = document.getElementById("editEmail");
  const editCountry = document.getElementById("editCountry");

  // Load existing data
  window.addEventListener("load", () => {
    const user = JSON.parse(localStorage.getItem("userProfile"));
    if (user) {
      nameEl.textContent = user.name;
      emailEl.textContent = "Email: " + user.email;
      countryEl.textContent = "Country: " + user.country;
    }
  });

  // Edit button
  document.getElementById("editBtn").addEventListener("click", () => {
    editForm.style.display = "flex";
    const user = JSON.parse(localStorage.getItem("userProfile")) || {
      name: nameEl.textContent,
      email: emailEl.textContent.replace("Email: ", ""),
      country: countryEl.textContent.replace("Country: ", "")
    };
    editName.value = user.name;
    editEmail.value = user.email;
    editCountry.value = user.country;
  });

  // Cancel Edit
  document.getElementById("cancelBtn").addEventListener("click", () => {
    editForm.style.display = "none";
  });

  // Save Profile
  document.getElementById("saveBtn").addEventListener("click", () => {
    const updated = {
      name: editName.value,
      email: editEmail.value,
      country: editCountry.value
    };
    localStorage.setItem("userProfile", JSON.stringify(updated));
    nameEl.textContent = updated.name;
    emailEl.textContent = "Email: " + updated.email;
    countryEl.textContent = "Country: " + updated.country;
    editForm.style.display = "none";
    alert("✅ Profile updated successfully!");
  });
}

// ======= SMOOTH SCROLL FOR LINKS =======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ======= PAGE LOAD ANIMATION =======
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 1.2s ease-in-out";
  setTimeout(() => (document.body.style.opacity = "1"), 100);
});
