
// query selectors
const billAmount = document.querySelector("#bill-amount");
const cashGiven = document.querySelector("#cash-given");

const errorDiv = document.querySelector(".error-message");

const cashGivenDiv = document.querySelector(".cash-input");
const changeReturnedDiv = document.querySelector(".change-returned");

const output = document.querySelector("#output");

const nextButton = document.querySelector("#next-button");
const checkButton = document.querySelector("#check-button");

const Notes = document.querySelectorAll(".notes");

const notesArray = [2000, 500, 100,  20, 10, 5,1];


//if bill amount is filled, display cash given input field
nextButton.addEventListener('click', ()=>{
    errorHide();
    if(Number(billAmount.value)>0){

        nextButton.style.display = "none";
        cashGivenDiv.style.display = "block";
    }
    else{
        errorShow("Enter valid bill amount, Ae time khoti karu nakaa haan!!");
    }
} )


//check button clicked handler
checkButton.addEventListener('click', ()=>{
    clearNotes();
    errorHide();
    //error handling
    let billAmountValue= Number(billAmount.value);
    let cashGivenValue= Number(cashGiven.value);

    if(billAmountValue>0 && cashGivenValue>0){

        if(!Number.isInteger(cashGivenValue)){
            errorShow("Enter valid amount in cash given field. Asa Kasa Chalel re ? ");
            return;
        }
        if(billAmountValue > cashGivenValue){
            errorShow("Cash is less than bill, please enter right amount. Manje Auur paiisa laane ka re baba Nai toh kal aaneka ! ");
            return;
        }
        //if input valid calculate no. of notes
        calculateNotes(billAmountValue, cashGivenValue);
    } else{
        errorShow("Enter valid bill amount and cash given to continue. Ae Bhai Ae, time khoti karu nakka haan!! ");
        }
})

//to calculate no. of notes
function calculateNotes(bill, cash){
    let returnAmount = cash-bill;
    
    if(returnAmount<1){
        errorShow("No amount should be returned, sab hisaab barabar che!");
        return;
    }
    changeReturnedDiv.style.display = "block";

    for (let i = 0; i < notesArray.length; i++) {
      returnAmount = compare(returnAmount, notesArray[i], i);
    }
    
}

//compare with currency and post the no. of notes on screen
function compare(remainder, noteAmount, index){

    if(remainder >= noteAmount){
        let notes = Math.floor(remainder/noteAmount);
        remainder = remainder - notes*noteAmount;
        Notes[index].innerText = `${notes}`;
    }
    return remainder
}

//if check button clicked without refreshing the page, clear the no of notes values on the screen
function clearNotes(){
    for(let notes of Notes){
        notes.innerText = "";
    }
}

function errorShow(text){
    errorDiv.style.display = "block";
    errorDiv.innerText= text;
    changeReturnedDiv.style.display = "none";
}

function errorHide(){
    errorDiv.style.display = "none";
}
