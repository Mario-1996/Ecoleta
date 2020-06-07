function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
      
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json())
    .then( cities => {

        for( const city of cities ) {
           
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })   

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//items de coleta
//pegar todos os li
const itemsToCollet = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollet) {
    item.addEventListener("click", handleSelectedItem)
}

const colletedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLI = event.target

    //adicionar ou remover uma class com javascript
    itemLI.classList.toggle("selected")

    const itemId = event.target.dataset.id

   //console.log('ITEM ID: ', itemId)

    //verificar se existem items selecionados, se sim pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso será true or false
        return itemFound
    })

    //se ja estiver selecionado,
    if(alreadySelected >= 0 ) {
        // tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
         //se não estiver selecionado adicionar a selecao
         selectedItems.push(itemId)
    }

    //console.log('selectedItems ', selectedItems)

    //atualizar o campo escondido com os itens selecionados
    colletedItems.value = selectedItems
    
}