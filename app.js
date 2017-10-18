var prepopulateRegions = function(countries) {
  var regionArray = [];
    countries.forEach(function(country) {
      if (!regionArray.includes(country.region)) {
        regionArray.push(country.region);
      }
    })
    addRegionsToSelect(regionArray);
}

var addRegionsToSelect = function(regions) {
  var dropList = document.getElementById("load-region")

  regions.forEach(function(region){
    var option = document.createElement("option")
    option.innerText = region;
    dropList.appendChild(option);
  })
}

var addCountriesToSelect = function(countries) {
  var dropDown = document.getElementById("load-country")

  while(dropDown.firstChild){dropDown.removeChild(dropDown.firstChild)}

  var chooseField = document.createElement("option")
  chooseField.disabled = true;
  chooseField.selected = true;
  chooseField.innerText = "Choose a country";
  dropDown.appendChild(chooseField);

  countries.forEach(function(country){
    var option = document.createElement("option")
    option.innerText = country.name ;
    dropDown.appendChild(option);
  })
}

var loadRegion = document.getElementById("load-region")
loadRegion.addEventListener("change", function() {
  var regionName = loadRegion.value;
  filterCountrySelect(regionName);
})

var filterCountrySelect = function(regionName) {
  var countriesInRegion = [];
  var url = "https://restcountries.eu/rest/v2/all";
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", function() {
    var countries = JSON.parse(this.responseText);
    countries.forEach(function(country) {
      if(country.region === regionName) {
        countriesInRegion.push(country)
      }
    })
    addCountriesToSelect(countriesInRegion);
  })
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
    displayCountryDetails(country);
  })
  request.send();
}

var displayCountryDetails = function(country) {
  var ul = document.getElementById("country")
  while(ul.firstChild) { ul.removeChild(ul.firstChild) }

  var div = document.getElementById("bordering")
  while(div.firstChild){div.removeChild(div.firstChild)}

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
  code.forEach(function(bordering){
    var url = "https://restcountries.eu/rest/v2/alpha/"+ bordering;
    var request = new XMLHttpRequest();
    request.open("GET", url);

    request.addEventListener("load", function() {
      var country = JSON.parse(this.responseText);

      displayBordering(country);
    })
    request.send()
  })
}

var displayBordering = function(country) {
  var div = document.getElementById("bordering")
  var ol = document.createElement("ol")
  var name = document.createElement("li");
  var capital = document.createElement("li");
  var population = document.createElement("li");

  name.innerText = country.name;
  ol.appendChild(name);

  capital.innerText = country.capital;
  ol.appendChild(capital);

  population.innerText = country.population;
  ol.appendChild(population);
  div.appendChild(ol);
}

var prePopulateCountryList = function() {
  var url = "https://restcountries.eu/rest/v2/all";
  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", function() {
    var countries = JSON.parse(this.responseText);
    addCountriesToSelect(countries);
    prepopulateRegions(countries);

  });

  request.send();
  reloadLastCountry();

}

window.addEventListener("load", this.prePopulateCountryList);
