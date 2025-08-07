const options = [
  "Order Pizza 🍕",
  "Watch a Comedy 🎭",
  "Take a Walk 🚶‍♂",
  "Call a Friend 📞",
  "Read a Book 📚",
  "Drink Water 💧",
  "Dance for 1 Minute 💃"
];

const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");

spinBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * options.length);
  const decision = options[randomIndex];
  resultDiv.textContent = 🎉 ${decision};
});
