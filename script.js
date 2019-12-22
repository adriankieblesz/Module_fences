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

let parallaxFunction = (name) => {
  const itemsPar = document.getElementsByClassName(name);
  let scrollRatio = 0;
  if (window.innerWidth < 1025)
    scrollRatio = -0.15;
  else
    scrollRatio = -0.3;
  for (let i = 0; i < itemsPar.length; i++) {
    let offset = window.pageYOffset;
    itemsPar[i].style.backgroundPositionY = offset * scrollRatio + "px";
    console.log(scrollRatio);
  }
}

window.addEventListener("scroll", () => {
  scrollAppearItem("fade");
  parallaxFunction("parallax");
});

var input = document.getElementById("btn");
var photo = document.querySelector(".photo-holder");
photo.addEventListener("contextmenu", e => {
  e.preventDefault();
})
let uploadPhotos = () => {
  while (photo.firstChild) {
    photo.removeChild(photo.firstChild);
  }

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

var dragElements = document.getElementsByClassName("image-list-item");
for (let i = 0; i < dragElements.length; i++) {
  dragElements[i].addEventListener("click", () => {
    let newElement = document.createElement("img");
    let tempImg = dragElements[i].querySelector("img");
    newElement.src = tempImg.src;
    newElement.style.width = "25%";
    newElement.style.height = "25%";
    newElement.style.position = "absolute";
    newElement.style.bottom = "0";
    newElement.style.left = "0";
    newElement.style.cursor = "pointer";
    photo.appendChild(newElement);
    newElement.addEventListener("mousedown", dragElement(newElement));
    newElement.addEventListener("mousedown", () => {
      if (event.button == 2) {
        photo.removeChild(newElement);
      }
    })
  })
}



function dragElement(element) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  element.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.left = (element.offsetLeft - pos1) + "px";
    element.style.top = (element.offsetTop - pos2) + "px";
  }
  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

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

let validateEmail = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
let validateNr = nr => {
  return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(nr)
}

email.addEventListener('keyup', (e) => {
  if (validateEmail(e.target.value)) {
    emailSpan.classList.remove("showAllert");
    email.classList.remove("invalid");
    email.classList.add("valid");
    validEmail = true;
  }
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


const scroll = new SmoothScroll('#nav a[href*="#"]', {
  speed: 500
});