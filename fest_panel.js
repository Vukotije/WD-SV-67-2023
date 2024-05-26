const fireBaseUrl = "https://wd-sv-67-2023-default-rtdb.firebaseio.com/";
const organisatorsTableData = document.getElementById("organisatorsTableData");

getOrganisatorsTableData();

function getOrganisatorsTableData() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let organisators = JSON.parse(request.responseText);
        organisatorsTableData.innerHTML = "";

        for (let id in organisators) {
          let organisator = organisators[id];
          organisatorsTableData.innerHTML += `
            <tr>
                <td>${organisator.naziv}</td>
                <td>${organisator.adresa}</td>
                <td>${organisator.godinaOsnivanja}</td>
                <td>${organisator.kontaktTelefon}</td>
                <td>${organisator.email}</td>
                <td>
                    <div class="dropdown">
                        <button
                            class="btn btn-link dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            data-organisator-id="${id}"
                            data-festivals="${organisator.festivali}"
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
                            aria-labelledby="dropdownMenuButton"
                        >
                            <li>
                                <a
                                    class="dropdown-item text-dark editOrganisator"
                                    data-bs-toggle="modal"
                                    data-bs-target="#EditOrganisatorModal"
                                    href="#"
                                    >Izmeni organizatora</a
                                >
                            </li>
                            <li>
                                <a class="dropdown-item text-danger deleteOrganisator" href="#">Obriši organizatora</a>
                            </li>
                            <li>
                                <a
                                    class="dropdown-item text-dark addFestival"
                                    data-bs-toggle="modal"
                                    data-bs-target="#AddFestivalModal"
                                    href="#"
                                    >Dodaj festival</a
                                >
                            </li>
                            <li>
                                <a
                                    class="dropdown-item text-danger deleteFestival"
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteFestivalModal"
                                    href="#"
                                    >Obriši festival</a
                                >
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>`;

          document.querySelectorAll(".dropdown-toggle").forEach((button) => {
            button.addEventListener("click", function () {
              let organisatorId = this.getAttribute("data-organisator-id");

              let festivals = this.getAttribute("data-festivals");

              let deleteOrganisatorLink =
                this.nextElementSibling.querySelector(".deleteOrganisator");
              deleteOrganisatorLink.addEventListener("click", function (event) {
                event.preventDefault();
                deleteOrganisator(organisatorId);
              });

              let editOrganisatorLink =
                this.nextElementSibling.querySelector(".editOrganisator");
              editOrganisatorLink.addEventListener("click", function (event) {
                event.preventDefault();
                editOrganisator(organisatorId);
              });

              let deleteFestivalLink =
                this.nextElementSibling.querySelector(".deleteFestival");
              deleteFestivalLink.addEventListener("click", function (event) {
                event.preventDefault();
                deleteFestival(festivals);
              });

              let addFestivalLink =
                this.nextElementSibling.querySelector(".addFestival");
              addFestivalLink.addEventListener("click", function (event) {
                event.preventDefault();
                addFestival(festivals);
              });
            });
          });
        }
      } else {
        window.location.href = "greska.html?error=" + this.status;
      }
    }
  };
  request.open("GET", `${fireBaseUrl}/organizatoriFestivala.json`);
  request.send();
}

// Delete Organisator function
function deleteOrganisator(organisatorId) {
  if (confirm("Da li ste sigurni da želite da obrišete organizatora?")) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          getOrganisatorsTableData();
        } else {
          window.location.href = "greska.html?error=" + this.status;
        }
      }
    };
    request.open(
      "DELETE",
      `${fireBaseUrl}/organizatoriFestivala/${organisatorId}.json`
    );
    request.send();
  }
}

