//const fireBaseUrl = "https://wd-sv-67-2023-default-rtdb.firebaseio.com/" == > definsano u drugom js fajlu

// Forma za login
const loginUserForm = document.getElementById("loginUserForm");
// Dugme za login
const loginButton = document.getElementById("loginButton");
// Dugme za logout
const logoutButton = document.getElementById("logoutButton");

// Input polja
const inputLoginUsername = document.getElementById("inputLoginUsername");
const inputLoginPassword = document.getElementById("inputLoginPassword");

onload = function () {
  lookForUser();
};

loginButton.addEventListener("click", function () {
  clearLoginInputFields();
});

// Login validacija i skladistenje u local storage
loginUserForm.addEventListener("submit", function (e) {
  e.preventDefault();
  clearLoginInputFields();

  // Vrednosti input polja
  const username = inputLoginUsername.value.trim();
  const password = inputLoginPassword.value.trim();

  // Feedack elementi
  const usernameLoginInvalidFeedback = document.getElementById(
    "usernameLoginInvalidFeedback"
  );
  const passwordLoginInvalidFeedback = document.getElementById(
    "passwordLoginInvalidFeedback"
  );

  // Promenljiva koja oznacava da li treba ici na server
  let goToServer = true;

  // provera da li je unteto korisnicko ime
  if (username === "") {
    goToServer = false;
    inputLoginUsername.classList.add("is-invalid");
    usernameLoginInvalidFeedback.innerHTML = "Morate uneti korisničko ime!";
  }

  // provera da li je uneta lozinka
  if (password === "") {
    goToServer = false;
    inputLoginPassword.classList.add("is-invalid");
    passwordLoginInvalidFeedback.innerHTML = "Morate uneti lozinku!";
  }

  if (goToServer) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          let users = JSON.parse(request.responseText);
          for (let id in users) {
            let user = users[id];
            if (user.korisnickoIme === username && user.lozinka === password) {
              // Validacija uspesna
              inputLoginUsername.classList.add("is-valid");
              inputLoginPassword.classList.add("is-valid");

              ulogovaniKorisnik = {
                korisnickoIme: user.korisnickoIme,
                lozinka: user.lozinka,
                ime: user.ime,
                prezime: user.prezime,
                email: user.email,
                datumRodjenja: user.datumRodjenja,
                adresa: user.adresa,
                telefon: user.telefon,
                zanimanje: user.zanimanje,
              };

              localStorage.setItem(
                "ulogovaniKorisnik",
                JSON.stringify(ulogovaniKorisnik)
              );
              // Close the already open login modal
              let modalElement = document.getElementById("loginUserModal");
              let modalInstance = bootstrap.Modal.getInstance(modalElement);
              modalInstance.hide();
              lookForUser();
              const alertSuccessfullLogin = document.getElementById(
                "alertSuccessfullLogin"
              );
              alertSuccessfullLogin.classList.add("show");
              return;
            }
          }
          inputLoginUsername.classList.add("is-invalid");
          inputLoginPassword.classList.add("is-invalid");
          inputLoginUsername.classList.remove("is-valid");
          inputLoginPassword.classList.remove("is-valid");
          loginUserForm.classList.remove("was-validated");

          usernameLoginInvalidFeedback.innerHTML =
            "Kombinacija korisničkog imena i lozinke nije ispravna!";
          passwordLoginInvalidFeedback.innerHTML =
            "Kombinacija korisničkog imena i lozinke nije ispravna!";
        } else {
          window.location.href = "greska.html?error=" + this.status;
        }
      }
    };

    request.open("GET", `${fireBaseUrl}korisnici.json`);
    request.send();
  }
});

function clearLoginInputFields() {
  inputLoginUsername.classList.remove("is-invalid");
  inputLoginPassword.classList.remove("is-invalid");
  inputLoginUsername.classList.remove("is-valid");
  inputLoginPassword.classList.remove("is-valid");
  loginUserForm.classList.remove("was-validated");
}

