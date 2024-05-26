const fireBaseUrl = "https://wd-sv-67-2023-default-rtdb.firebaseio.com/";
const usersTableData = document.getElementById("usersTableData");

getUsersTableData();

function getUsersTableData() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let users = JSON.parse(request.responseText);
        usersTableData.innerHTML = "";

        for (let id in users) {
          let user = users[id];
          usersTableData.innerHTML += `
            <tr>
                <td>${user.korisnickoIme}</td>
                <td>${user.lozinka}</td>
                <td>${user.ime}</td>
                <td>${user.prezime}</td>
                <td>${user.email}</td>
                <td>${user.datumRodjenja}</td>
                <td>${user.adresa}</td>
                <td>${user.telefon}</td>
                <td>${user.zanimanje}</td>
                <td>
                    <div class="dropdown">
                        <button
                        class="btn btn-link dropdown-toggle"
                        type="button"
                        id="dropdownUserMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-user-id="${id}"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.2em"
                            fill="dark"
                            class="bi bi-gear"
                            viewBox="0 0 16 16"
                        >
                            <path
                            d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"
                            />
                            <path
                            d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"
                            />
                        </svg>
                        </button>
                        <ul
                        class="dropdown-menu p-0"
                        aria-labelledby="dropdownUserMenuButton"
                        >
                        <li>
                            <a
                            id="editUserButton"
                            class="dropdown-item text-dark"
                            data-bs-toggle="modal"
                            data-bs-target="#EditUserModal"
                            href="#"
                            >Izmeni Podatke Korsinika</a
                            >
                        </li>
                        <li>
                            <a id="deleteUserLink" class="dropdown-item text-danger" href="#">Obriši Korisnika</a>
                        </li>
                        </ul>
                    </div>
                </td>
            </tr>`;

          document.querySelectorAll(".dropdown-toggle").forEach((button) => {
            button.addEventListener("click", function () {
              let userId = this.getAttribute("data-user-id");

              let deleteUserLink =
                this.nextElementSibling.querySelector(".text-danger");

              deleteUserLink.addEventListener("click", function (event) {
                event.preventDefault();
                deleteUser(userId);
              });

              let editUserLink =
                this.nextElementSibling.querySelector(".text-dark");

              editUserLink.addEventListener("click", function (event) {
                event.preventDefault();
                editUser(userId);
              });
            });
          });
        }
      } else {
        window.location.href = "greska.html?error=" + this.status;
      }
    }
  };
  request.open("GET", `${fireBaseUrl}/korisnici.json`);
  request.send();
}

// Delete user function
function deleteUser(userId) {
  if (confirm("Da li ste sigurni da želite da obrišete korisnika?")) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          getUsersTableData();
        } else {
          window.location.href = "greska.html?error=" + this.status;
        }
      }
    };
    request.open("DELETE", `${fireBaseUrl}/korisnici/${userId}.json`);
    request.send();
  }
}

// Edit user function
function editUser(userId) {
  // Forma za edit
  const EditUserForm = document.getElementById("editUserForm");

  // Input polja
  const inputEditName = document.getElementById("inputEditName");
  const inputEditSurname = document.getElementById("inputEditSurname");
  const inputEditUsername = document.getElementById("inputEditUsername");
  const inputEditPassword = document.getElementById("inputEditPassword");
  const inputEditEmail = document.getElementById("inputEditEmail");
  const inputEditPhone = document.getElementById("inputEditPhone");
  const inputEditBirthday = document.getElementById("inputEditBirthday");
  const inputEditAddress = document.getElementById("inputEditAddress");
  const inputEditEducation = document.getElementById("inputEditEducation");

  // Dugme za edit
  const EditButton = document.getElementById("EditButton");

  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let user_data = JSON.parse(request.responseText);

        inputEditName.value = user_data.ime;
        inputEditSurname.value = user_data.prezime;
        inputEditUsername.value = user_data.korisnickoIme;
        inputEditPassword.value = user_data.lozinka;
        inputEditEmail.value = user_data.email;
        inputEditPhone.value = user_data.telefon;
        inputEditBirthday.value = user_data.datumRodjenja;
        inputEditAddress.value = user_data.adresa;
        inputEditEducation.value = user_data.zanimanje;

        editValidateAndSend(
          userId,
          EditUserForm,
          inputEditName,
          inputEditSurname,
          inputEditUsername,
          inputEditPassword,
          inputEditEmail,
          inputEditPhone,
          inputEditBirthday,
          inputEditAddress,
          inputEditEducation,
          EditButton
        );
      } else {
        window.location.href = "greska.html?error=" + this.status;
      }
    }
  };
  request.open("GET", `${fireBaseUrl}/korisnici/${userId}.json`);
  request.send();
}

