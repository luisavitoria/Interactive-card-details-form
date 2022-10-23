
// INPUTS
let $inputs = Array.from(document.querySelectorAll('input'))
let $inputCardName = document.querySelector('[data-js="input-card-name"]')
let $inputCardNumber = document.querySelector('[data-js="input-card-number"]')
let $inputCardMonth = document.querySelector('[data-js="input-card-month"]')
let $inputCardYear = document.querySelector('[data-js="input-card-year"]')
let $inputCardCVC = document.querySelector('[data-js="input-card-cvc"]')


//CARD DETAILS
let cardFrontName = document.querySelector('[data-js="card-front-name"]')
let cardFrontNumber = document.querySelector('[data-js="card-front-number"]')
let cardFrontMonth = document.querySelector('[data-js="card-front-month"]')
let cardFrontYear = document.querySelector('[data-js="card-front-year"]')
let cardBackCVC = document.querySelector('[data-js="card-back-cvc"]')
let msgErrorInvalidCardNumber = document.querySelector('.msg-wrong-format-error')
let form = document.querySelector('[data-js="form"]')
let divComplete= document.querySelector('[data-js="div-complete"]')
let btnConfirm = document.querySelector('[data-js="btn-confirm"]')

$inputs.forEach(input => {
    input.addEventListener('keyup', updateCardDetails)
})

$inputs.forEach(input => {
    input.addEventListener('click', removeClassInputError)
})

btnConfirm.addEventListener('click', handleSubmit)

function updateCardDetails() {
    const inputType = this.dataset.js

    switch(inputType) {
        case "input-card-name":
            cardFrontName.innerHTML = this.value
            break
        case "input-card-number":
            cardFrontNumber.innerHTML = this.value
            break
        case "input-card-month":
            cardFrontMonth.innerHTML = this.value
            break
        case "input-card-year":
            cardFrontYear.innerHTML = this.value
            break
        default:
            cardBackCVC.innerHTML = this.value
    }
}

function handleSubmit() {
    checkFillInputs()
    let hasEmptyInputs = checkEmptyInputs()
    let hasInvalidCardNumber = checkCardNumberInput($inputCardNumber)

    if(!hasEmptyInputs && !hasInvalidCardNumber) {
        form.style.display = 'none'
        divComplete.style.display = 'flex'
        console.log('tese')
    }

}

function checkFillInputs() {
    let fillInputs = $inputs.filter(input => input.value !== ""
    )
    if(fillInputs.length > 0) addOrRemoveEmptyErrorMessage(fillInputs, 'remove')
}



function checkEmptyInputs() {
    let emptyInputs = $inputs.filter(input => input.value === ""
    )

    if(emptyInputs.length > 0) showErrorEmptyInputs(emptyInputs)
    
    return emptyInputs.length !== 0
}

function checkIfInputHasErrorClass(inputs) {
    return inputs.filter(input => {
        return !input.classList.contains('input-error')
    })
}


function showErrorEmptyInputs(inputs) {
    let inputsWithoutError = checkIfInputHasErrorClass(inputs)

    if(inputsWithoutError.length > 0) {
        addClassInputError(inputsWithoutError)
        addOrRemoveEmptyErrorMessage(inputsWithoutError, 'add')
    } 
}


function addOrRemoveEmptyErrorMessage(inputs, action) {
    let newDisplay = action === 'add' ? 'block' : 'none'

    if(hasMonthInput(inputs)) {
        $inputCardMonth.parentNode.lastElementChild.style.display = newDisplay

        inputs = inputsWithoutMonthInput(inputs)

        inputs.forEach(input => {
            input.nextElementSibling.style.display = newDisplay
        })
    }else {
        inputs.forEach(input => {
            input.nextElementSibling.style.display = newDisplay
        })
    }
}

function hasMonthInput(inputs) {
    return inputs.some(input => input.dataset.js === "input-card-month")
}

function inputsWithoutMonthInput(inputs) {
    let indexMonthInput = inputs.findIndex(input => input.dataset.js === "input-card-month")

    inputs.splice(indexMonthInput, 1)
    return inputs
}


function addClassInputError(inputs) {
    inputs.forEach(input => input.classList.add('input-error'))
}

function removeClassInputError() {
    this.classList.remove('input-error')
}


// CHECK CARD NUMBER INPUT

function checkCardNumberInput(cardNumber) {
    hideErrorInvalidCardNumber()

    let invalidCardNumber = hasInvalidCardNumber(cardNumber)
    if(cardNumber.value !== "" && invalidCardNumber) {
        showErrorInvalidCardNumber()
        addClassInputError([cardNumber])
    } 

    return invalidCardNumber
}

function hasInvalidCardNumber(cardNumber) {
    let regex = new RegExp('[^\\d\\s]', 'gi')

    return regex.test(cardNumber.value)
}

function showErrorInvalidCardNumber() {
    msgErrorInvalidCardNumber.style.display = "block"
}

function hideErrorInvalidCardNumber() {
    msgErrorInvalidCardNumber.style.display = 'none'
}

