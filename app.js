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
        document.getElementById('error').innerHTML = ''
        data.forEach(player => {
            const div = document.createElement('div')
            div.className = 'col-lg-4 col-sm-12 mb-2'
            div.textContent = ''
            div.innerHTML = `
            <div class="card col-lg-3 col-sm-12" style="width: 300px">
                <img src=${player.strThumb ? player.strThumb : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCkmf7FpDslETRiDBiFKDPLbrxFM-wqisohQ&s"} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${player.strPlayer}</h5>
                    <p class="card-text">Nationality: ${player.strNationality}</p>
                    <p class="card-text">Team: ${player.strTeam}</p>
                    <p class="card-text">Game: ${player.strSport}</p>
                    <p class="card-text">Salary: ${player.strWage}</p>
                    <p class="card-text">Salary: ${player.strGender}</p>
                    <p class="card-text">${player?.strDescriptionEN?.slice(0, 80)}...</p>
                    <button onclick="addToGroup('${player.strThumb}', '${player.strPlayer}')" class="btn btn-primary">Add to group</button>
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
                    <img class="w-50 mx-auto rounded m-3" src=${details.strThumb ? details.strThumb : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCkmf7FpDslETRiDBiFKDPLbrxFM-wqisohQ&s"} alt="">
                </div>
                <div>
                    <h3>Name: ${details.strPlayer}</h3>
                    <p>Date of birth: ${details.dateBorn}</p>
                    <p>Place of birth: ${details.strBirthLocation}</p>
                    <p>Height: ${details.strHeight}</p>
                    <p>Weight: ${details.strWeight}</p>
                    <p></p>
                    <p> <a href=${details.strFacebook} ><i class="fa-brands fa-facebook"></i></a> <a href=${details.strInstagram}><i class="fa-brands fa-square-instagram"></i></a> </p>
                    <p>${details.strDescriptionEN}</p>
                </div>
            </div>
                `
                container.appendChild(div)
            })
        })
    container.innerHTML = ''

}


const PlayerNames = []
const addToGroup = (img, name) => {
    const container = document.getElementById("group-container")
    PlayerNames.push(name)
    if(PlayerNames.length > 11){
        alert('Player limit exists')
    }
    else {
        document.getElementById('player-count').innerHTML = PlayerNames.length;
        const div = document.createElement("div")
        div.className = 'd-flex align-items-center bg-body-secondary my-2 px-2 py-2 rounded'
        div.innerHTML = `
        <img src=${img ? img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCkmf7FpDslETRiDBiFKDPLbrxFM-wqisohQ&s'} class="card-img-top w-25" style="border-radius: 50px" alt="...">
        <p class="d-flex align-items-center px-1 w-50" style="border-radius: 5px">${name}</p>
        `
        container.appendChild(div)
    }

}


const displayRandomPlayers = () => {
    let container = document.getElementById("players-area")
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=b`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data?.player?.forEach(player => {
            const div = document.createElement('div')
            div.className = 'col-lg-4 col-sm-12 mb-2'
            div.textContent = ''
            div.innerHTML = `
            <div class="card col-lg-3 col-sm-12" style="width: 300px">
                <img src=${player.strThumb ? player.strThumb : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCkmf7FpDslETRiDBiFKDPLbrxFM-wqisohQ&s"} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${player.strPlayer}</h5>
                    <p>Nationality: ${player.strNationality}</p>
                    <p>Team: ${player.strTeam}</p>
                    <p>Game: ${player.strSport}</p>
                    <p>Salary: ${player.strWage}</p>
                    <p>Salary: ${player.strGender}</p>
                    <p>${player?.strDescriptionEN?.slice(0, 80)}...</p>
                    <button onclick="addToGroup('${player.strThumb}', '${player.strPlayer}')" class="btn btn-primary">Add to group</button>
                    <button onclick="displayPlayerDetails('${player.idPlayer}')" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    See Details</button>
                </div>
            </div>
            `
            container.appendChild(div)
        })
    })
}

displayRandomPlayers()