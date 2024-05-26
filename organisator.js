const fireBaseUrl = "https://wd-sv-67-2023-default-rtdb.firebaseio.com/";
const organisatorId = getOrganisatorId();
const organisatorName = document.getElementById("organisatorName");
const organisatorAdress = document.getElementById("organisatorAdress");
const organisatorFoundingYear = document.getElementById(
  "organisatorFoundingYear"
);
const organisatorPhone = document.getElementById("organisatorPhone");
const organisatorEmail = document.getElementById("organisatorEmail");
const organisatorLogo = document.getElementById("organisatorLogo");

let festivalsCode;
const searchButton = document.getElementById("FestivalButtonSearch");

getOrganisatorsInfo();

searchButton.addEventListener("click", () => searchFestivals(festivalsCode));

function getOrganisatorId() {
  let params = new URLSearchParams(window.location.search);
  let organisatorId = params.get("organisatorId");
  return organisatorId;
}

function getOrganisatorsInfo() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let organisator = JSON.parse(request.responseText);

        organisatorName.innerHTML = organisator.naziv;
        organisatorAdress.innerHTML = organisator.adresa;
        organisatorFoundingYear.innerHTML = organisator.godinaOsnivanja;
        organisatorPhone.innerHTML = organisator.kontaktTelefon;
        organisatorEmail.innerHTML = organisator.email;
        organisatorLogo.src = organisator.logo;
        festivalsCode = organisator.festivali;
        getAllOrganisatorsFestivals(festivalsCode);
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

/* Festival html card prototype
<div class="col mb-4">
    <div class="card border-4 rounded-3">
        <a href="festival.html">
            <div class="ratio ratio-16x9">
                <img
                class="card-img-top w-100 border-bottom-thick-pink"
                src="https://i.imgur.com/nIhAjPQ.jpeg"
                />
            </div>
            <div class="p-3 fw-normal text-center">
                <h4>Festival Ostrvske Muzike</h4>
            </div>
        </a>
    </div>
</div>
*/

const festivalRow = document.getElementById("festivalRow");

function getAllOrganisatorsFestivals(festivalsCode) {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let festivals = JSON.parse(request.responseText);
        festivalRow.innerHTML = "";

        for (let id in festivals) {
          let festival = festivals[id];
          festivalRow.innerHTML += `
            <div class="col mb-4">
                <div class="card border-4 rounded-3">
                    <a href="festival.html?festivalId=${id}&festivalsId=${festivalsCode}">
                        <div class="ratio ratio-16x9">
                            <img
                            class="card-img-top w-100 border-bottom-thick-pink"
                            src="${festival.slike}"
                            />
                        </div>
                        <div class="p-3 fw-normal text-center d-flex align-items-center justify-content-center"
                            style="min-height: 100px"
                            >
                            <h4>${festival.naziv}</h4>
                        </div>
                    </a>
                </div>
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

function searchFestivals(festivalsCode) {
  let FestivalType = document.getElementById("dropdownFestivalType").value;
  let FestivalName = document.getElementById("FestSearchInput").value;
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        festivalRow.innerHTML = "";
        let festivals = JSON.parse(request.responseText);

        for (let id in festivals) {
          let festival = festivals[id];
          if (FestivalType === "Svi") {
            FestivalType = festival.tip;
          }
          if (
            festival.naziv.toLowerCase().includes(FestivalName.toLowerCase()) &&
            festival.tip === FestivalType
          ) {
            festivalRow.innerHTML += `
            <div class="col mb-4">
                <div class="card border-4 rounded-3">
                    <a href="festival.html?festivalId=${id}">
                        <div class="ratio ratio-16x9">
                            <img
                            class="card-img-top w-100 border-bottom-thick-pink"
                            src="${festival.slike}"
                            />
                        </div>
                        <div class="p-3 fw-normal text-center d-flex align-items-center justify-content-center"
                            style="min-height: 100px"
                            >
                            <h4>${festival.naziv}</h4>
                        </div>
                    </a>
                </div>
            </div>
            `;
          }
        }
      } else {
        window.location.href = "greska.html?error=" + this.status;
      }
    }
  };
  request.open("GET", `${fireBaseUrl}festivali/${festivalsCode}.json`);
  request.send();
}
