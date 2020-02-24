//Function that is responsible for executing show animation for visible elements
let scrollAppearItem = (itemName) => {
  const items = document.getElementsByClassName(itemName);
  for (let i = 0; i < items.length; i++) {
    //height of the item which is going to be appeared
    let itemHeight = items[i].clientHeight;
    //height of visible window
    let windowHeight = window.innerHeight;
    //current scroll Y position. From beginning of the page to the top border of visible window
    let scrollY = window.scrollY || window.pageYOffset;
    //current position related to bottom border of visible window
    let scrollPosition = scrollY + windowHeight;

    let itemPosition = items[i].getBoundingClientRect().top + (itemHeight / 2) + scrollY;
    if (scrollPosition >= itemPosition) {
      items[i].classList.add("scrollAppear");
    }
  }
}
//Parallax effect
let parallaxFunction = (name) => {
  const itemsPar = document.getElementsByClassName(name);
  let scrollRatio = 0;
  //Change scroll ratio if mobile mode
  if (window.innerWidth < 1025)
    scrollRatio = -0.15;
  else
    scrollRatio = -0.3;
  for (let i = 0; i < itemsPar.length; i++) {
    let offset = window.pageYOffset;
    itemsPar[i].style.backgroundPositionY = offset * scrollRatio + "px";
  }
}

window.addEventListener("scroll", () => {
  scrollAppearItem("fade");
  parallaxFunction("parallax");
});

var input = document.getElementById("btn");
var photo = document.querySelector(".photo-holder");
//Prevent showing context menu when right clicked inside of photo holder box
photo.addEventListener("contextmenu", e => {
  e.preventDefault();
})
//Function responsible for loading photo
let uploadPhotos = () => {
  //Clear photo if exists while loading another
  while (photo.firstChild) {
    photo.removeChild(photo.firstChild);
  }
  //If photo is not choosen
  var currentFiles = input.files;
  if (currentFiles.length === 0) {
    var noFile = document.createElement("p");
    noFile.textContent = "Brak zaznaczonego zdjęcia do wczytania";
    photo.appendChild(noFile);
  }
  else {
    var image = document.createElement("img");
    image.src = window.URL.createObjectURL(currentFiles[0]);
    image.style.position = "absolute";
    image.style.top = "0";
    image.style.left = "0";
    image.style.width = "100%";
    image.style.height = "100%"
    photo.appendChild(image);
    if (document.querySelector(".image-list").style.display == "none") {
      document.querySelector(".image-list").style.display = "block";
    }
  }
}

