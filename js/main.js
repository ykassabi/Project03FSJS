//Hello
//the code is devided to section(variables)(function)(name,email,jobrole)(tshirt)(activites)(payment,payment validation)(submition)
//the all variable nBlank*  are used for the submition form. there are false when it was never touch or left empty
let nBlankName = false;
let nBlankEmail = false;
let nBlankActivity = false;
let nBlankPayement = false;
let nBlankCreditCard = false;
let nBlankZip = false;
let nBlankCVV =  false;
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\
//the following variables are used in sections
const fieldSets = document.querySelectorAll("fieldset");//all fieldSets
const name = fieldSets[0].children[2]; // finding the name || Section 1
const email = fieldSets[0].children[4]; //finding email || Section 1
const jobRole = fieldSets[0].children[6];//finding the Job Role || Section 1
const tShirtColor = fieldSets[1].children[3]; // grabing the div#colors-js-puns.|| Section 2
const tShirtDesign = document.querySelector("#design");//fieldSets[1].children[2].lastElementChild || Section 2
const colorsDesign = tShirtColor.lastElementChild; // || Section 1
const activities= document.querySelectorAll(".activities label");// all the activities || Section 3
const conflictList = { 1:3, 3:1, 2:4, 4:2 }; // dictionary for where the conflict happend key/value pairs defin the conflicts.|| Section 3
let sum = 0; //to calculate the total ||Section 3
const allPaymentMethod = fieldSets[3].children[2]; // Section 4 //
const CreditCardPayment = document.querySelector("#credit-card");//Section 4 //
const cc = document.querySelector("#cc-num");// Section 4  //
const zip = document.querySelector("#zip");// Section 4 //
const cvv = document.querySelector("#cvv");// Section 4 //
const form = document.querySelector("form");//Submition
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\
// /// //// ///// ////// /////// //////// functions : regulaExpression and feedback UI  //
//will be applied for the labels only
let borderEngage = function(el,d,msg){
  el.style.borderRight = "4px solid Red";
  document.querySelector("label[for='"+ d +"']").innerHTML = msg +":<span style='color:red;'> !! </span>";
};
let borderDesengage = function(el,d,msg){
  el.style.borderRight = "3px solid green";
  document.querySelector("label[for='"+ d +"']").innerHTML = msg + ":<spanstyle='color:green;'> &radic; </span>";
};
//border for section , will be used in activities and payment.
let borderSectionOn = function(el){
  el.style.borderRight = "4px solid Red";
};
let borderSectionOff = function(el){
  el.style.borderRight = "";
};
//funtion to test User input vs regular expression
regXTest = function(rXpession,value) {
  var re = rXpession;
  return re.test(value);
};
// Section 3 || conflictManager will manage where the conflict happens.. tacking 2 arguments, a letaral object will collect these conflicts, named: conflictList see section 3
function conflictManager(a,b){
  if(activities[a].firstElementChild.checked){
    activities[b].children[0].disabled = true;//will desactivate the checkedbox
    activities[b].style.color = "grey"; // will change the color for the text in the label tag.
  }
  else{ //reverse the effect  of the if condition
    activities[b].children[0].disabled = false; //reactivate the checkbox
    activities[b].style.color = "black"; // coloring text
  }
}
//section 4 to hide all the payement methods
function hideAllPaymentMethods(){
    for(let i = 3 ; i < 6; i++){
    fieldSets[3].children[i].hidden = true;
  }
}
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\
// /// //// ///// ////// /////// //////// ///////// ////////// Section 1 : name - email //

name.focus();//putting the focus on name

