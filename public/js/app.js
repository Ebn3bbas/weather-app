const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const one = document.querySelector("#one");
const two = document.querySelector("#two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = input.value;

  one.textContent = "Searching...";
  two.textContent = "";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        one.textContent = "Error!";
        two.textContent = data.error;
      } else {
        one.textContent = data.location;
        two.textContent = data.forcast;
      }
    });
  });
});
