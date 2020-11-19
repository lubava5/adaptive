
const openButton=document.querySelector(".hamburger");

//console.log(openButton);

const modal = document.querySelector(".fullscreen-menu");

//console.log(modal);
openButton.addEventListener('click', ()=>{

  modal.classList.add('fullscreen-menu_active');
});

const closed= document.getElementById('fullscreen-menu_close');
//console.log(closed);


closed.addEventListener('click', (e)=>{
  e.preventDefault();
  //const modal = document.getElementById('fullscreen');

  //console.log(modal);

  modal.classList.remove('fullscreen-menu_active');
});

///////////////////

const leftBtn = document.querySelector(".slider__btn--prev");
const rightBtn = document.querySelector(".slider__btn--next");
const items = document.querySelector(".slider__list");
const slider = document.querySelector(".slider");
const sliderItemArray=document.querySelectorAll(".slider__item")

const sliderStyles=getComputedStyle(slider);

sliderNumber=sliderItemArray.length;

console.log(sliderNumber);

const computedStyles=getComputedStyle(items);



rightBtn.addEventListener("click", function(e) {
  e.preventDefault();

  let currentWidth=parseInt(computedStyles.width);
  let currentRight=parseInt(computedStyles.right);

 
  if(currentRight<(currentWidth*(sliderNumber-1))){
  
items.style.right=`${currentRight+currentWidth}px`;
  }
  
});


leftBtn.addEventListener("click", function(e) {
  e.preventDefault();
  
  let currentWidth=parseInt(computedStyles.width);
  let currentRight=parseInt(computedStyles.right);

  if(currentRight>0) {
  
items.style.right=`${currentRight-currentWidth}px`;
  }

});