fieldSets[0].addEventListener("input", (e) => {
  if(e.target.id == "name"){//
    if(name.value == ""){
       nBlankName = false;
       borderEngage(name, "name", "Name");// (targets boder, css id for label, message to be displayed in the label)
    }
    else {
      nBlankName = true;
      borderDesengage(name,"name","Name");//(targets boder, css id for label, message to be displayed in the label)
    }
  }
  if(e.target.id == "mail"){
    let correctFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let VEmail;
    VEmail = regXTest(correctFormat,(email.value));

    if(email.value == ""){
      borderEngage(email,"mail","Email");
      nBlankEmail = false;
    }
    else if (!VEmail) {
      document.querySelector("label[for='mail']").innerHTML = "Email: <span> 🧐  Please check your email </span>";
      email.style.borderRight = "4px solid Yellow";
      nBlankEmail = false;
    }
    else{
      borderDesengage(email,"mail","Email");
      nBlankEmail = true;
    }
  }
},false);
// //////////////////////////////////////job Role/////////////////////////////// \\
const input = document.createElement("input"); //creating a input field for option other
input.setAttribute("type","text");

jobRole.addEventListener("change", () => {//>>>>>>>>>>>>>> An Event
  if(jobRole.parentNode.childElementCount > 7){ // 7 for the number child
    jobRole.parentNode.removeChild(input);
  }
  if(jobRole.value === "other"){
    jobRole.parentNode.appendChild(input);
  }
},false);
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\
// /// //// ///// ////// /////// //////// ///////// ////////// Section 2 : T-Shirt Color//
const tShirt = document.querySelector(".shirt");
const paragraph = document.createElement("p");
tShirtColor.style.display = "none"; // hiding the color from the start

fieldSets[1].addEventListener("change", (e) => {
  if(e.target.id == "design"){

    if( tShirtDesign.value === "js puns"){
      tShirtColor.style.display = "inline";
      paragraph.innerHTML = "";
      colorsDesign.value = colorsDesign[0].value; // forces to to set the right color for the puns js design.
      for(let i = 0 ; i < colorsDesign.length; i++ ){
        colorsDesign[i].style.display = (i < 3) ? "inline" : "none"; //only colorsDesign[0], colorsDesign[1], colorsDesign[2] are show & only colorsDesign[3], colorsDesign[4], colorsDesign[5] are hidden
      }
    }//end of the tShirtDesign for js puns
    else if ( tShirtDesign.value === "heart js") {
      tShirtColor.style.display = "inline";
      paragraph.innerHTML = "";
      colorsDesign.value = colorsDesign[3].value;// forces to to set the right color for the heart js design.
      for(let i = 0 ; i < colorsDesign.length; i++ ){
        colorsDesign[i].style.display = (i > 2) ? "inline" : "none";//only colorsDesign[3], colorsDesign[4], colorsDesign[5] are showen & only colorsDesign[0], colorsDesign[1], colorsDesign[3] are hidden by display none.
      }
    }//end of the tShirtDesign for heart js
    else{
      tShirtColor.style.display = "none";
      paragraph.innerHTML = "Please select a T-shirt theme";
      paragraph.classList.add("priceClass");
      tShirt.appendChild(paragraph);
    }
  }
},false);
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\
// /// //// ///// ////// /////// //////// ///////// ////////// Section 3 : Activities   //

let paragraphActivities = document.createElement("p");//p to display price
paragraphActivities.classList.add("priceClass");//p class
activities[0].parentNode.appendChild(paragraphActivities);// p apend

for(let i = 0 ; i < activities.length; i++){
  activities[i].addEventListener("change", (e) => {//>>>>>>>>>>>>>> An Event traking any changes in the activities list.
    let str = activities[i].textContent;//activity description.
    let price = parseInt(str.substr(-3,3));//extracting the last 3 char from the activity description.

    borderSectionOff(fieldSets[2]);//to take off the warning border
    if (e.target.checked){
      sum += price;
      paragraphActivities.textContent = "$"+sum.toString(); //displaying the price,
      activities[i].style.fontSize = "1.15rem";//making the selected activity little bigger
      nBlankActivity = true;
    }
    else {
      activities[i].style.fontSize = "1rem";//
      sum -= price;
      paragraphActivities.textContent = "$"+sum.toString();
      nBlankActivity = true;
    }
    if(sum === 0 ){
      paragraphActivities.textContent = "Would you please pick an activity";
      nBlankActivity = false;
    }
    if(conflictList[i]){//only if the condition is true than we alinate the conflicted activity.
      conflictManager(i,conflictList[i]);
    }
  },false);
}
//
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| \\
// /// //// ///// ////// /////// //////// ///////// ////////// // Section 4 : payement  //

