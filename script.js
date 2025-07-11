
let body = document.body
let style = document.createElement("style");
style.innerHTML = `
    *{
        margin: 0;
        padding: 0;
    }

    body {
    font-family: Arial, sans-serif;
    text-align: center;
    background: #f0f0f0;
    cursor: pointer;
  }

    .navbar {
        background: rgb(229, 224, 224);
        height: 8em;
        width: 100%;
        text-align: center;
        padding: 1em;
        font-family: Arial, sans-serif;
    }
    .navbar h1{
        letter-spacing: 0.1em;
        color: orange;
        font-size: 3em;
        margin-top: 0.5em;
        }

    #searchInput{
    width: 50%;
    height: 2em;
    border-radius: 1em;
    padding: 0.5em;
    font-size: 1em;
    margin-top: 2rem;
    border: none;
    
  }

button {
    background-color: #f2882b; 
    border: none;
    padding: 10px 20px;
    font-size: 1.2em;
    margin-top: 1em;
    border-radius: 1em;
    margin-left: 1em;
  }

button:hover {
    background-color: #f9a53e; 
  }
i{
  font-size: 3em;
  color: #f2882b;
  margin-left: 0.5em;
}

#countries-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5em;
    margin-top: 2em;
  }



#result-msg{
  color: #f2882b;
  margin-top: 0.5em;
}

#chart {
  width: 80%;
  margin: 20px auto;
}
.bar {
  background-color: skyblue;
  margin: 5px 0;
  padding: 10px;
  color: black;
  font-weight: bold;
}

.div3{
  background-color: aqua;
}
`;
document.head.appendChild(style);

let navDiv = document.createElement("div")
navDiv.className = "navbar"
navDiv.innerHTML =`
<h1>World Countries Data</h1>
<p> Currently, we have 250 Countries</p>

`;

body.appendChild(navDiv)

resultMsg = document.createElement("p")
resultMsg.id = "result-msg"
navDiv.append(resultMsg)



let searchContainer = document.createElement("div")
searchContainer.id = "search-container"
searchContainer.innerHTML =`
        <div>
            <input type="text" id="searchInput" placeholder="Search by name, capital or language">
        </div>
        <div class="buttons">
            <button id="name">NAME</button>
            <button id="capital">CAPITAL</button>
            <button id="population">POPULATION</button>
            <i id="graph" class="fa-solid fa-chart-simple"></i>
        </div>
    `;
body.appendChild(searchContainer)


let countriesContainer = document.createElement("div")
countriesContainer.id = "countries-container"
body.appendChild(countriesContainer)


// Function to create country cards
function displayCountries(countries) {
  countriesContainer.innerHTML = ""; 
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
    countriesContainer.appendChild(div);
  });
}

// calling the display function with the initial data
displayCountries(countries);

// show numbers of countries according to the user search

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

// Bar graph 

let chartDiv = document.createElement("div")
chartDiv.style.paddingLeft = "20em"
chartDiv.style.paddingRight = "21em"
chartDiv.style.paddingTop = "4em"
chartDiv.style.paddingBottom ="2em"
chartDiv.style.backgroundColor = "#fefae0"
countriesContainer.after(chartDiv)

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






