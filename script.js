const container = document.getElementById("countries-container");
const searchInput = document.getElementById("search");

// Function to create country cards
function displayCountries(countries) {
  container.innerHTML = ""; 
  countries.forEach(country => {
    const div = document.createElement("div");
    div.style.background = "white";
    div.style.width = "15em";
    div.style.padding = "1em";
    div.innerHTML = `
      <img src="${country.flag}" width="150">
      <h3>${country.name.toUpperCase()}</h3>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Languages:</strong> ${country.languages.join(", ")}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Area:</strong> ${country.area}</p>
    `;
    container.appendChild(div);
  });
}

// calling the display function with the initial data
displayCountries(countries);



const resultMsg = document.getElementById("result-msg");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();

  if (keyword === "") {
    resultMsg.textContent = "";
    displayCountries(countries);       // show all countries again
    return; // stop here
  }

  const filtered = countries.filter(country =>
    country.name.toLowerCase().includes(keyword)
  );

  resultMsg.textContent = `${filtered.length} countries satisfied the search criteria`;
  displayCountries(filtered);

});



// Draw graph for top 10 population
const maxPopulation = Math.max(...countries.map(d => d.population));
const chart = document.getElementById("chart");

countries.forEach(item => {
  const bar = document.createElement("div");
  bar.style.width = (item.population / maxPopulation * 100) + "%";
  bar.style.background = "skyblue";
  bar.style.margin = "5px 0";
  bar.style.padding = "10px";
  bar.style.display = "flex";
  bar.style.justifyContent = "space-between";
  bar.textContent = `${item.country} - ${item.population.toLocaleString()}`;
  chart.appendChild(bar);
});