function lookForUser() {
  const liLoginButton = document.getElementById("liLoginButton");
  const liRegisterButton = document.getElementById("liRegisterButton");
  const liLogoutButton = document.getElementById("liLogoutButton");

  let ulogovaniKorisnik = JSON.parse(localStorage.getItem("ulogovaniKorisnik"));

  if (ulogovaniKorisnik) {
    // If username exists, show logout button
    liLoginButton.classList.add("d-none");
    liRegisterButton.classList.add("d-none");
    liLogoutButton.classList.remove("d-none");
    logoutButton.innerHTML = `Odjavi se, ${ulogovaniKorisnik.korisnickoIme}`;
  } else {
    liLoginButton.classList.remove("d-none");
    liRegisterButton.classList.remove("d-none");
    liLogoutButton.classList.add("d-none");
    logoutButton.innerHTML = "";
  }
}

logoutButton.addEventListener("click", function () {
  if (confirm("Da li ste sigurni da želite da se odjavite?")) {
    localStorage.removeItem("ulogovaniKorisnik");
    lookForUser();
  }
});

//
//
//
//
//
//
//
//
//
//
//
//

// Forma za registraciju
const registerUserForm = document.getElementById("registerUserForm");
// Dugme za registraciju
const registerButton = document.getElementById("registerButton");

// Input polja
const inputRegistrationName = document.getElementById("inputRegistrationName");
const inputRegistrationSurname = document.getElementById(
  "inputRegistrationSurname"
);
const inputRegistrationUsername = document.getElementById(
  "inputRegistrationUsername"
);
const inputRegistrationPassword = document.getElementById(
  "inputRegistrationPassword"
);
const inputRegistrationEmail = document.getElementById(
  "inputRegistrationEmail"
);
const inputRegistrationPhone = document.getElementById(
  "inputRegistrationPhone"
);
const inputRegistrationBirthday = document.getElementById(
  "inputRegistrationBirthday"
);
const inputRegistrationAddress = document.getElementById(
  "inputRegistrationAddress"
);
const inputRegistrationEducation = document.getElementById(
  "inputRegistrationEducation"
);

registerButton.addEventListener("click", function () {
  clearRegisterInputFields();
});

