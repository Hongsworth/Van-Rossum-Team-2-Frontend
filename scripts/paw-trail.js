// Paw print trail that follows the mouse cursor
let lastPawTime = 0;
let pawSide = 1;

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastPawTime < 120) return;
  lastPawTime = now;

  const paw = document.createElement("span");
  paw.classList.add("paw-trail");
  paw.textContent = "🐾";

  // Alternate left/right offset for a walking effect
  const offset = pawSide * 10;
  pawSide *= -1;

  paw.style.left = `${e.clientX + offset}px`;
  paw.style.top = `${e.clientY + offset}px`;

  // Slight random rotation for a natural feel
  const angle = Math.random() * 40 - 20;
  paw.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

  document.body.appendChild(paw);
  paw.addEventListener("animationend", () => paw.remove());
});
