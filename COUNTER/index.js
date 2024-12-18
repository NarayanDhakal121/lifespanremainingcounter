document.getElementById("startCounter").addEventListener("click", () => {
  const dobInput = document.getElementById("dob").value;
  const lifespanInput =
    parseInt(document.getElementById("lifespan").value) || 80;

  if (!dobInput) {
    alert("Please enter your date of birth!");
    return;
  }

  const dob = new Date(dobInput);
  const lifespan = lifespanInput * 365 * 24 * 60 * 60 * 1000; // lifespan in milliseconds
  const endTime = dob.getTime() + lifespan;

  setInterval(() => updateLifespanCounter(dob, endTime), 1000);
});

function updateLifespanCounter(dob, endTime) {
  const now = new Date();
  const timeLived = now - dob;

  // Time lived calculations
  const years = Math.floor(timeLived / (365 * 24 * 60 * 60 * 1000));
  const days = Math.floor(
    (timeLived % (365 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
  );
  const hours = Math.floor(
    (timeLived % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((timeLived % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((timeLived % (60 * 1000)) / 1000);

  document.getElementById(
    "time-lived"
  ).textContent = `${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

  // Time left calculations
  const timeLeft = Math.max(0, endTime - now.getTime());
  const remainingYears = Math.floor(timeLeft / (365 * 24 * 60 * 60 * 1000));
  const remainingDays = Math.floor(
    (timeLeft % (365 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
  );
  const remainingHours = Math.floor(
    (timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const remainingMinutes = Math.floor(
    (timeLeft % (60 * 60 * 1000)) / (60 * 1000)
  );
  const remainingSeconds = Math.floor((timeLeft % (60 * 1000)) / 1000);

  document.getElementById(
    "time-left"
  ).textContent = `${remainingYears} years, ${remainingDays} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;

  // Progress bar
  const progress = Math.min(100, (timeLived / (endTime - dob.getTime())) * 100);
  document.getElementById("progress-bar").style.width = `${progress}%`;

  if (timeLeft <= 0) {
    document.getElementById("time-left").textContent = "Time is up!";
    clearInterval(updateLifespanCounter);
  }
}
