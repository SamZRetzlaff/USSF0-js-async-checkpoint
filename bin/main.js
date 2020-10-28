#!/usr/bin/env node
const fetch = require('node-fetch');
const fs = require('fs');

let poke_input = fs.readFileSync('bin/input.txt', 'utf8')
poke_input = poke_input.replace(/(\r)/gm, '')   //carriage return; replacing character return with an empty string
let poke_input_array = poke_input.split('\n')  //split up text file input by new line

poke_input_array = poke_input_array.map(entry => entry.toLowerCase()); //changes all text to be lower case in the array. API only takes lowercase
async function read_pokemon_data(name){
    await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(data => data.json())
    .then(data => {
        console.log(name[0].toUpperCase() + name.substring(1) +';' + data.types.map(element => element.type.name).join(', '))
    })
    .catch(err => console.log(err))
}
poke_input_array.forEach(entry => read_pokemon_data(entry))