// Edit Organisator function
function editOrganisator(organisatorId) {
  // Forma za edit
  const editOrganisatorForm = document.getElementById("editOrganisatorForm");

  // Input polja
  const inputOrganisatorName = document.getElementById("inputOrganisatorName");
  const inputOrganisatorYear = document.getElementById("inputOrganisatorYear");
  const inputOrganisatorPhone = document.getElementById(
    "inputOrganisatorPhone"
  );
  const inputOrganisatorEmail = document.getElementById(
    "inputOrganisatorEmail"
  );
  const inputOrganisatorAddress = document.getElementById(
    "inputOrganisatorAddress"
  );
  const logoPreview = document.getElementById("logoPreview");

  // Dugme za edit
  const EditButton = document.getElementById("EditOrganisatorButton");

  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let organisator_data = JSON.parse(request.responseText);

        inputOrganisatorName.value = organisator_data.naziv;
        inputOrganisatorYear.value = organisator_data.godinaOsnivanja;
        inputOrganisatorPhone.value = organisator_data.kontaktTelefon;
        inputOrganisatorEmail.value = organisator_data.email;
        inputOrganisatorAddress.value = organisator_data.adresa;

        logo = organisator_data.logo;
        logoPreview.src = logo;

        festivali = organisator_data.festivali;

        editValidateAndSend(
          organisatorId,
          editOrganisatorForm,
          inputOrganisatorName,
          inputOrganisatorYear,
          inputOrganisatorPhone,
          inputOrganisatorEmail,
          inputOrganisatorAddress,
          EditButton,
          logo,
          festivali
        );
      } else {
        window.location.href = "greska.html?error=" + this.status;
      }
    }
  };
  request.open(
    "GET",
    `${fireBaseUrl}/organizatoriFestivala/${organisatorId}.json`
  );
  request.send();
}

function editValidateAndSend(
  organisatorId,
  editOrganisatorForm,
  inputOrganisatorName,
  inputOrganisatorYear,
  inputOrganisatorPhone,
  inputOrganisatorEmail,
  inputOrganisatorAddress,
  EditButton,
  logo,
  festivali
) {
  EditButton.addEventListener("click", function () {
    clearEditOrganisatorInputFields();
  });

  editOrganisatorForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearEditOrganisatorInputFields();

    // Vrednosti input polja
    const name = inputOrganisatorName.value.trim();
    const year = inputOrganisatorYear.value.trim();
    const phone = inputOrganisatorPhone.value.trim();
    const email = inputOrganisatorEmail.value.trim();
    const address = inputOrganisatorAddress.value.trim();

    // Feedack elementi
    const emailOrganisatorInvalidFeedback = document.getElementById(
      "emailOrganisatorInvalidFeedback"
    );
    const phonelOrganisatorInvalidFeedback = document.getElementById(
      "phonelOrganisatorInvalidFeedback"
    );
    const adressOrganisatorInvalidFeedback = document.getElementById(
      "adressOrganisatorInvalidFeedback"
    );

    // Promenljiva koja oznacava da li treba ici na server
    let goToServer = true;

    // Provera da li je sve uneto
    if (name === "") {
      goToServer = false;
      inputOrganisatorName.classList.add("is-invalid");
    } else {
      inputOrganisatorName.classList.add("is-valid");
    }
    if (year === "") {
      goToServer = false;
      inputOrganisatorYear.classList.add("is-invalid");
    } else {
      inputOrganisatorYear.classList.add("is-valid");
    }
    if (email === "") {
      goToServer = false;
      inputOrganisatorEmail.classList.add("is-invalid");
    }
    if (phone === "") {
      goToServer = false;
      inputOrganisatorPhone.classList.add("is-invalid");
    }
    if (address === "") {
      goToServer = false;
      inputOrganisatorAddress.classList.add("is-invalid");
    }
    if (goToServer) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        inputOrganisatorEmail.classList.add("is-invalid");
        emailOrganisatorInvalidFeedback.innerHTML = "Email nije validan!";
        goToServer = false;
      } else {
        inputOrganisatorEmail.classList.add("is-valid");
      }

      const phoneRegex = /^\d{3}\/\d{3,4}-\d{3,4}$/;

      if (!phoneRegex.test(phone)) {
        inputOrganisatorPhone.classList.add("is-invalid");
        phonelOrganisatorInvalidFeedback.innerHTML =
          "Broj telefona nije u formatu '(3cifre)/(3 ili 4 cifre)-(3 ili 4 cifre)'!";
        goToServer = false;
      } else {
        inputOrganisatorPhone.classList.add("is-valid");
      }
      const addressRegex =
        /^[a-zA-Z\s0-9čćžšđČĆŽŠĐ]+,\s[a-zA-Z\sčćžšđČĆŽŠĐ]+,\s\d+$/;
      if (!addressRegex.test(address)) {
        inputOrganisatorAddress.classList.add("is-invalid");
        adressOrganisatorInvalidFeedback.innerHTML =
          "Adresa nije u formatu:<br/> 'ulica broj, mesto, ZIP kod'!";
        goToServer = false;
      } else {
        inputOrganisatorAddress.classList.add("is-valid");
      }

      if (goToServer) {
        let edited_organisator = {
          godinaOsnivanja: year,
          naziv: name,
          email: email,
          adresa: address,
          kontaktTelefon: phone,
          festivali: festivali,
          logo: logo,
        };
        let req = new XMLHttpRequest();
        req.open(
          "PUT",
          `${fireBaseUrl}/organizatoriFestivala/${organisatorId}.json`
        );
        req.send(JSON.stringify(edited_organisator));

        let EditOrganisatorModal = document.getElementById(
          "EditOrganisatorModal"
        );
        let modalInstance = bootstrap.Modal.getInstance(EditOrganisatorModal);
        modalInstance.hide();

        const alertSuccessfullOrganisatorEdit = document.getElementById(
          "alertSuccessfullOrganisatorEdit"
        );
        alertSuccessfullOrganisatorEdit.classList.add("show");
        setTimeout(getOrganisatorsTableData, 500);
      }
    }
  });
}

