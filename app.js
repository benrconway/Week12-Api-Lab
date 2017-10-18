var addCountriesToSelect = function(countries) {
  var dropDown = document.getElementById("load-country")

  countries.forEach(function(country){
    var option = document.createElement("option")
    option.innerText = country.name ;
    dropDown.appendChild(option);
  })
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
  ul.appendChild(name);

  capital.innerText = country[0].capital;
  ul.appendChild(capital);

  population.innerText = country[0].population;
  ul.appendChild(population);
  save(country)

    borderingCountries(country[0].borders)
}

var save = function(itemToSave){
  var jsonString = JSON.stringify(itemToSave);
  localStorage.setItem("country", jsonString);
}

var reloadLastCountry = function () {
 var jsonString = JSON.parse(localStorage.getItem("country"));
 displayCountryDetails(jsonString)

}


var borderingCountries = function(code){
  // console.dir(code);
  code.forEach(function(bordering){
    var url = "https://restcountries.eu/rest/v2/alpha/"+ bordering;
    var request = new XMLHttpRequest();
    console.log("We're sending a request");
    request.open("GET", url);

    request.addEventListener("load", function() {
      var country = JSON.parse(this.responseText);
      console.log("This is a country!",country);
    })

    request.send()
  })
  // var url = "https://restcountries.eu/rest/v2/alpha/"+ code;
  // var request = new XMLHttpRequest();
  //
  // request.open("GET", url);
  //
  // request.addEventListener("load", function() {
  //   var country = JSON.parse(this.responseText);
  //   displayBordering(country);
// })

}

var displayBordering = function(country) {
  var ul = document.getElementById("country")

  var name = document.createElement("li");
  var capital = document.createElement("li");
  var population = document.createElement("li");

  name.innerText = country[0].name;
  ul.appendChild(name);

  capital.innerText = country[0].capital;
  ul.appendChild(capital);

  population.innerText = country[0].population;
  ul.appendChild(population);
}

var prePopulateCountryList = function() {
  var url = "https://restcountries.eu/rest/v2/all";
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", function() {
    var countries = JSON.parse(this.responseText);
    addCountriesToSelect(countries);

  });

  request.send();
  reloadLastCountry();

}

window.addEventListener("load", this.prePopulateCountryList);







//
// var buttonClear = document.getElementById("clear")
// buttonClear.addEventListener("click", function() {
//   var ul = document.getElementById("countries")
//   ul.innerHTML = "";
//   //while (ul.firstChild) {
//   // ul.removeChild(ul.firstChild)
//   // }
// })
