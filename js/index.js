// const { create } = require("domain")
let currentPage = 1 
document.addEventListener('DOMContentLoaded', () => {
    
    getMonsters()
    createMonster()
    buttonListeners()
})

//get mosters on current page 
function getMonsters(page=1) {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(monsters => displayMonsters(monsters)) 
}

function displayMonsters(monsters) {
 let monsterContainer = document.getElementById('monster-container')
 clearMonsterContainer(monsterContainer)
  monsters.forEach(monster => { 
    let monsterDiv = document.createElement('div')
    let monsterName = document.createElement('h2')
    let monsterAge = document.createElement('h4')
    let monsterBio = document.createElement('p')

    monsterName.textContent = monster.name
    monsterAge.textContent = `Age: ${monster.age}` 
    monsterBio.textContent = `Bio: ${monster.description}` 

    monsterDiv.append(monsterName, monsterAge, monsterBio)
    monsterContainer.appendChild(monsterDiv)
})
}

function createMonster(e) {
    let createContainer = document.getElementById('create-monster')
    let monsterForm = document.createElement('form')
    let nameInput = document.createElement('input')
    let ageInput = document.createElement('input')
    let bioInput = document.createElement('input')
    let submit = document.createElement('submit')
    let createBtn = document.createElement('button')
    createBtn.textContent = "Create"
    
    //set attributes for inputs
    nameInput.value = ""
    nameInput.id = 'name'
    ageInput.value = ""
    ageInput.id = 'age'
    bioInput.value = ""
    bioInput.id = 'bio'

    // display create form to screen 
    submit.appendChild(createBtn)
    monsterForm.append(nameInput,ageInput, bioInput, createBtn)
    createContainer.appendChild(monsterForm)
    
    // event listener for form submit
    monsterForm.addEventListener('submit', (e) => {
        postMonsters(e)
    })

}

function postMonsters(e) {
    e.preventDefault()
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers:
        {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }, 
        body: JSON.stringify(
        {
            name: e.target.name.value,    
            age: e.target.age.value,
            bio: e.target.bio.value 
        })
    })
}



function clearMonsterContainer(container) {
    while(container.firstElementChild){
        container.firstElementChild.remove();
    }
}

function renderNextPage() {
    currentPage++;
    getMonsters(currentPage);
}

function renderPreviousPage(){
    if (currentPage > 1)
    { currentPage--; }
    getMonsters(currentPage);
}

function buttonListeners() {
    const fwdBtn = document.getElementById('forward');
    const backBtn = document.getElementById('back');
    fwdBtn.addEventListener('click', renderNextPage);
    backBtn.addEventListener('click', renderPreviousPage);
}