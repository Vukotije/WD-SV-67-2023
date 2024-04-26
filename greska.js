let errorMessage = document.getElementById("errorMessage");

let errorCode = getErrorCode();
errorMessage.innerHTML = "Error " + errorCode;

function getErrorCode() {
  let params = new URLSearchParams(window.location.search);
  let error = params.get("error");
  console.log(error);
  return error;
}
