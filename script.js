const form = document.querySelector("#profileForm");
const nameInput = document.querySelector("#studentName");
const ageInput = document.querySelector("#studentAge");
const statusInput = document.querySelector("#studentStatus");
const outputName = document.querySelector("#outputName");
const outputAge = document.querySelector("#outputAge");
const outputStatus = document.querySelector("#outputStatus");
const profileCard = document.querySelector("#profileCard");
const interestTags = document.querySelector("#interestTags");
const motionToggle = document.querySelector("#motionToggle");
const logList = document.querySelector("#logList");

function timestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function addLog(message) {
  const item = document.createElement("li");
  const time = document.createElement("time");
  const text = document.createElement("span");
  time.textContent = timestamp();
  text.textContent = message;
  item.append(time, text);
  logList.prepend(item);

  while (logList.children.length > 5) {
    logList.lastElementChild.remove();
  }
}

function updateName() {
  const name = nameInput.value.trim();
  outputName.textContent = name || "YOUR NAME";
}

function updateAge() {
  const age = Math.min(19, Math.max(13, Number(ageInput.value) || 16));
  ageInput.value = age;
  outputAge.textContent = age;
}

function updateStatus() {
  outputStatus.textContent = statusInput.value.toUpperCase();
}

function updateTheme(value) {
  profileCard.classList.remove("theme-blue", "theme-red", "theme-green");
  profileCard.classList.add(`theme-${value}`);
}

function updateInterests() {
  const selected = [...form.querySelectorAll('input[name="interest"]:checked')];
  interestTags.replaceChildren();

  if (selected.length === 0) {
    const emptyTag = document.createElement("span");
    emptyTag.textContent = "#STILL_EXPLORING";
    interestTags.append(emptyTag);
    return;
  }

  selected.forEach((input) => {
    const tag = document.createElement("span");
    tag.textContent = `#${input.value.toUpperCase()}`;
    interestTags.append(tag);
  });
}

nameInput.addEventListener("input", () => {
  updateName();
  addLog(`Input event: name changed to "${nameInput.value || "empty"}"`);
});

ageInput.addEventListener("change", () => {
  updateAge();
  addLog(`Change event: age set to ${ageInput.value}`);
});

statusInput.addEventListener("change", () => {
  updateStatus();
  addLog(`Change event: status set to ${statusInput.value}`);
});

document.querySelector("#decreaseAge").addEventListener("click", () => {
  ageInput.value = Number(ageInput.value) - 1;
  updateAge();
  addLog(`Click event: age decreased to ${ageInput.value}`);
});

document.querySelector("#increaseAge").addEventListener("click", () => {
  ageInput.value = Number(ageInput.value) + 1;
  updateAge();
  addLog(`Click event: age increased to ${ageInput.value}`);
});

form.querySelectorAll('input[name="theme"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    updateTheme(radio.value);
    addLog(`Change event: ${radio.value} theme selected`);
  });
});

form.querySelectorAll('input[name="interest"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    updateInterests();
    addLog(`${checkbox.checked ? "Added" : "Removed"} interest: ${checkbox.value}`);
  });
});

motionToggle.addEventListener("change", () => {
  profileCard.classList.toggle("motion", motionToggle.checked);
  addLog(`Motion ${motionToggle.checked ? "enabled" : "disabled"}`);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateName();
  updateAge();
  updateStatus();
  updateInterests();
  addLog("Submit event: output generated!");
  profileCard.animate(
    [{ transform: "scale(1)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }],
    { duration: 350 }
  );
});

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    updateName();
    updateAge();
    updateStatus();
    updateTheme("blue");
    updateInterests();
    profileCard.classList.remove("motion");
    addLog("Reset event: all inputs restored");
  });
});

document.querySelector("#clearLog").addEventListener("click", () => {
  logList.replaceChildren();
  addLog("Event log cleared");
});

let heroClicks = 0;
document.querySelector("#heroButton").addEventListener("click", () => {
  heroClicks += 1;
  document.querySelector("#heroClickCount").textContent =
    `${heroClicks} interaction${heroClicks === 1 ? "" : "s"}`;
});

document.querySelector("#answerList").addEventListener("click", (event) => {
  const answer = event.target.closest("button");
  if (!answer) return;

  document.querySelectorAll("#answerList button").forEach((button) => {
    button.classList.remove("correct", "wrong");
  });

  const isCorrect = answer.dataset.correct === "true";
  answer.classList.add(isCorrect ? "correct" : "wrong");
  document.querySelector("#answerFeedback").textContent = isCorrect
    ? "Correct! The app processing the selection and applying new styles is the process."
    : "Not quite. That is the input or output. Look for what the application does in between.";
});
