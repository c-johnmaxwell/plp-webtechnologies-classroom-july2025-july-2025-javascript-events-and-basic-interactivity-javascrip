// Part 1: Event Handling Functions
let eventCount = 0;

function logEvent(message) {
  const output = document.getElementById("eventOutput");
  eventCount++;
  const timestamp = new Date().toLocaleTimeString();
  output.innerHTML += `<div>${eventCount}. [${timestamp}] ${message}</div>`;
  output.scrollTop = output.scrollHeight;
}

// Click event
document.getElementById("clickBtn").addEventListener("click", function () {
  logEvent("Button clicked! 🖱️");
  this.style.transform = "scale(0.95)";
  setTimeout(() => {
    this.style.transform = "scale(1)";
  }, 150);
});

// Hover events
const hoverBtn = document.getElementById("hoverBtn");
hoverBtn.addEventListener("mouseenter", function () {
  logEvent("Mouse entered hover button! 🐭");
  this.style.background = "linear-gradient(45deg, #ff6b6b, #ee5a24)";
});

hoverBtn.addEventListener("mouseleave", function () {
  logEvent("Mouse left hover button! 👋");
  this.style.background = "linear-gradient(45deg, #4ecdc4, #44a08d)";
});

// Double click event
document
  .getElementById("doubleClickBtn")
  .addEventListener("dblclick", function () {
    logEvent("Button double-clicked! ⚡");
    this.style.animation = "bounce 0.5s ease";
    setTimeout(() => {
      this.style.animation = "";
    }, 500);
  });

// Keyboard events
const keyInput = document.getElementById("keyInput");
keyInput.addEventListener("keydown", function (event) {
  logEvent(`Key pressed: "${event.key}" (keyCode: ${event.keyCode}) ⌨️`);
});

keyInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    logEvent("Enter key released - Form could be submitted! ✅");
  }
});

keyInput.addEventListener("input", function () {
  logEvent(`Input value changed to: "${this.value}" 📝`);
});

// Part 2: Interactive Elements Functions

// Image Gallery
function changeMainImage(src, caption) {
  const mainImage = document.getElementById("mainImage");
  const imageCaption = document.getElementById("imageCaption");

  mainImage.style.opacity = "0.5";
  setTimeout(() => {
    mainImage.src = src;
    imageCaption.textContent = caption;
    mainImage.style.opacity = "1";
  }, 200);

  logEvent(`Image changed to: ${caption} 🖼️`);
}

// Accordion
function toggleAccordion(header) {
  const content = header.nextElementSibling;
  const arrow = header.querySelector("span:last-child");
  const isActive = content.classList.contains("active");

  // Close all accordion items
  document.querySelectorAll(".accordion-content").forEach((item) => {
    item.classList.remove("active");
  });
  document
    .querySelectorAll(".accordion-header span:last-child")
    .forEach((arrow) => {
      arrow.textContent = "▼";
    });

  // Open clicked item if it wasn't active
  if (!isActive) {
    content.classList.add("active");
    arrow.textContent = "▲";
    logEvent(
      `Accordion opened: ${
        header.querySelector("span:first-child").textContent
      } 📋`
    );
  } else {
    logEvent(
      `Accordion closed: ${
        header.querySelector("span:first-child").textContent
      } 📋`
    );
  }
}

// Tabs
function openTab(event, tabId) {
  // Hide all tab contents
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Remove active class from all buttons
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("active");
  });

  // Show selected tab and mark button as active
  document.getElementById(tabId).classList.add("active");
  event.currentTarget.classList.add("active");

  logEvent(`Tab switched to: ${event.currentTarget.textContent} 📑`);
}

// Dynamic List
function addListItem() {
  const input = document.getElementById("newItemInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  const listContainer = document.getElementById("dynamicList");
  const listItem = document.createElement("div");
  listItem.className = "list-item";
  listItem.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn" onclick="removeListItem(this)">Delete</button>
    `;

  listContainer.appendChild(listItem);
  input.value = "";

  // Animate the new item
  listItem.style.opacity = "0";
  listItem.style.transform = "translateY(-20px)";
  setTimeout(() => {
    listItem.style.opacity = "1";
    listItem.style.transform = "translateY(0)";
    listItem.style.transition = "all 0.3s ease";
  }, 10);

  logEvent(`Task added: "${text}" ✅`);
}

function removeListItem(button) {
  const listItem = button.parentElement;
  const taskText = listItem.querySelector("span").textContent;

  listItem.style.opacity = "0";
  listItem.style.transform = "translateX(100px)";

  setTimeout(() => {
    listItem.remove();
  }, 300);

  logEvent(`Task removed: "${taskText}" ❌`);
}

// Allow Enter key to add items
document
  .getElementById("newItemInput")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addListItem();
    }
  });

// Part 3: Form Validation Functions
const validationRules = {
  fullName: {
    required: true,
    minLength: 2,
    pattern: /^[a-zA-Z\s]+$/,
    message:
      "Please enter your full name (at least 2 characters, letters only)",
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
  },
  phone: {
    required: true,
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: "Please enter a valid phone number",
  },
  age: {
    required: true,
    min: 13,
    max: 120,
    message: "Age must be between 13 and 120",
  },
  country: {
    required: true,
    message: "Please select a country",
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    message:
      "Password must be at least 8 characters with uppercase, lowercase, and number",
  },
  confirmPassword: {
    required: true,
    matchField: "password",
    message: "Passwords do not match",
  },
  website: {
    required: false,
    pattern:
      /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
    message: "Please enter a valid URL",
  },
};
// Utility function to show error or success for a form group
function setValidationState(input, isValid, message = "") {
  const formGroup = input.parentElement;
  const errorMsg = formGroup.querySelector(".error-message");
  const successMsg = formGroup.querySelector(".success-message");
  if (isValid) {
    formGroup.classList.remove("error");
    formGroup.classList.add("success");
    errorMsg.style.display = "none";
    successMsg.style.display = "block";
  } else {
    formGroup.classList.add("error");
    formGroup.classList.remove("success");
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
    successMsg.style.display = "none";
  }
}
// Validate individual input field
function validateField(input) {
  const rules = validationRules[input.name];
  if (!rules) return true; // No rules defined, consider valid
  const value = input.value.trim();
  // Required check
  if (rules.required && value === "") {
    setValidationState(input, false, "This field is required");
    return false;
  }
}
