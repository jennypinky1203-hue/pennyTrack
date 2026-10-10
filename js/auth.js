/* ========================================
   PENNYTRACK AUTHENTICATION
======================================== */

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");
const authMessage = document.getElementById("authMessage");


// ========================================
// DISPLAY FEEDBACK
// ========================================

function showAuthMessage(message, type = "error") {
    authMessage.textContent = message;
    authMessage.className = `auth-message visible ${type}`;
}

function clearAuthMessage() {
    authMessage.textContent = "";
    authMessage.className = "auth-message";
}


// ========================================
// SWITCH BETWEEN LOGIN AND SIGNUP
// ========================================

function switchAuthForm(formType) {
    const showLogin = formType === "login";

    loginForm.hidden = !showLogin;
    signupForm.hidden = showLogin;

    loginTab.classList.toggle("active", showLogin);
    signupTab.classList.toggle("active", !showLogin);

    loginTab.setAttribute("aria-selected", String(showLogin));
    signupTab.setAttribute("aria-selected", String(!showLogin));

    authTitle.textContent = showLogin
        ? "Welcome back"
        : "Create your account";

    authDescription.textContent = showLogin
        ? "Log in to continue managing your money."
        : "Start building better money habits today.";

    clearAuthMessage();
}

loginTab.addEventListener("click", () => {
    switchAuthForm("login");
});

signupTab.addEventListener("click", () => {
    switchAuthForm("signup");
});


// Switch using the links below each form

document.querySelectorAll("[data-switch]").forEach(button => {
    button.addEventListener("click", () => {
        switchAuthForm(button.dataset.switch);
    });
});


// ========================================
// SHOW / HIDE PASSWORD
// ========================================

document.querySelectorAll(".password-toggle").forEach(button => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.target);

        const isPassword = input.type === "password";

        input.type = isPassword ? "text" : "password";
        button.textContent = isPassword ? "Hide" : "Show";

        button.setAttribute(
            "aria-label",
            isPassword ? "Hide password" : "Show password"
        );
    });
});


// ========================================
// LOGIN FORM
// ========================================

loginForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
    }

    showAuthMessage(
        "The login form is ready, but account authentication has not been connected yet.",
        "success"
    );
});


// ========================================
// SIGNUP FORM
// ========================================

signupForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!signupForm.checkValidity()) {
        signupForm.reportValidity();
        return;
    }

    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        showAuthMessage("Your passwords do not match. Please try again.");
        document.getElementById("confirmPassword").focus();
        return;
    }

    showAuthMessage(
        "Your details passed the basic checks. Account creation still needs a backend or authentication service.",
        "success"
    );
});


// ========================================
// FORGOT PASSWORD PLACEHOLDER
// ========================================

document.getElementById("forgotPassword").addEventListener("click", event => {
    event.preventDefault();

    showAuthMessage(
        "Password recovery has not been connected yet. We'll add it when we set up authentication."
    );
});


// ========================================
// TERMS LINK PLACEHOLDER
// ========================================

document.getElementById("termsLink").addEventListener("click", event => {
    event.preventDefault();

    showAuthMessage(
        "The Terms of Service page has not been created yet."
    );
});

// ========================================
// OPEN THE CORRECT AUTH FORM FROM URL
// ========================================

const urlParams = new URLSearchParams(window.location.search);
const requestedForm = urlParams.get("form");

if (requestedForm === "signup") {
    signupTab.click();
} else {
    loginTab.click();
}