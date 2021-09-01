const cardRow = document.getElementById("card-row");
const teamDetails = document.getElementById("sports-details");

const searchTeam = () => {
  cardRow.innerHTML = `
    <div class="spinner-border text-primary mx-auto" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
    `;
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;

  //Search Data
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchValue}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTeam(data));
};

const displayTeam = (data) => {
  const teams = data.teams;
  cardRow.textContent = "";

  teams.forEach((team) => {
    console.log(team);

    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div onclick="TeamData('${team.idTeam}')" class="card">
        <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${team.strTeam}</h5>
            <p class="card-text">${team.strAlternate}...</p>
        </div>
        </div>
    `;
    cardRow.appendChild(div);
  });
};

const TeamData = (team) => {
  console.log(team);
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${team}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadTeamDetails(data));
};

const loadTeamDetails = (teamData) => {
    
  cardRow.textContent = "";
    const team = teamData.teams[0];
    console.log(team);

    const div = document.createElement("div");
    div.classList.add("col");
    div.classList.add("mx-auto");
    div.innerHTML = `
        <div class="card">
        <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${team.strTeam}</h5>
            <p class="card-text">${team.strAlternate}...</p>
            <p class="card-text">${team.strDescriptionEN}...</p>
        </div>
        </div>
    `;
    cardRow.appendChild(div);
};