input.addEventListener("change", uploadPhotos);
//Load and position new dragable element
var dragElements = document.getElementsByClassName("image-list-item");
for (let i = 0; i < dragElements.length; i++) {
  dragElements[i].addEventListener("click", () => {
    let newElement = document.createElement("img");
    let tempImg = dragElements[i].querySelector("img");
    newElement.src = tempImg.src;
    newElement.style.width = "25%";
    newElement.style.height = "25%";
    newElement.style.position = "absolute";
    newElement.style.top = "0";
    newElement.style.left = "0";
    newElement.style.cursor = "pointer";
    photo.appendChild(newElement);
    newElement.addEventListener("mousedown", dragElement(newElement));
    newElement.addEventListener("mousedown", () => {
      if ((window.innerWidth >= 1025 && event.button == 2) || (window.innerWidth < 1025 && event.touches[1])) {
        photo.removeChild(newElement);
      }
    })
  })
}
//Function responsible for dragging elements
function dragElement(element) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  element.onmousedown = dragMouseDown;
  element.ontouchstart = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    //if desktope mode calculate according start positions for desktop
    if (window.innerWidth >= 1025) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    //if mobile mode calculate according start positions for mobile
    else {
      e.preventDefault();
      pos3 = e.touches[0].pageX;
      pos4 = e.touches[0].pageY;
    }
    //Set proper events
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    document.ontouchend = closeDragElement;
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    //If desktop mode calculate according moved positons for desktop
    if (window.innerWidth > 1025) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    //If mobile mode calculate according moved positions for mobile
    else {
      pos1 = pos3 - e.touches[0].pageX;
      pos2 = pos4 - e.touches[0].pageY;
      pos3 = e.touches[0].pageX;
      pos4 = e.touches[0].pageY;
    }
    element.style.left = (element.offsetLeft - pos1) + "px";
    element.style.top = (element.offsetTop - pos2) + "px";
  }
  function closeDragElement() {
    /* stop moving when mouse button is released or touch is end:*/
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

//Validation message form
const form = document.querySelector('.form');
const email = document.querySelector('#email');
const emailSpan = document.querySelector('.email-span');
const topic = document.querySelector('#topic');
const topicSpan = document.querySelector('.topic-span');
const nr = document.querySelector('#phoneNumber');
const nrSpan = document.querySelector('.nr-span');
const textarea = document.querySelector('#textarea');
const txtAreaSpan = document.querySelector('.textarea-span');
const submit = document.querySelector('#submit')
const submitSpan = document.querySelector('.submit-span');

let validEmail = false;
let validTopic = false;
let validNumber = true;
let validMessage = false;
//Regex for email
let validateEmail = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
//Regex for phone number
let validateNr = nr => {
  return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(nr)
}

email.addEventListener('keyup', (e) => {
  //if key is up and validation is positive set status to valid
  if (validateEmail(e.target.value)) {
    emailSpan.classList.remove("showAllert");
    email.classList.remove("invalid");
    email.classList.add("valid");
    validEmail = true;
  }
  //if key is up and validation is negative set status to invalid
  else {
    emailSpan.classList.add("showAllert");
    email.classList.remove("valid");
    email.classList.add("invalid");
    validEmail = false;
  }
})
topic.addEventListener('keyup', (e) => {
  if (e.target.value === "" || e.target.value === null) {
    topicSpan.classList.add("showAllert");
    validTopic = false;
  }
  else {
    topicSpan.classList.remove("showAllert");
    validTopic = true;
  }
})
nr.addEventListener('keyup', (e) => {
  if (e.target.value === "" || e.target.value === null) {
    nrSpan.classList.remove("showAllert");
    validNumber = true;
  }
  else {
    if (validateNr(e.target.value)) {
      nrSpan.classList.remove("showAllert");
      validNumber = true;
    }
    else {
      nrSpan.classList.add("showAllert");
      validNumber = false;
    }
  }
})
textarea.addEventListener('keyup', e => {
  if (e.target.value <= 0) {
    txtAreaSpan.classList.add('showAllert');
    validMessage = false;
  }
  else {
    txtAreaSpan.classList.remove('showAllert');
    validMessage = true;
  }
})
form.addEventListener('submit', e => {
  e.preventDefault();

  if (validEmail && validTopic && validMessage && validNumber) {
    submitSpan.classList.remove('showSecondAllert');
  }
  else {
    submitSpan.classList.add('showSecondAllert');
  }
})
//Features for menu button in mobile mode
const nav = document.querySelector('#nav');
const navBtn = document.querySelector('.nav-btn-container');
let isClicked = false;
navBtn.addEventListener('click', e => {
  if (isClicked) {
    nav.classList.remove('openNav');
    navBtn.classList.remove("open");
    isClicked = false;
  }
  else {
    nav.classList.remove('openNav');
    void nav.offsetWidth;
    nav.classList.add('openNav');

    navBtn.classList.remove("open");
    void navBtn.offsetWidth;
    navBtn.classList.add("open");
    isClicked = true;
  }
})
//If link is clicked then automatically close menu (mobile mode)
const links = document.getElementsByClassName('nav-link');
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', () => {
    if (window.innerWidth < 1025) {
      navBtn.classList.remove("open");
      nav.classList.remove('openNav');
      isClicked = false;
    }
  })
}

//Smooth scrolling
const scroll = new SmoothScroll('#nav a[href*="#"]', {
  speed: 500
});