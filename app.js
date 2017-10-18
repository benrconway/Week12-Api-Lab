var url = "https://restcountries.eu/rest/v2/all";

var addCountriesToSelect = function(countries) {
  var dropDown = document.getElementById("load-country")

  countries.forEach(function(country){
    var option = document.createElement("option")
    option.innerText = country.name ;
    dropDown.appendChild(option);
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
    console.log(country);
    displayCountryDetails(country);
  })
  request.send();
}

var displayCountryDetails = function(country) {
  var ul = document.getElementById("country")

  while(ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }

  var name = document.createElement("li");
  var capital = document.createElement("li");
  var population = document.createElement("li");

  name.innerText = country[0].name;
  capital.innerText = country[0].capital;
  population.innerText = country[0].population;
console.log(name);
  ul.appendChild(name);
  ul.appendChild(capital);
  ul.appendChild(population);
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
