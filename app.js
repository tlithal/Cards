//URL for the API

const baseURL = "https://62acffd39fa81d00a7bc1844.mockapi.io";

//Create Card button

let cardButton = document.querySelector('#createCard');

cardButton.addEventListener('click', () => {
    let name = document.querySelector('#cardName');
    let element = document.querySelector('#cardElement');
    let rarity = document.querySelector('#cardRarity');
    let role = document.querySelector('#cardRole');

    Display.createCard(name.value, element.value, rarity.value, role.value);

    name.value = '';
    element.value = '';
    rarity.value = '';
    role.value = '';

    
})

class Card {
    constructor(name, element, rarity, role) {
        this.name = name;
        this.element = element;
        this.rarity = rarity;
        this.role = role;
    }
}

class Display {

    //Array that will hold all the cards that are pulled from the GET request

    static cards;

    //PUT request

    static updateCard(id) {
        for(let card of this.cards) {
            if(card.id == id) {
                let name = document.getElementById(`${id}Name`).value;
                let element = document.getElementById(`${id}Element`).value;
                let rarity = document.getElementById(`${id}Rarity`).value;
                let role = document.getElementById(`${id}Role`).value;

                if(name == '') {
                    name = card.name;
                }
                if(element == '') {
                    element = card.element;
                }
                if(rarity == 'Rarity') {
                    rarity = card.rarity;
                }
                if(role == 'Role') {
                    role = card.role;
                }

                fetch(`${baseURL}/cards/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": name,
                        "element": element,
                        "rarity": rarity,
                        "role": role
                    })
                }).then( res => res.json() )
                  .then( () => this.getAllCards())
            }
        }

    }

    //Delete request

    static deleteCard(id) {
        for(let card of this.cards) {
            if(card.id == id) {
                fetch(`${baseURL}/cards/${id}`, {
                    method: 'DELETE',
                })
                .then(() => this.getAllCards())
            }
        }
    }


    //POST request

    static createCard(name, element, rarity, role) {
       fetch(`${baseURL}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": `${name}`,
            "element": `${element}`,
            "rarity": `${rarity}`,
            "role": `${role}`
        })
    }).then( res => res.json() )
      .then( () => this.getAllCards() )
    }

    //GET Request method

    static getAllCards() {
        fetch(`${baseURL}/cards`)
            .then(res => res.json())
            .then((cards) => this.render(cards))
    }

    //Method that will display all the cards from the get request onto the HTML

    static render(cards) {
        this.cards = cards;
        $('#display').empty();

        for(let card of cards) {
            $('#display').prepend(
                `<div id='${card.id}' class='card text-center'> 
                    <div class='card-header'>
                        <h2>${card.name}</h2>
                        <p>${card.element}
                        <p>${card.rarity}
                        <p>${card.role}
                        <br><br>
                        <button class='btn btn-danger' onclick="Display.deleteCard('${card.id}')">Delete</button>
                    </div>
                    <div class='card-body'>
                        <div class='card'>
                            <div class='row'>
                                <div class='col-sm'>
                                    <input type='text' id="${card.id}Name" class='form-control' placeholder='Card Name'>
                                </div>
                                <div class='col-sm'>
                                    <input type='text' id="${card.id}Element" class='form-control' placeholder='Card Element'>
                                </div>
                            </div><br>
                            <div class='row'>
                                <div class='col-sm'>
                                    <select class="form-select" id="${card.id}Rarity" aria-label="Card Rarity">
                                        <option selected disabled>Rarity</option>
                                        <option value="R">R</option>
                                        <option value="SR">SR</option>
                                        <option value="SSR">SSR</option>
                                        <option value="UR">UR</option>
                                    </select>
                                </div>
                                <div class='col-sm'>
                                    <select class="form-select" id="${card.id}Role" aria-label="Card Role">
                                        <option selected disabled>Role</option>
                                        <option value="Attacker">Attacker</option>
                                        <option value="Defender">Defender</option>
                                        <option value="Supporter">Supporter</option>
                                    </select>
                                </div>
                            </div><br>
                            <button id='${card.id}NewCard' onclick="Display.updateCard('${card.id}')" class='btn btn-primary form-control'>Update</button>
                        </div>
                    </div>
                </div><br>`
            );
        }
    }

}