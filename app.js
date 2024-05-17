const loadPlayers = () => {
    const searchValue = document.getElementById('search-input').value;
    // document.getElementById("players-area").innerHTML = '';
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${searchValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.player)
            displayPlayer(data.player)
        })
    document.getElementById('search-input').value = ''
}

const displayPlayer = (data) => {
    // console.log(data[)
    document.getElementById('players-area').innerHTML = ''
    const showPlayer = document.getElementById('players-area')
    if (data == null) {
        document.getElementById('error').innerHTML = 'No Player found :('
    }
    else {
        data.forEach(player => {
            const div = document.createElement('div')
            div.textContent = ''
            div.innerHTML = `
            <div class="card col-lg-3 col-sm-12" style="width: 300px">
                <img src=${player.strThumb} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${player.strPlayer}</h5>
                    <p class="card-text">Nationality: ${player.strNationality}</p>
                    <p class="card-text">Team: ${player.strTeam}</p>
                    <p class="card-text">Game: ${player.strSport}</p>
                    <p class="card-text">Salary: ${player.strWage}</p>
                    <p class="card-text">Salary: ${player.strGender}</p>
                    <p class="card-text">${player.strDescriptionEN.slice(0, 80)}...</p>
                    <button onclick="addToGroup('${player.strPlayer}')" class="btn btn-primary">Add to group</button>
                    <button onclick="displayPlayerDetails('${player.idPlayer}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    See Details</button>
                </div>
            </div>
            `
            showPlayer.appendChild(div)
        });
    }
}

const displayPlayerDetails = (id) => {
    // document.getElementById('player-details').innerHTML = ''
    const container = document.getElementById('modal-body')
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.players.forEach(details => {
                const div = document.createElement('div')
                div.textContent = ''
                div.innerHTML = `
                <div>
                <div>
                    <img class="w-50 mx-auto rounded m-3" src=${details.strThumb} alt="">
                </div>
                <div>
                    <h3>Name: ${details.strPlayer}</h3>
                    <p>Date of birth: ${details.dateBorn}</p>
                    <p>Place of birth: ${details.strBirthLocation}</p>
                    <p>Height: ${details.strHeight}</p>
                    <p>Weight: ${details.strWeight}</p>
                    <p><i class="fa-brands fa-facebook"></i> <i class="fa-brands fa-square-instagram"></i></p>
                    <p>${details.strDescriptionEN}</p>
                </div>
            </div>
                `
                container.appendChild(div)
            })
        })
    container.innerHTML = ''

}


const addToGroup = (name) => {
    const container = document.getElementById("group-container")
    const PlayerNames = []
    PlayerNames.push(name)
    console.log(PlayerNames)
    document.getElementById('player-count').innerHTML = PlayerNames.length;
    const div = document.createElement("div")
    div.innerHTML = `
    <p>${name}</p>
    `
    container.appendChild(div)

}