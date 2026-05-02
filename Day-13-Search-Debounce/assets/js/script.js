 const input = document.getElementById("searchInput");
        const results = document.getElementById("results");
        const loader = document.getElementById("loader");
        const profileCard = document.getElementById("profileCard");

        let debounceTimer;
        let currentData = [];

        function debounce(func, delay) {
            return function (...args) {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => func.apply(this, args), delay);
            };
        }

        async function searchUsers(query) {
            if (!query) {
                results.innerHTML = "";
                return;
            }

            loader.style.display = "block";

            try {
                const res = await fetch(`https://api.github.com/search/users?q=${query}`);
                const data = await res.json();

                currentData = data.items.slice(0, 5);
                displayResults(currentData, query);

            } catch {
                results.innerHTML = "<p>Error fetching data</p>";
            }

            loader.style.display = "none";
        }

        function highlight(text, query) {
            const regex = new RegExp(`(${query})`, "gi");
            return text.replace(regex, `<span class="highlight">$1</span>`);
        }

        function showUserProfile(user) {
            profileCard.innerHTML = `
    <div style="
      background: rgba(255,255,255,0.05);
      padding: 15px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      gap: 15px;
    ">
      <img src="${user.avatar_url}" width="60" style="border-radius:50%">
      
      <div>
        <h6 style="margin:0;">${user.login}</h6>
        <a href="${user.html_url}" target="_blank" style="color: cyan;">
          View Profile
        </a>
      </div>
    </div>
  `;
        }

        function displayResults(users, query) {
            results.innerHTML = "";

            if (users.length === 0) {
                results.innerHTML = "<p>No results found</p>";
                return;
            }

            users.forEach((user) => {
                const div = document.createElement("div");
                div.classList.add("result-item");

                div.innerHTML = highlight(user.login, query);

                div.addEventListener("click", () => {
                    input.value = user.login;
                    results.innerHTML = "";
                    showUserProfile(user);
                });

                results.appendChild(div);
            });
        }

        const debouncedSearch = debounce(searchUsers, 500);

        input.addEventListener("input", (e) => {
            const value = e.target.value.trim();

            debouncedSearch(value);

            if (value === "") {
                profileCard.innerHTML = "";
            }
        });