hideAllPaymentMethods();

allPaymentMethod.addEventListener("change", (e) => {// An Event all payment methods credit card and bitcoin paypal.
  borderSectionOff(fieldSets[3]);

  if(e.target.value == "paypal" || e.target.value == "bitcoin" || e.target.value == "credit card" ){
    let position = e.target.selectedIndex + 2;
    for(let i = 3 ; i < 6; i++){//
      if(i != position){
        fieldSets[3].children[i].hidden = true;
      }
      else{
        fieldSets[3].children[i].hidden = false;
      }
      nBlankPayement = true;
      nBlankCreditCard = false;
      nBlankZip = false;
    }
  }
  else{
    hideAllPaymentMethods();
    nBlankPayement = false;
    nBlankCreditCard = false;
    nBlankZip = false;
    borderSectionOff(fieldSets[3]);
  }
},false);
// /// //// ///// ////// /////// //////// ///////// ////////// // Validation Credit Card //

CreditCardPayment.addEventListener("input", (e) => {
  ////////////////////////Credit Card ///////////////////////////
  if(e.target.id == "cc-num"){
    let correctFormat = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    //targeting all creditCards starting with 2,3,4, 5 or 6 Visa /Master/ AmericanX ...
    let result = regXTest(correctFormat,(e.target.value));//pass a boolean to result
    nBlankCreditCard = result ? true : false;//evaluate result and pass the result to nBlankCreditCard, that will be used on the submit section.
    result ? borderDesengage(e.target,"cc-num" ,"Card Number") : borderEngage(e.target,"cc-num","Card Number");// remouve the border : add the border , //credit card Selector to be targeted
  }
  /////////////////////////////ZIP////////////////////////////////
  else if (e.target.id == "zip") {
    let correctFormat = /^[0-9]{5}$/; //just 5 digits
    let result = regXTest(correctFormat,(e.target.value));
    nBlankZip = result ? true : false;
    result ? borderDesengage(e.target,"zip","Zip") : borderEngage(e.target,"zip","Zip"); // zip selector
  }
  ////////////////////////////////CVV///////////////////////////
  else if (e.target.id == "cvv") {
    let correctFormat = /^[0-9]{3}$/; //just 3 digits
    let result = regXTest(correctFormat,(e.target.value));
    nBlankCVV = result ? true : false;//p
    result ? borderDesengage(e.target,"cvv","CVV") : borderEngage(e.target,"cvv","CVV");
  }
  //////////////////////Year verification///////////////////////
  else if (e.target.id == "exp-year"){
    let currentValue = e.target.value;
    let d = new Date().getFullYear();

    if(currentValue >= d){
      borderDesengage(e.target,"exp-year", "Expiration Year;");
      // future add an if statement to check for the month when the currentValue == d
    }
    else{
      borderEngage(e.target,"exp-year", "Expiration Year:&#10071;");
    }
  }
}, false );
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// /// //// ///// ////// /////// //////// ///////// ////////// ////////////// Submition //

form.addEventListener("submit", (e) => {//>>>>>>>>>>>>>> An Event when it submitting the form
    e.preventDefault();
    nBlankName ? console.log("there is A Name") : borderEngage(name, "name", "Name");
    nBlankEmail ? console.log("there is A Email") : borderEngage(email,"mail","Email");
    nBlankActivity ? console.log("there is An activities") : borderSectionOn(fieldSets[2]);
    nBlankPayement ? console.log("there is A allPaymentMethod") : borderSectionOn(fieldSets[3]);
    nBlankCreditCard ? console.log("there is A cc") : borderEngage(cc,"cc-num","Card Number");
    nBlankZip ? console.log("there is A zip") : borderEngage(zip,"zip","Zip");
    nBlankCVV ? console.log("there is A cvv") : borderEngage(cvv,"cvv","CVV");
},false);
