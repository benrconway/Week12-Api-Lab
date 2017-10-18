var url = "https://restcountries.eu/rest/v2/all";

var addCountriesToSelect = function(countries) {
  var listFrame = document.getElementById("load-country")

  countries.forEach(function(country){
    var option = document.createElement("option")
    option.innerText = country.name ;
    listFrame.appendChild(option);
  })
}

var prePopulateCountryList = function(url) {
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", function() {
    var countries = JSON.parse(this.responseText);
    addCountriesToSelect(countries);

  });

  request.send();

}

var loadSelect = document.getElementById("load-country")
loadSelect.addEventListener("change", function() {
var countryName = loadSelect.value;

makeRequest(countryName);
});

var makeRequest = function (countryName) {
  var queryUrl = "https://restcountries.eu/rest/v2/name/" + countryName.toLowerCase() + "?fullText=true"
  var request = new XMLHttpRequest();
  request.open("GET", queryUrl);

  request.addEventListener("load", function() {
    var country = JSON.parse(this.responseText);
  })
  request.send();
}


window.addEventListener("load", prePopulateCountryList(url));







//
// var buttonClear = document.getElementById("clear")
// buttonClear.addEventListener("click", function() {
//   var ul = document.getElementById("countries")
//   ul.innerHTML = "";
//   //while (ul.firstChild) {
//   // ul.removeChild(ul.firstChild)
//   // }
// })
