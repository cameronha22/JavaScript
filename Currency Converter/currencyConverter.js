//euro to usd
function euroToUs(){
  let x = document.getElementById("numberInput").value;
  let convertedNumber = (x * .97);
  document.getElementById("result").innerHTML += "$" + convertedNumber.toFixed();

}

//usd to euro
function usToEur(){
  let x = document.getElementById("usdInput").value;
  let convertedNumber2 = (x / .97);
  document.getElementById("euros").innerHTML += convertedNumber2.toFixed() + " euros";
}


