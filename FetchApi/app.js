const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;
const dropdowns =document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".formbutton");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
let msg =document.querySelector(".msg");

for(select of dropdowns){
    for(currcode in countryList){
        let newOption =document.createElement("option");
        newOption.innerText = currcode;
        newOption.value= currcode;
        if(select.name==="from"&& currcode=="USD"){
            newOption.selected="selected";
        } else if (select.name==="to"&& currcode=="INR"){
                newOption.selected="selected";  
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
 }

 const updateExchangeRate =async()=>{
    let amount  = document.querySelector(".amount input");
let amtval =amount.value;
if(amtval===""||amtval<0){
    amtval = 1;
    amount.value ="1";
}

console.log(fromcurr.value.toLowerCase());
const URL =`${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
let response =await fetch(URL);
let data = await response.json();
let rate =  data[fromcurr.value.toLowerCase()];
let chngrate =rate[tocurr.value.toLowerCase()];

let finalamt =chngrate*amtval;
msg.innerText =`for ${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
}


    
 const updateFlag=(element)=>{
     let currcode =element.value;
     let countrycode=countryList[currcode];
     let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
     let img =element.parentElement.querySelector("img");
    img.src = newsrc; 
}


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener(
    "load",()=>{ 
     updateExchangeRate();} 
 );
