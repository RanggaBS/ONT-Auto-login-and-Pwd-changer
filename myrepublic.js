/* -------------------------------------------------------------------------- */
/* Utilities / Helper Functions                                               */
/* -------------------------------------------------------------------------- */

class Util {
  /**
   * https://www.sitepoint.com/delay-sleep-pause-wait/
   * @param {number} ms
   * @returns {Promise}
   */
  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
   * @param {string} selector
   * @returns {Promise<HTMLElement>}
   */
  static waitForElement(selector) {
    return new Promise(function (resolve) {
      let result = document.querySelector(selector);
      if (result) return resolve(result);

      let observer = new MutationObserver(function () {
        if (!result) return;
        observer.disconnect();
        resolve(result);
      });

      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Main Program Class                                                         */
/* -------------------------------------------------------------------------- */

class ONTPasswordChanger {
  static terminate() {
    alert("Program dihentikan.");
    throw new Error("Program dihentikan.");
  }

  /**
   * @returns {string}
   */
  static promptPassword() {
    const MIN_PASSWORD_LENGTH = 8;

    let newPassword = "";
    do {
      newPassword = prompt("Masukkan password yang baru:");

      if (!newPassword) this.terminate();

      if (newPassword.length < MIN_PASSWORD_LENGTH)
        alert(
          `Password harus terdiri dari minimal ${MIN_PASSWORD_LENGTH} karakter!`
        );
    } while (newPassword.length < MIN_PASSWORD_LENGTH);

    let str = `Password hotspot akan diganti dengan \"${newPassword}\".\nYakin ingin melanjutkan?`;
    let confirm = prompt(str, "ya");

    if (!confirm) this.terminate();

    return newPassword;
  }

  static async navigateToInputPassword() {
    // Click Network tab on top
    document.getElementById("first_menu_network").click();

    await Util.waitForElement("#thr_security");
    await Util.sleep(1500);

    // Click the "2.4G Advanced" menu on the left side
    document.getElementById("thr_security").click();

    await Util.waitForElement("div.content > iframe");
    await Util.sleep(2000);
  }

  /**
   * @param {string} newPassword
   */
  static async changePassword(newPassword) {
    let iframe = document.querySelector("div.content > iframe").contentWindow;

    // Change the current password with the new one
    iframe.document.getElementById("PreSharedKey").value = newPassword;

    // The "Apply" button on the bottom of password input field
    iframe.document.getElementById("wireless_apply").click();
  }
}

/* -------------------------------------------------------------------------- */
/* Entry Point / Main Function                                                */
/* -------------------------------------------------------------------------- */

async function main() {
  // Check URL
  if (!window.location.href.includes("html/main_inter.html")) {
    let str = "[ERROR]: Bukan halaman dashboard ONT!";
    alert(str);
    throw new Error(str);
  }

  let newPassword = ONTPasswordChanger.promptPassword();
  await ONTPasswordChanger.navigateToInputPassword();
  ONTPasswordChanger.changePassword(newPassword);
}

// Run
main();
