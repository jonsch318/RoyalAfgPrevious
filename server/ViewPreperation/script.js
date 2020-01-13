let state = true;

changeState();


let verifyUserBtn = document.getElementById("verify-user-btn");
let stepBackBtn = document.getElementById("step-back-btn");

stepBackBtn.onmousedown = () => {
	changeState();
}

verifyUserBtn.onmousedown = () => {

  	console.log("fired");
  
	let welcomeHeader = document.getElementById("welcome-header");
	let usernameInput = document.getElementById("Username");
	welcomeHeader.innerHTML = "Welcome " + usernameInput.value;
  
	changeState();

};


stepBackBtn = document.getElementById("step-back-btn");


function changeState() 
{
  
	state = !state;
  
	let usernameContainer = document.getElementById("username-container");
  
	let passwordContainer = document.getElementById("password-container");
  
	if (state) 
	{
		usernameContainer.style.display = "none";
		passwordContainer.style.display = "block";
	} 
	else 
	{
		usernameContainer.style.display = "block";
		passwordContainer.style.display = "none";
	}

}
