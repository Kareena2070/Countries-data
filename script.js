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
    displayCountries(countries);       // show all countries again if keyword not written
    return; // stop here
  }
});


const name1 = document.getElementById("name")
const capital = document.getElementById("capital")
const population = document.getElementById("population")

// each button are click able 

name1.addEventListener("click",()=>{
  const keyword = searchInput.value.toLowerCase();

  const filtered = countries.filter(country =>
    country.name.toLowerCase().includes(keyword)
  );

  resultMsg.textContent = `${filtered.length} countries satisfied the search criteria`;
  displayCountries(filtered);
})


capital.addEventListener("click", () => {
  const keyword = searchInput.value.toLowerCase();

  const filtered = countries.filter(country =>
    country.capital && country.capital.toLowerCase().includes(keyword)
  );

  resultMsg.textContent = `${filtered.length} countries satisfied the search criteria`;
  displayCountries(filtered);
});


population.addEventListener("click", ()=>{
  const keyword = Number(searchInput.value);

  const filtered = countries.filter(country =>
    country.population >= keyword
  );

  resultMsg.textContent = `${filtered.length} countries satisfied the search criteria`;
  displayCountries(filtered);
})


















