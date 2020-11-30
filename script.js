
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

///////////////////SLIDER

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
///////SLIDESHOW
const findBlockByAlias=(alias)=>{
 return $(".reviews__item").filter((ndx,item)=>{
    return $(item).attr("data-linked-with")==alias;
   
   
  })
}
$(".interactive-avatar__link").on('click', function(e){
  e.preventDefault();
  const $this=$(e.currentTarget);
  const target=$this.attr("date-open");
  const itemToShow=findBlockByAlias(target);
  const curItem=$this.closest(".reviews__switcher-item");

  itemToShow.addClass("active").siblings().removeClass("active");
  curItem.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");
})

////////ACCORDION
const openItem=(item)=>{
const container=item.closest((".team__item"));
const contentBlock=container.find(".team__content");
const textBlock=contentBlock.find(".team__content-block");
const reqHeight=textBlock.height();
container.addClass("active");
contentBlock.height(reqHeight);



//triangle.addClass('team__title2')
}

const closeEveryItem=(container)=>{
  const items=container.find('.team__content');
  const itemContainer=container.find(".team__item");

  //console.log(itemContainer);
  itemContainer.removeClass("active");
  items.height(0);

  //const triangle=$('.team__title');
  //triangle.removeClass('team__title2')
}

const  triangle=(tr)=>{
  tr.addClass('team__title2')
}

const  triangle_rotate=(tr)=>{
  tr.removeClass('team__title2')
}

$('.team__title').click(e=>{
  const $this=$(e.currentTarget);
  const container=$this.closest('.team');

  const elemContainer=$this.closest('.team__item');
  
const tr=$this;



  if(elemContainer.hasClass("active")){
    closeEveryItem(container);
    triangle_rotate(tr);

  }else{
    closeEveryItem(container);
    openItem($this);
    triangle(tr);
  }
})

//MODAL

const validateFields=(form,fieldsArray)=>{

  fieldsArray.forEach(field=>{
    field.removeClass("input-error")
  if(field.val().trim()===''){
    field.addClass('input-error');//trim обрезает пробелы
  }
  
  });
  
  const errorFields=form.find(".input-error");
  return errorFields.length==0;

}

$('.form').submit(e=>{
  e.preventDefault();

  const form=$(e.currentTarget);
  const name=form.find("[name='name']");
  const phone=form.find("[name='phone']");
  const comment=form.find("[name='comment']");
  const to=form.find("[name='to']");

  const modal=$("#modal");
  const content=modal.find(".modal__content");

  modal.removeClass("error-modal");

  const isValid=validateFields(form,[name,phone,comment,to]);


if(isValid){
  $.ajax({

    url:"https://webdev-api.loftschool.com/sendmail",
    method:"POST",
    data:{
      name:name.val(),
      phone:phone.val(),
      comment:comment.val(),
      to:to.val()

    },

    success:(data)=>{

      content.text(data.message)
      //console.log(data);
      
  $.fancybox.open({
    src:'#modal',
    type:"inline"
  })
    },
    error:(data)=>{
      const message=data.responseJSON.message;
      content.text(message);
      console.log(data);
      modal.addClass('error-modal');

      $.fancybox.open({
        src:'#modal',
        type:"inline"
      })
    }
  });
}

  

  
})
$(".app-submit-btn").click(e=>{
  e.preventDefault();
  $.fancybox.close();
})

