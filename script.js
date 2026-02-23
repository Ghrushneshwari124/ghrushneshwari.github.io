// 🌸 Maungiri Paithani Website Script

// ======= Navigation Highlight (Active Page) =======
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// ======= Smooth Scroll for internal links =======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ======= Contact Form Submission =======
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showResponse("❗ Please fill all fields.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      if (data.success) {
        showResponse("✅ Message sent successfully!", "success");
        form.reset();
      } else {
        showResponse("⚠️ Something went wrong. Try again!", "error");
      }
    } catch (error) {
      showResponse("❌ Server not reachable. Please try later.", "error");
      console.error(error);
    }
  });
}

// ======= Helper Function: Show Response Message =======
function showResponse(msg, type) {
  const response = document.getElementById("responseMsg");
  response.textContent = msg;
  response.style.color = type === "success" ? "green" : "red";
}
