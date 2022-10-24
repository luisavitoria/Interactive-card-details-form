
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

// INPUTS MASKS
let cardCVCMask= new IMask($inputCardCVC, {
    mask: '000'
})

let monthMask = new IMask($inputCardMonth, {
    mask: IMask.MaskedRange,
    from: 01,
    to: 12

})

let yearMask = new IMask($inputCardYear, {
    mask: '00'
})

let cardNumberMask = new IMask($inputCardNumber, {
    mask: '**** **** **** ****'
})

let cardNameMask = new IMask($inputCardName, {
    mask: /^\D+$/
})

//ADD EVENTS
$inputs.forEach(input => {
    input.addEventListener('keyup', updateCardDetails)
})

$inputs.forEach(input => {
    input.addEventListener('click', removeClassInputError)
})

btnConfirm.addEventListener('click', handleSubmit)

btnConfirm.addEventListener('click', checkFillInputs)



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
    let hasEmptyInputs = checkEmptyInputs()
    let hasValidCardNumber = checkCardNumberInput($inputCardNumber)
    let hasValidMonth = checkMonthInput($inputCardMonth)
    let hasValidYear = checkYearInput($inputCardYear)
    let hasValidCVC = checkCVCInput($inputCardCVC)

    if(!hasEmptyInputs && hasValidCardNumber && hasValidMonth && hasValidYear) {
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

// CHECK FIELDS INPUT

function checkCardNumberInput(cardNumber) {
    hideErrorInvalidCardNumber()

    let isValidCardNumber = hasValidCardNumber(cardNumber)
    if(cardNumber.value !== "" && !isValidCardNumber) {
        showErrorInvalidCardNumber()
        addClassInputError([cardNumber])
    }else if(cardNumber.value!== "" && isValidCardNumber) {
        hideErrorInvalidCardNumber()
    }

    return isValidCardNumber
}

function hasValidCardNumber(cardNumber) {
    let regex = new RegExp('\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}', 'gi')

    return regex.test(cardNumber.value)
}

function showErrorInvalidCardNumber() {
    msgErrorInvalidCardNumber.style.display = "block"
}

function hideErrorInvalidCardNumber() {
    msgErrorInvalidCardNumber.style.display = 'none'
}

function checkMonthInput(month) {
    let regex = new RegExp('\\d{2}')
    if(!regex.test(month.value)) {
        addClassInputError([month])
    }

    return regex.test(month.value)
}

function checkYearInput(year) {
    let regex = new RegExp('\\d{2}')

    if(!regex.test(year.value)) {
        addClassInputError([year])
    }
    return regex.test(year.value)
}

function checkCVCInput(cvc) {
    let regex = new RegExp('\\d{3}')

    if(!regex.test(cvc.value)) {
        addClassInputError([cvc])
    }
    return regex.test(cvc.value)
}

