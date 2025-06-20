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
    renderChart(countries);                 // show top 10 from all countries
    return; // stop here
  }
});


const name1 = document.getElementById("name")
const capital = document.getElementById("capital")
const population = document.getElementById("population")
// const graph = document.getElementById("graph")

// each button are click able 

name1.addEventListener("click",()=>{
  const keyword = searchInput.value.toLowerCase();

  const filtered = countries.filter(country =>
    country.name.toLowerCase().includes(keyword)
  );

  resultMsg.textContent = `${filtered.length} countries satisfied the search criteria`;
  displayCountries(filtered);
  renderChart(filtered); // call with filtered data 

})


capital.addEventListener("click", () => {
  const keyword = searchInput.value.toLowerCase();

  const filtered = countries.filter(country =>
    country.capital && country.capital.toLowerCase().includes(keyword)
  );

  resultMsg.textContent = `${filtered.length} countries satisfied the search criteria`;
  displayCountries(filtered);
  renderChart(filtered); // call with filtered data

});


population.addEventListener("click", ()=>{
  const keyword = Number(searchInput.value);

  const filtered = countries.filter(country =>
    country.population <= keyword
  );

  resultMsg.textContent = `${filtered.length} countries satisfied the search criteria`;
  displayCountries(filtered);
  renderChart(filtered); // ✅ call with filtered data
})

graph.addEventListener("click", ()=>{
  renderChart(countries)
  document.getElementById("myChart").scrollIntoView({
    behavior: "smooth"
  });
})



let chartDiv = document.createElement("div")
chartDiv.style.paddingLeft = "20em"
chartDiv.style.paddingRight = "21em"
chartDiv.style.paddingTop = "4em"
chartDiv.style.paddingBottom ="2em"
chartDiv.style.backgroundColor = "#fefae0"
container.after(chartDiv)

let canvas = document.createElement("canvas")
canvas.id = "myChart"
canvas.style.border = "0.2rem solid black"
chartDiv.append(canvas)


let chart; // to store Chart instance globally

 
    function renderChart(countriesArray) {
      if (chart) {
        chart.destroy();
      }
    
      let topCountries;
      if (countriesArray.length <= 10) {
        topCountries = [...countriesArray];
      } else {
        topCountries = [...countriesArray].sort((a, b) => b.population - a.population).slice(0, 10);
      }
    
      const labels = topCountries.map(country => country.name);
      const data = topCountries.map(country => country.population);
    

      const ctx = document.getElementById("myChart").getContext("2d");
      // create new chart
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Population',
            backgroundColor: "orange",
            data: data,
            borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => value.toLocaleString()
              }
            }
          }
        }
      });
    }

renderChart(countries); 






