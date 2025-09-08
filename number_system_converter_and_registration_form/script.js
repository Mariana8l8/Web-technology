document.addEventListener("DOMContentLoaded", function () {
    const buttonCalc = document.querySelector(".button-calc");
    const buttonClear = document.querySelector(".button-clear");
    const inputField = document.getElementById("input-text");

    function convertNumber() {
        const fromBaseSystem = parseInt(
            document.querySelector(".from-number-system").value,
            10
        );
        const toBaseSystem = parseInt(
            document.querySelector(".to-number-system").value,
            10
        );
        const inputText = inputField.value.trim();
        const resultField = document.getElementById("input-result");

        if (inputText === "") {
            resultField.value = "Enter a number!";
            return;
        }

        try {
            const decimalValue = parseInt(inputText, fromBaseSystem);
            if (isNaN(decimalValue)) {
                throw new Error("Invalid number");
            }
            const convertedValue = decimalValue
                .toString(toBaseSystem)
                .toUpperCase();
            resultField.value = convertedValue;
        } catch (error) {
            resultField.value = "Error: " + error.message;
        }
    }

    buttonCalc.addEventListener("click", function (event) {
        event.preventDefault();
        convertNumber();
    });

    inputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            convertNumber();
        }
    });

    buttonClear.addEventListener("click", function (event) {
        event.preventDefault();
        inputField.value = "";
        document.getElementById("input-result").value = "";
    });
});

let users = {
    "admin": "1234",
    "mariana": "qwerty"
};

function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (username === "" || password === "") {
        message.textContent = "Будь ласка, заповніть усі поля.";
        return;
    }

    if (users[username]) {
        message.textContent = "Такий користувач вже існує!";
    } else {
        users[username] = password;
        message.textContent = `Користувач "${username}" зареєстрований!`;
        console.log("Усі користувачі:", users);
    }
}

function signIn() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    if (username === "" || password === "") {
        message.textContent = "Будь ласка, заповніть усі поля.";
        return;
    }

    if (!users[username]) {
        message.textContent = "Такого користувача не існує!";
    }
    else {
        if (users[username] === password) {
            window.location.href = "index.html";
        } 
        else {
            message.textContent = "Невірний пароль!";
        }
    }
}