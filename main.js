import "./style.css";

const app = document.querySelector("#app");

app.innerHTML = `<section id="users"></section>`;

const getUsers = () => {
  fetch("https://api.github.com/users")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Hata: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      show(data);
    })
    .catch((err) => showError(err));
};

const show = (users) => {
  console.log(users);
  const userSection = document.getElementById("users");

  users.forEach((user) => {
    userSection.innerHTML += `
        <h1>${user.login}</h1>
        <img src="${user.avatar_url}" width="200px" alt="" />
        <p><a href="${user.html_url}" target="_blank">URL</a></p> 
    `;
  });
};

const showError = (err) => {
  const userSection = document.getElementById("users");
  userSection.innerHTML = `<h1>${err}</h1>
  <img src="./img/404.png" alt="" />
  `;
};

window.addEventListener("load", () => {
  getUsers();
});