function clearEditOrganisatorInputFields() {
  let editOrganisatorForm = document.querySelector("#editOrganisatorForm");

  inputOrganisatorName.classList.remove("is-valid");
  inputOrganisatorYear.classList.remove("is-valid");
  inputOrganisatorPhone.classList.remove("is-valid");
  inputOrganisatorEmail.classList.remove("is-valid");
  inputOrganisatorAddress.classList.remove("is-valid");

  inputOrganisatorName.classList.remove("is-invalid");
  inputOrganisatorYear.classList.remove("is-invalid");
  inputOrganisatorPhone.classList.remove("is-invalid");
  inputOrganisatorEmail.classList.remove("is-invalid");
  inputOrganisatorAddress.classList.remove("is-invalid");

  editOrganisatorForm.classList.remove("was-validated");
}

// Add Festival function
function addFestival(festivalCode) {
  // Forma za dodavanje festivala
  const AddFestivalForm = document.getElementById("AddFestivalForm");

  // Input polja
  const inputFestivalName = document.getElementById("inputFestivalName");
  const inputFestivalPrice = document.getElementById("inputFestivalPrice");
  const inputFestivalMaxPeople = document.getElementById(
    "inputFestivalMaxPeople"
  );
  const inputFestivalPictures = document.getElementById(
    "inputFestivalPictures"
  );
  const inputFestivalDescription = document.getElementById(
    "inputFestivalDescription"
  );
  const dropdownFestivalType = document.getElementById("dropdownFestivalType");
  const dropdownFestivalTravelType = document.getElementById(
    "dropdownFestivalTravelType"
  );

  // Validacija
  AddFestivalForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearFestivalAddingInputFields();

    // Vrednosti input polja
    const name = inputFestivalName.value.trim();
    const price = inputFestivalPrice.value.trim();
    const maxPeople = inputFestivalMaxPeople.value.trim();
    const description = inputFestivalDescription.value.trim();
    const type = dropdownFestivalType.value.trim();
    const travelType = dropdownFestivalTravelType.value.trim();

    const pictures = inputFestivalPictures.value.trim();

    // Promenljiva koja oznacava da li treba ici na server
    let goToServer = true;

    // Provera da li je sve uneto
    if (name === "") {
      goToServer = false;
      inputFestivalName.classList.add("is-invalid");
    } else {
      inputFestivalName.classList.add("is-valid");
    }
    if (price === "") {
      goToServer = false;
      inputFestivalPrice.classList.add("is-invalid");
    } else {
      inputFestivalPrice.classList.add("is-valid");
    }
    if (maxPeople === "") {
      goToServer = false;
      inputFestivalMaxPeople.classList.add("is-invalid");
    } else {
      inputFestivalMaxPeople.classList.add("is-valid");
    }
    if (pictures === "") {
      goToServer = false;
      inputFestivalPictures.classList.add("is-invalid");
    } else {
      inputFestivalPictures.classList.add("is-valid");
    }
    let pictureObject = {};
    const pictureLinks = pictures.split(" ");
    for (let i = 0; i < pictureLinks.length; i++) {
      if (!isValidUrl(pictureLinks[i])) {
        goToServer = false;
        inputFestivalPictures.classList.add("is-invalid");
        picturesFestivalInvalidFeedback.innerHTML = "Ovo nisu linkovi!";
      }
      pictureObject[i + 1] = pictureLinks[i];
    }
    if (description === "") {
      goToServer = false;
      inputFestivalDescription.classList.add("is-invalid");
    }
    if (goToServer) {
      let request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            let festivals = JSON.parse(request.responseText);
            new_festival = {
              maxOsoba: maxPeople,
              slike: pictureObject,
              naziv: name,
              cena: price,
              opis: description,
              prevoz: travelType,
              tip: type,
            };

            id = Object.keys(festivals).length;
            festivals[id] = new_festival;

            let req = new XMLHttpRequest();
            req.open("PUT", `${fireBaseUrl}festivali/${festivalCode}.json`);
            req.send(JSON.stringify(festivals));

            let modalElement = document.getElementById("AddFestivalModal");
            let modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();
            const alertSuccessfullFestivalAdd = document.getElementById(
              "alertSuccessfullFestivalAdd"
            );
            alertSuccessfullFestivalAdd.classList.add("show");
          } else {
            window.location.href = "greska.html?error=" + this.status;
          }
        }
      };

      request.open("GET", `${fireBaseUrl}festivali/${festivalCode}.json`);
      request.send();
    }
  });
}

