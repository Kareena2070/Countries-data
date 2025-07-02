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

    #search{
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

`;
document.head.appendChild(style);

let navDiv = document.createElement("div")
navDiv.className = "navbar"
navDiv.innerHTML =`
<h1>World Countries Data</h1>
<p> Currently, we have 250 Countries</p>
<p id="result-msg"></p>
`;

body.appendChild(navDiv)


let searchContainer = document.createElement("div")
searchContainer.id = "search-container"
searchContainer.innerHTML =`
        <div>
            <input type="text" id="search" placeholder="Search by name, capital or language">
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
body.appendChild(countriesContainer)

