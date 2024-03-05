/* -------------------------------------------------------------------------- */
/*                                 Credentials                                */
/* -------------------------------------------------------------------------- */

const USERNAME = "admin";
const PASSWORD = "some-password-here..";

/* -------------------------------------------------------------------------- */
/*                                 Login Page                                 */
/* -------------------------------------------------------------------------- */

const LOGIN_URL = "http://xxx.xxx.xxx.xxx/html/login_inter.html";
if (window.location.href === LOGIN_URL) {
	// Fill both username & password input
	document.getElementById("user_name").value = USERNAME;
	document.getElementById("loginpp").value = PASSWORD;

	// Click the "Login" button
	document.getElementById("login_btn").click();
}