// Registraciona validacija
registerUserForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("submit");
  clearRegisterInputFields();

  // Vrednosti input polja
  const name = inputRegistrationName.value.trim();
  const surname = inputRegistrationSurname.value.trim();
  const username = inputRegistrationUsername.value.trim();
  const password = inputRegistrationPassword.value.trim();
  const email = inputRegistrationEmail.value.trim();
  const phone = inputRegistrationPhone.value.trim();
  const birthday = inputRegistrationBirthday.value.trim();
  const address = inputRegistrationAddress.value.trim();
  const education = inputRegistrationEducation.value.trim();

  // Feedack elementi
  const usernameRegisterInvalidFeedback = document.getElementById(
    "usernameRegisterInvalidFeedback"
  );
  const emailRegisterInvalidFeedback = document.getElementById(
    "emailRegisterInvalidFeedback"
  );
  const phoneRegisterInvalidFeedback = document.getElementById(
    "phoneRegisterInvalidFeedback"
  );
  const addressRegisterInvalidFeedback = document.getElementById(
    "addressRegisterInvalidFeedback"
  );

  // Promenljiva koja oznacava da li treba ici na server
  let goToServer = true;

  // Provera da li je sve uneto
  if (name === "") {
    goToServer = false;
    inputRegistrationName.classList.add("is-invalid");
  } else {
    inputRegistrationName.classList.add("is-valid");
  }
  if (surname === "") {
    goToServer = false;
    inputRegistrationSurname.classList.add("is-invalid");
  } else {
    inputRegistrationSurname.classList.add("is-valid");
  }
  if (username === "") {
    goToServer = false;
    inputRegistrationUsername.classList.add("is-invalid");
  }
  if (password === "") {
    goToServer = false;
    inputRegistrationPassword.classList.add("is-invalid");
  } else {
    inputRegistrationPassword.classList.add("is-valid");
  }
  if (email === "") {
    goToServer = false;
    inputRegistrationEmail.classList.add("is-invalid");
  }
  if (phone === "") {
    goToServer = false;
    inputRegistrationPhone.classList.add("is-invalid");
  }
  if (birthday === "") {
    goToServer = false;
    inputRegistrationBirthday.classList.add("is-invalid");
  } else {
    inputRegistrationBirthday.classList.add("is-valid");
  }
  if (address === "") {
    goToServer = false;
    inputRegistrationAddress.classList.add("is-invalid");
  }
  if (education === "") {
    goToServer = false;
    inputRegistrationEducation.classList.add("is-invalid");
  } else {
    inputRegistrationEducation.classList.add("is-valid");
  }
  console.log(goToServer);
  if (goToServer) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      inputRegistrationEmail.classList.add("is-invalid");
      emailRegisterInvalidFeedback.innerHTML = "Email nije validan!";
      goToServer = false;
    } else {
      console.log("valid mail");
      inputRegistrationEmail.classList.add("is-valid");
    }

    const phoneRegex = /^\d{7,12}$/;
    if (!phoneRegex.test(phone)) {
      inputRegistrationPhone.classList.add("is-invalid");
      phoneRegisterInvalidFeedback.innerHTML = "Broj telefona nije validan!";
      goToServer = false;
    } else {
      console.log("valid phone");
      inputRegistrationPhone.classList.add("is-valid");
    }

    const addressRegex =
      /^[a-zA-Z\s0-9čćžšđČĆŽŠĐ]+,\s[a-zA-Z\sčćžšđČĆŽŠĐ]+,\s\d+$/;
    if (!addressRegex.test(address)) {
      inputRegistrationAddress.classList.add("is-invalid");
      addressRegisterInvalidFeedback.innerHTML =
        "Adresa nije u formatu:<br/> 'ulica broj, mesto, ZIP kod'!";
      goToServer = false;
    } else {
      inputRegistrationAddress.classList.add("is-valid");
    }
    console.log("valid address");
    if (goToServer) {
      let request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            let users = JSON.parse(request.responseText);
            for (let id in users) {
              let user = users[id];
              if (user.korisnickoIme === username) {
                usernameRegisterInvalidFeedback.innerHTML =
                  "Korisničko ime je već zauzeto!";
                inputRegistrationUsername.classList.add("is-invalid");
                return;
              }
            }
            inputRegistrationUsername.classList.add("is-valid");
            ulogovaniKorisnik = {
              korisnickoIme: username,
              lozinka: password,
              ime: name,
              prezime: surname,
              email: email,
              datumRodjenja: birthday,
              adresa: address,
              telefon: phone,
              zanimanje: education,
            };

            id = Object.keys(users).length;
            users[id] = ulogovaniKorisnik;
            let req = new XMLHttpRequest();
            req.open("PUT", `${fireBaseUrl}korisnici.json`);
            req.send(JSON.stringify(users));

            localStorage.setItem(
              "ulogovaniKorisnik",
              JSON.stringify(ulogovaniKorisnik)
            );
            let modalElement = document.getElementById("RegisterUserModal");
            let modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();
            lookForUser();
            const alertSuccessfullRegistration = document.getElementById(
              "alertSuccessfullRegistration"
            );
            alertSuccessfullRegistration.classList.add("show");
            return;
          } else {
            window.location.href = "greska.html?error=" + this.status;
          }
        }
      };

      request.open("GET", `${fireBaseUrl}korisnici.json`);
      request.send();
    }
  }
});

function clearRegisterInputFields() {
  inputRegistrationName.classList.remove("is-valid");
  inputRegistrationSurname.classList.remove("is-valid");
  inputRegistrationUsername.classList.remove("is-valid");
  inputRegistrationPassword.classList.remove("is-valid");
  inputRegistrationEmail.classList.remove("is-valid");
  inputRegistrationPhone.classList.remove("is-valid");
  inputRegistrationBirthday.classList.remove("is-valid");
  inputRegistrationAddress.classList.remove("is-valid");
  inputRegistrationEducation.classList.remove("is-valid");

  inputRegistrationName.classList.remove("is-invalid");
  inputRegistrationSurname.classList.remove("is-invalid");
  inputRegistrationUsername.classList.remove("is-invalid");
  inputRegistrationPassword.classList.remove("is-invalid");
  inputRegistrationEmail.classList.remove("is-invalid");
  inputRegistrationPhone.classList.remove("is-invalid");
  inputRegistrationBirthday.classList.remove("is-invalid");
  inputRegistrationAddress.classList.remove("is-invalid");
  inputRegistrationEducation.classList.remove("is-invalid");

  registerUserForm.classList.remove("was-validated");
}
