import { helperFunctions } from "./helperFunctions.js";

export const indexStuff = {
  footer: function(
    footer = helperFunctions.generateElement('footer'),
    h3 = helperFunctions.generateElement('h3',"","","Contact"),
    div = helperFunctions.generateElement('div',"contacts"),
    array = [
      '<a href="https://www.linkedin.com/in/astha-rai-096034129/"><i class="fa-brands fa-linkedin-in"></a></i>',
      '<a href="#"><i class="fa-brands fa-facebook-f"></a></i>',
      '<a href="#"><i class="fa-brands fa-instagram"></a></i>',
      '<button class="clipboard" value="astharai2207@gmail.com"><i class="fa-solid fa-envelope"></button></i>'
    ]
  ){
    array.forEach(icon => {
      div.innerHTML = div.innerHTML + icon;
    });
    footer = helperFunctions.appendChildren(footer, h3, div);
    return footer;
  },
  nav: function(
    nav = helperFunctions.generateElement('nav'),
    portfolioLink = helperFunctions.generateElement('a',"","","Portfolio","index.html"),
    aboutLink = helperFunctions.generateElement('a',"","","About","about.html"),
    url = window.location.href
  ){
    if (url.includes('about.html')){
      nav = helperFunctions.appendChildren(nav, portfolioLink);  
    }
    else {
      nav = helperFunctions.appendChildren(nav, aboutLink);
    }
    // nav = helperFunctions.appendChildren(nav, portfolioLink, aboutLink);
    return nav;
  }

  
}
