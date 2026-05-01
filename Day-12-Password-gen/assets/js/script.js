  const lengthSlider = document.getElementById("length");
        const lengthValue = document.getElementById("lengthValue");

        lengthSlider.addEventListener("input", () => {
            lengthValue.textContent = lengthSlider.value;
        });

        function generatePassword() {
            const length = lengthSlider.value;
            const upper = document.getElementById("uppercase").checked;
            const lower = document.getElementById("lowercase").checked;
            const number = document.getElementById("numbers").checked;
            const symbol = document.getElementById("symbols").checked;

            const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const lowerSet = "abcdefghijklmnopqrstuvwxyz";
            const numberSet = "0123456789";
            const symbolSet = "!@#$%^&*()";

            let all = "";
            if (upper) all += upperSet;
            if (lower) all += lowerSet;
            if (number) all += numberSet;
            if (symbol) all += symbolSet;

            if (all === "") {
                alert("Select at least one option");
                return;
            }

            let password = "";
            for (let i = 0; i < length; i++) {
                password += all[Math.floor(Math.random() * all.length)];
            }

            document.getElementById("password").value = password;
            checkStrength(password);
        }

        function copyPassword() {
            const pass = document.getElementById("password");
            pass.select();
            document.execCommand("copy");
        }

        const passwordInput = document.getElementById("password");

        passwordInput.addEventListener("input", () => {
            checkStrength(passwordInput.value);
        });

        passwordInput.addEventListener("click", () => {
            passwordInput.select();
        });

        function checkStrength(password) {
            const bar = document.getElementById("strengthBar");
            let strength = 0;

            if (password.length > 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;

            if (strength <= 1) {
                bar.style.width = "25%";
                bar.style.background = "red";
            } else if (strength == 2) {
                bar.style.width = "50%";
                bar.style.background = "orange";
            } else if (strength == 3) {
                bar.style.width = "75%";
                bar.style.background = "yellow";
            } else {
                bar.style.width = "100%";
                bar.style.background = "lime";
            }
        }