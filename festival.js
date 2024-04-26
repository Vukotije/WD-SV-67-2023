const fireBaseUrl = "https://wd-sv-67-2023-default-rtdb.firebaseio.com/";
const festivalIdBundle = getFestivalId();
const festivalId = festivalIdBundle[0];
const festivalsId = festivalIdBundle[1];
const festivalName = document.getElementById("festivalName");
const festivalType = document.getElementById("festivalType");
const festivalTransport = document.getElementById("festivalTransport");
const festivalPrice = document.getElementById("festivalPrice");
const festivalMaxPersons = document.getElementById("festivalMaxPersons");
const festivalDescription = document.getElementById("festivalDescription");

// Ikonice za tip festivala
const TIP = {
  Muzički:
    '<svg xmlns="http://www.w3.org/2000/svg" height="2em" fill="currentColor" class="bi bi-music-note-beamed pe-2" viewBox="0 0 16 16"><path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2"></path><path fill-rule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z"></path><path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z"></path></svg>',
  Umetnički:
    '<svg xmlns="http://www.w3.org/2000/svg" height="2em" fill="currentColor" class="bi bi-brush pe-2" viewBox="0 0 16 16"><path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04"></path></svg>',
  Filmski:
    '<svg xmlns="http://www.w3.org/2000/svg" height="2em" fill="currentColor" class="bi bi-ticket-perforated pe-2" viewBox="0 0 16 16"><path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z"></path><path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3 .5.5 0 0 0 .5-.5V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z"></path></svg>',
  Gastronomski:
    '<svg xmlns="http://www.w3.org/2000/svg" height="2em" fill="currentColor" class="bi bi-cake2 pe-2" viewBox="0 0 16 16"><path d="m3.494.013-.595.79A.747.747 0 0 0 3 1.814v2.683q-.224.051-.432.107c-.702.187-1.305.418-1.745',
  Edukativni:
    '<svg xmlns="http://www.w3.org/2000/svg" height="2em" fill="currentColor" class="bi bi-book pe-2" viewBox="0 0 16 16"><path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"></path></svg>',
};
const festivalTypeIconContainer = document.getElementById(
  "festivalTypeIconContainer"
);
//

// Ikonice za prevoz
const PREVOZ = {
  Sopstveni:
    '<svg xmlns="http://www.w3.org/2000/svg" height="2em" fill="currentColor" class="bi bi-signpost-split pe-2" viewBox="0 0 16 16"><path d="M7 7V1.414a1 1 0 0 1 2 0V2h5a1 1 0 0 1 .8.4l.975 1.3a.5.5 0 0 1 0 .6L14.8 5.6a1 1 0 0 1-.8.4H9v10H7v-5H2a1 1 0 0 1-.8-.4L.225 9.3a.5.5 0 0 1 0-.6L1.2 7.4A1 1 0 0 1 2 7zm1 3V8H2l-.75 1L2 10zm0-5h6l.75-1L14 3H8z"></path></svg>',
  Avion:
    '<svg xmlns="http://www.w3.org/2000/svg" height="2em" fill="currentColor" class="bi bi-airplane pe-2" viewBox="0 0 16 16"><path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849m.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1s-.458.158-.678.599"></path></svg>',
  Autobus:
    '<svg xmlns="http://www.w3.org/2000/svg" height="2em" fill="currentColor" class="bi bi-bus-front pe-2" viewBox="0 0 16 16"><path d="M5 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0m8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-6-1a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2zm1-6c-1.876 0-3.426.109-4.552.226A.5.5 0 0 0 3 4.723v3.554a.5.5 0 0 0 .448.497C4.574 8.891 6.124 9 8 9s3.426-.109 4.552-.226A.5.5 0 0 0 13 8.277V4.723a.5.5 0 0 0-.448-.497A44 44 0 0 0 8 4m0-1c-1.837 0-3.353.107-4.448.22a.5.5 0 1 1-.104-.994A44 44 0 0 1 8 2c1.876 0 3.426.109 4.552.226a.5.5 0 1 1-.104.994A43 43 0 0 0 8 3"></path><path d="M15 8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1V2.64c0-1.188-.845-2.232-2.064-2.372A44 44 0 0 0 8 0C5.9 0 4.208.136 3.064.268 1.845.408 1 1.452 1 2.64V4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v3.5c0 .818.393 1.544 1 2v2a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5V14h6v1.5a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-2c.607-.456 1-1.182 1-2zM8 1c2.056 0 3.71.134 4.822.261.676.078 1.178.66 1.178 1.379v8.86a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 11.5V2.64c0-.72.502-1.301 1.178-1.379A43 43 0 0 1 8 1"></path></svg>',
};
const festivalTransportIconContainer = document.getElementById(
  "festivalTransportIconContainer"
);
//

getFestivalInfo();

function getFestivalId() {
  let params = new URLSearchParams(window.location.search);
  let festivalId = params.get("festivalId");
  let festivalsId = params.get("festivalsId");
  console.log(festivalId);
  console.log(festivalsId);
  return [festivalId, festivalsId];
}

function getFestivalInfo() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        let festival = JSON.parse(request.responseText);
        console.log(festival);

        festivalName.innerHTML = festival.naziv;
        festivalType.innerHTML = festival.tip;
        console.log(festival.tip);
        console.log(TIP[festival.tip]);
        festivalTypeIconContainer.innerHTML = TIP[festival.tip];
        festivalTransport.innerHTML = festival.prevoz;
        console.log(festival.prevoz);
        console.log(PREVOZ[festival.prevoz]);
        festivalTransportIconContainer.innerHTML = PREVOZ[festival.prevoz];
        festivalPrice.innerHTML = festival.cena;
        festivalMaxPersons.innerHTML = festival.maxOsoba;
        festivalDescription.innerHTML = festival.opis;

        // <div class="carousel-item active ratio ratio-4x3">
        //     <img
        //         src="https://i.imgur.com/nIhAjPQ.jpeg"
        //         class="d-block w-100 rounded-3"
        //         style="object-fit: cover; height: 100%"
        //     />
        // </div>

        const festivalPictures = festival.slike;
        const picturesCarouselContainer = document.getElementById(
          "picturesCarouselContainer"
        );
        let activeStatus = "active";
        for (let index in festivalPictures) {
          let pictureLink = festivalPictures[index];
          console.log(pictureLink);
          picturesCarouselContainer.innerHTML += `
            <div class="carousel-item ${activeStatus} ratio ratio-4x3">
                <img
                src="${pictureLink}"
                class="d-block w-100 rounded-3"
                style="object-fit: cover; height: 100%"
                />
            </div>`;
          activeStatus = "";
        }
      } else {
        window.location.href = "greska.html?error=" + this.status;
      }
    }
  };
  request.open(
    "GET",
    `${fireBaseUrl}festivali/${festivalsId}/${festivalId}.json`
  );
  request.send();
}