function editValidateAndSend(
  userId,
  EditUserForm,
  inputEditName,
  inputEditSurname,
  inputEditUsername,
  inputEditPassword,
  inputEditEmail,
  inputEditPhone,
  inputEditBirthday,
  inputEditAddress,
  inputEditEducation,
  EditButton
) {
  EditButton.addEventListener("click", function () {
    clearEditInputFields();
  });

  EditUserForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearEditInputFields();

    // Vrednosti input polja
    const name = inputEditName.value.trim();
    const surname = inputEditSurname.value.trim();
    const username = inputEditUsername.value.trim();
    const password = inputEditPassword.value.trim();
    const email = inputEditEmail.value.trim();
    const phone = inputEditPhone.value.trim();
    const birthday = inputEditBirthday.value.trim();
    const address = inputEditAddress.value.trim();
    const education = inputEditEducation.value.trim();

    // Feedack elementi
    const usernameEditInvalidFeedback = document.getElementById(
      "usernameEditInvalidFeedback"
    );
    const emailEditInvalidFeedback = document.getElementById(
      "emailEditInvalidFeedback"
    );
    const phoneEditInvalidFeedback = document.getElementById(
      "phoneEditInvalidFeedback"
    );
    const addressEditInvalidFeedback = document.getElementById(
      "addressEditInvalidFeedback"
    );

    // Promenljiva koja oznacava da li treba ici na server
    let goToServer = true;

    // Provera da li je sve uneto
    if (name === "") {
      goToServer = false;
      inputEditName.classList.add("is-invalid");
    } else {
      inputEditName.classList.add("is-valid");
    }
    if (surname === "") {
      goToServer = false;
      inputEditSurname.classList.add("is-invalid");
    } else {
      inputEditSurname.classList.add("is-valid");
    }
    if (username === "") {
      goToServer = false;
      inputEditUsername.classList.add("is-invalid");
    }
    if (password === "") {
      goToServer = false;
      inputEditPassword.classList.add("is-invalid");
    } else {
      inputEditPassword.classList.add("is-valid");
    }
    if (email === "") {
      goToServer = false;
      inputEditEmail.classList.add("is-invalid");
    }
    if (phone === "") {
      goToServer = false;
      inputEditPhone.classList.add("is-invalid");
    }
    if (birthday === "") {
      goToServer = false;
      inputEditBirthday.classList.add("is-invalid");
    } else {
      inputEditBirthday.classList.add("is-valid");
    }
    if (address === "") {
      goToServer = false;
      inputEditAddress.classList.add("is-invalid");
    }
    if (education === "") {
      goToServer = false;
      inputEditEducation.classList.add("is-invalid");
    } else {
      inputEditEducation.classList.add("is-valid");
    }
    if (goToServer) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        inputEditEmail.classList.add("is-invalid");
        emailEditInvalidFeedback.innerHTML = "Email nije validan!";
        goToServer = false;
      } else {
        inputEditEmail.classList.add("is-valid");
      }

      const phoneRegex = /^\d{7,12}$/;
      if (!phoneRegex.test(phone)) {
        inputEditPhone.classList.add("is-invalid");
        phoneEditInvalidFeedback.innerHTML = "Broj telefona nije validan!";
        goToServer = false;
      } else {
        inputEditPhone.classList.add("is-valid");
      }
      const addressRegex =
        /^[a-zA-Z\s0-9čćžšđČĆŽŠĐ]+,\s[a-zA-Z\sčćžšđČĆŽŠĐ]+,\s\d+$/;
      if (!addressRegex.test(address)) {
        inputEditAddress.classList.add("is-invalid");
        addressEditInvalidFeedback.innerHTML =
          "Adresa nije u formatu:<br/> 'ulica broj, mesto, ZIP kod'!";
        goToServer = false;
      } else {
        inputEditAddress.classList.add("is-valid");
      }

      if (goToServer) {
        let edited_korisnik = {
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

        let req = new XMLHttpRequest();
        req.open("PUT", `${fireBaseUrl}korisnici/${userId}.json`);
        req.send(JSON.stringify(edited_korisnik));

        let modalElement = document.getElementById("EditUserModal");
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();

        const alertSuccessfullEdit = document.getElementById(
          "alertSuccessfullEdit"
        );
        alertSuccessfullEdit.classList.add("show");
        setTimeout(getUsersTableData, 500);
      }
    }
  });
}

function clearEditInputFields() {
  let EditUserForm = document.querySelector("#editUserForm");

  inputEditName.classList.remove("is-valid");
  inputEditSurname.classList.remove("is-valid");
  inputEditUsername.classList.remove("is-valid");
  inputEditPassword.classList.remove("is-valid");
  inputEditEmail.classList.remove("is-valid");
  inputEditPhone.classList.remove("is-valid");
  inputEditBirthday.classList.remove("is-valid");
  inputEditAddress.classList.remove("is-valid");
  inputEditEducation.classList.remove("is-valid");

  inputEditName.classList.remove("is-invalid");
  inputEditSurname.classList.remove("is-invalid");
  inputEditUsername.classList.remove("is-invalid");
  inputEditPassword.classList.remove("is-invalid");
  inputEditEmail.classList.remove("is-invalid");
  inputEditPhone.classList.remove("is-invalid");
  inputEditBirthday.classList.remove("is-invalid");
  inputEditAddress.classList.remove("is-invalid");
  inputEditEducation.classList.remove("is-invalid");

  EditUserForm.classList.remove("was-validated");
}
