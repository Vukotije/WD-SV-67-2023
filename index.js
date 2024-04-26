const fireBaseUrl = "https://wd-sv-67-2023-default-rtdb.firebaseio.com/";
const organisatorsRow = document.getElementById("organisatorsRow");

getAllOrganisators();

/* Organizator html card prototype
<div class="col mb-4">
    <div class="card border-4 rounded-3">
        <a href="orgnisator.html">
            <div class="ratio ratio-16x9">
                <img
                class="card-img-top w-100 border-bottom-thick-orange"
                src="https://i.imgur.com/OV15WM6.jpeg"
                />
            </div>
            <div class="p-3 fw-normal text-center">
                <h4>BeoArt Fest</h4>
            </div>
        </a>
    </div>
</div> 
*/

function getAllOrganisators() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        cleanOrganisatorsRow();
        let organisators = JSON.parse(request.responseText);
        console.log(organisators);

        for (let id in organisators) {
          let organisator = organisators[id];
          console.log(organisator);
          organisatorsRow.innerHTML += `
            <div class="col mb-4">
                <div class="card border-4 rounded-3">
                    <a href="organisator.html?organisatorId=${id}">
                        <div class="ratio ratio-16x9">
                            <img
                            class="card-img-top w-100 border-bottom-thick-orange"
                            src="${organisator.logo}"
                            />
                        </div>
                        <div class="p-3 fw-normal text-center">
                            <h4>${organisator.naziv}</h4>
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
  request.open("GET", `${fireBaseUrl}organizatoriFestivala.json`);
  request.send();
}

function cleanOrganisatorsRow() {
  organisatorsRow.innerHTML = "";
}