function clearFestivalAddingInputFields() {
  inputFestivalName.classList.remove("is-valid");
  inputFestivalPrice.classList.remove("is-valid");
  inputFestivalMaxPeople.classList.remove("is-valid");
  inputFestivalPictures.classList.remove("is-valid");
  inputFestivalDescription.classList.remove("is-valid");

  inputFestivalName.classList.remove("is-invalid");
  inputFestivalPrice.classList.remove("is-invalid");
  inputFestivalMaxPeople.classList.remove("is-invalid");
  inputFestivalPictures.classList.remove("is-invalid");
  inputFestivalDescription.classList.remove("is-invalid");

  AddFestivalForm.classList.remove("was-validated");
}

function isValidUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;
  }
  return true;
}

// Delete Festival function
function deleteFestival(festivalsCode) {
  makeDeleteFestivalModal(festivalsCode);

  const deleteFestivalForm = document.getElementById("deleteFestivalForm");
  deleteFestivalForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const selectedRadioButton = deleteFestivalForm.querySelector(
      'input[name="option"]:checked'
    );
    const selected_festival = selectedRadioButton.value;

    removeFestival(festivalsCode, selected_festival);
  });
}

// Make delete festival modal
function makeDeleteFestivalModal(festivalsCode) {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        const deleteFestivalOptionsContainer = document.getElementById(
          "deleteFestivalOptionsContainer"
        );
        deleteFestivalOptionsContainer.innerHTML = "";
        let festivals = JSON.parse(request.responseText);

        for (let id in festivals) {
          let festival = festivals[id];
          deleteFestivalOptionsContainer.innerHTML += `
            <div class="form-check my-2">
                <input
                    class="form-check-input"
                    type="radio"
                    name="option"
                    id="${id}"
                    value="${id}"
                />
                <label
                    class="form-check-label"
                    for="${id}"
                >
                    ${festival.naziv}
                </label>
            </div>
            `;
        }
      } else {
        window.location.href = "greska.html?error=" + this.status;
      }
    }
  };
  request.open("GET", `${fireBaseUrl}festivali/${festivalsCode}.json`);
  request.send();
}

// Helper function for delete festival
function removeFestival(festivalsCode, selected_festival) {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let modalElement = document.getElementById("deleteFestivalModal");
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        const alertSuccessfullFestivalDeletion = document.getElementById(
          "alertSuccessfullFestivalDeletion"
        );
        alertSuccessfullFestivalDeletion.classList.add("show");
      } else {
        window.location.href = "greska.html?error=" + this.status;
      }
    }
  };
  request.open(
    "DELETE",
    `${fireBaseUrl}festivali/${festivalsCode}/${selected_festival}.json`
  );
  request.send();
}
