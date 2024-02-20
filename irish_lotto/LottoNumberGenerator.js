//pick 6 lotto numbers and
//a bonus number

//avoid duplicates

//sort in ascending order

var numbers = []

function pickNumber (){
    let randomNumber = Math.floor(Math.random() * 47) + 1
    return randomNumber;

}

function isDuplicateNumber(pickedNumber){
    let isDuplicate = false
    if(numbers.indexOf(pickedNumber) !== -1){
        isDuplicate = true;
    }
    return isDuplicate
}

function pickBonusNumber(){
    let bonusNumber = pickNumber()

    while (isDuplicateNumber(bonusNumber)){
        bonusNumber = pickNumber;
    }
    return bonusNumber;
}

//fill the number array
while(numbers.length <6){
    let newNumber = pickNumber();
    if(!isDuplicateNumber(newNumber)){
        numbers.push(newNumber);
    }
}

let bonusNumber = pickBonusNumber();
var mainNumbers = document.getElementById('mainNumbers').innerHTML = "These are the winning numbers: " + numbers ;

var changeContent = document.getElementById('myParagraph').innerHTML = "This is the bonus number: " + bonusNumber;
