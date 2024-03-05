/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */

/**
 * https://www.sitepoint.com/delay-sleep-pause-wait/
 * @param {number} ms
 * @returns {Promise}
 */
function sleep(ms) {
	return new Promise(function (resolve) {
		setTimeout(resolve, ms);
	});
}

/**
 * https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
 * @param {string} selector
 * @returns {Promise<HTMLElement>}
 */
function waitForElement(selector) {
	return new Promise(function (resolve) {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver(function (mutations) {
			if (document.querySelector(selector)) {
				observer.disconnect();
				resolve(document.querySelector(selector));
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}

/* -------------------------------------------------------------------------- */
/*                                   Prompt                                   */
/* -------------------------------------------------------------------------- */

const MIN_PASSWORD_LENGTH = 8;

let NEW_PASSWORD = "";
do {
	NEW_PASSWORD = prompt("Masukkan password yang baru:");
	if (!NEW_PASSWORD) {
		alert("Program dihentikan.");
		throw new Error("Program dihentikan.");
	}
	if (NEW_PASSWORD.length < MIN_PASSWORD_LENGTH) {
		alert(
			`Password harus terdiri dari minimal ${MIN_PASSWORD_LENGTH} karakter!`
		);
	}
} while (NEW_PASSWORD.length < MIN_PASSWORD_LENGTH);

const CONFIRM = prompt(
	`Password hotspot akan diganti dengan \"${NEW_PASSWORD}\".\nYakin ingin melanjutkan?`,
	"ya"
);
if (!CONFIRM) {
	alert("Program dihentikan.");
	throw new Error("Program dihentikan.");
}

/* -------------------------------------------------------------------------- */
/*                                  Dashboard                                 */
/* -------------------------------------------------------------------------- */

async function changePassword() {
	const DASHBOARD_URL = "http://xxx.xxx.xxx.xxx/html/main_inter.html";
	if (window.location.href === DASHBOARD_URL) {
		// Click Network tab on top
		console.log("click network tab");
		document.getElementById("first_menu_network").click();

		await waitForElement(".hide_or_not");
		await sleep(1500);

		// Click the "2.4G Advanced" menu on the left side
		console.log("klik 2.4G Advanced");
		document.querySelectorAll(".hide_or_not").forEach(function (element) {
			if (element.innerHTML.trim() == "2.4G Advanced") {
				element.click();
			}
		});

		const _ = await waitForElement("iframe");
		await sleep(2000);

		// Change the current password with the new one
		console.log("fill password input");
		document
			.querySelector("iframe")
			.contentWindow.document.getElementById("PreSharedKey").value =
			NEW_PASSWORD;

		console.log("click Apply button");
		document
			.querySelector("iframe")
			.contentWindow.document.querySelector(".input_button")
			.click();

		// show popup box on mobile device
		if (window.innerWidth < 512) {
			alert(
				'Password berhasil diganti!\n\nSambungkan kembali WiFi-nya lalu klik "Logout" di pojok kanan atas.'
			);
		}

		await sleep(3000);

		console.log("click logout");
		document.getElementById("logout").click();
	}
}
changePassword();
