import { helperFunctions } from "./helperFunctions.js";
import { galleryDB, about } from "./galleryDB.js";
import { indexStuff } from "./index.js";

const pageStuff = {
  constructHTML : {
    about: function(
      section = helperFunctions.generateElement('section',"about"),
      title1 = helperFunctions.generateElement('h3',"","","About Me"),
      content = helperFunctions.generateElement('div',"aboutContent"),
      figure = helperFunctions.generateElement('figure'),
      img = helperFunctions.generateElement('img',"","","Photo","imgs/AR20.webp"),
      textDiv = helperFunctions.generateElement('div','aboutText'),
      title2 = helperFunctions.generateElement('h3',"","","About Me"),
      p = helperFunctions.generateElement('p',"", "",about)
    ){
      content = helperFunctions.nestChildren(content, figure, img);
      textDiv = helperFunctions.appendChildren(textDiv, title2, p);
      content.appendChild(textDiv);
      section = helperFunctions.appendChildren(section, title1, content);
      return section;
    },
    compileTogether: function(
      bodyElement  = document.querySelector('body'),
      gallery_return = this.gallery(),
      titleBanner_return = this.titleBanner(),
      about_return = this.about()
    ){
      bodyElement = helperFunctions.appendChildren(bodyElement, gallery_return, about_return,indexStuff.footer());
      gallery_return.insertBefore(titleBanner_return, gallery_return.children[1]);
    },
    gallery: function(
      gallery_tag = helperFunctions.generateElement('section',"gallery"),
      counter = 0,
      DB_array = [],
      rows = []
    ){
      for (const key in galleryDB) {
          if (Object.hasOwnProperty.call(galleryDB, key)) {
            const item = galleryDB[key];
            DB_array.push(item);
          }
        }
      for (let i = 0; i < 4; i++){
        rows.push(helperFunctions.generateElement('div',`row${i}`,"row"))
        if (i%2 == 0){
          rows[i].classList.add('slideRight');
        }
        else {rows[i].classList.add('slideLeft')};
        gallery_tag.appendChild(rows[i]);
      

        for(let ii = 0; ii < 8; ii++){
          let figure = helperFunctions.generateElement('figure');
          let overlay = helperFunctions.generateElement('div',`${DB_array[i*8+ii].id}`,"overlay");
          let img = helperFunctions.generateElement('img',"","",`${DB_array[i*8+ii].id}`,`${DB_array[i*8+ii].imgPath}`)
          
          figure = helperFunctions.appendChildren(figure, overlay,img);
          rows[i].appendChild(figure);
        }
      }



      return gallery_tag;
    },
    menuBtn: function(
      menuBtn = helperFunctions.generateElement('button',"menuBtn","","😀")
    ){
      return menuBtn;
    },
    titleBanner: function(
      titleBanner_tag = helperFunctions.generateElement('div',"titleBanner","row"),
      h1 = helperFunctions.generateElement('h1',"","","Astha Rai"),
      h2 = helperFunctions.generateElement('h2',"","","Digital Illustrations Portfolio"),
      span = helperFunctions.generateElement('span',"","","(Click any portfolio image to see a full sized version of it)")
    ){
      titleBanner_tag = helperFunctions.appendChildren(titleBanner_tag, h1, h2, span);
      titleBanner_tag.style.animationName = "none";
      return titleBanner_tag;
    },
    singlePreview: function(
      galleryDB_item,
      targetRow,
      gallery = document.querySelector("#gallery"),
      preview = helperFunctions.generateElement('section', "preview"),
      figure = helperFunctions.generateElement('figure'),
      img = helperFunctions.generateElement('img',"","",galleryDB_item.id,galleryDB_item.imgPath),
      ){
        gallery.style.filter = "blur(10px)";

        preview = helperFunctions.nestChildren(preview, figure, img);
        preview.addEventListener('click', (e)=>{
          preview.style.opacity = 0;
          gallery.style.filter = "none";
          setTimeout(function() {
            preview.remove();
          }, 750)
         
        })
        return preview;
    },
  },

  events: {
    activateAll: function(){
      this.imgBtns();
      this.emailBtn();
      this.noLink();
    },
    imgBtns: function(
      figureArray = document.querySelectorAll('figure')
    ){
      figureArray.forEach(figure => {
        figure.addEventListener('click', (e)=>{
          for (const key in galleryDB) {
            if ((Object.hasOwnProperty.call(galleryDB, key) && (galleryDB[key].id == e.target.id))) {
              const item = galleryDB[key];
              let targetRow = e.target.parentNode.parentNode;
              let previewElement = pageStuff.constructHTML.singlePreview(item, targetRow);
              document.querySelector('body').appendChild(previewElement);
              setTimeout(function() {
                previewElement.style.opacity = 1;
              }, 0)
            }
          }
        })
      });
    },
    emailBtn: function(
      btn = document.querySelector('.clipboard')
    ){
      console.log(btn.value);
      btn = helperFunctions.addHoverTitle(btn, "Copy to Clipboard")
      btn.addEventListener('click',()=>{
        navigator.clipboard.writeText(btn.value);
      })
    },
    noLink: function(
      hasTagLinks = document.querySelectorAll('[href="#"]')    
      ){
        console.log(hasTagLinks);
        hasTagLinks.forEach(element => {
          element.setAttribute('title',"No Link")
        });

    }
  }
}

pageStuff.constructHTML.compileTogether();
pageStuff.events.activateAll();
