let state = true;
changeState();

let verifyUserBtn = document.getElementById("verify-user-btn");

verifyUserBtn.onmousedown = () => {
  console.log("fired");
  changeState();
};

function changeState() {
  state = !state;
  let usernameContainer = document.getElementById("username-container");
  let passwordContainer = document.getElementById("password-container");
  if (state) {
    usernameContainer.style.display = "none";
    passwordContainer.style.display = "block";
  } else {
    usernameContainer.style.display = "block";
    passwordContainer.style.display = "none";
  }
}
