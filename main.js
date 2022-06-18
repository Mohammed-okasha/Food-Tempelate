
const toggle = document.getElementsByClassName("toggle")[0];
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", activeItem);

/*
[Active Item Function]
- Toggle Btn Opan And Close
- Opan And Close Nav Links
*/
function activeItem() {
    // Toggle Active Calss To toggle Btn
    toggle.classList.toggle("active");

    // Toggle Active Calss To navLinks
    navLinks.classList.toggle("active");
}
// ================================================================
// [Landing Page Slider]

// Access To All Slide
const slides = document.querySelectorAll(".slide");
// Access To Prev Btn
const prevBtn = document.getElementsByClassName("prev")[0];
// Access To Next Btn
const nextBtn = document.getElementsByClassName("next")[0];
// Access To All Title
const title = document.querySelectorAll(".title");



// Step [1] Looping On All slides
slides.forEach((slide, index) => {
    // Slide[1] > index(0 * 100%) = 0
    // Slide[2] > index(1 * 100%) = 100%
    // Slide[3] > index(2 * 200%) = 200%
    slide.style.left = `${index * 100}%`;
});

// Counter Var
let counter = 0;


// Step [2] When Click To Next Btn > Counter++
nextBtn.addEventListener("click", _ => {
    counter++;
    // Calling Slider Function
    slider();
});

// Step [3] When Click To Prev Btn > Counter--
prevBtn.addEventListener("click", _ => {
    counter--;
    // Calling Slider Function
    slider();
});

// Step [4] Looping On All slides
function slider() {
    slides.forEach((slide) => {
        if (counter > slides.length - 1) {
            counter = 0;
        }

        if (counter < 0) {
            counter = slides.length - 1;
        }

        /*
        translateX = (-counter * 100%)
        if Counter = 1 > 1 * 100% = 100%
        if Counter = 2 > 2 * 100% = 200%
        */
        slide.style.transform = `translateX(-${counter * 100}%)`;
    });
};

// Final Step [5] Auto Slide
function autoSlide() {
    counter++;
    // Calling Slider Function
    slider();
};

// Calling Auto Slide Function In setInterval
let count = setInterval(autoSlide, 6000);
// ================================================================
// [Dish Card Details]

// Access To All Dishes Details Parent
const dishesCardsParent = document.getElementsByClassName("dishes-details")[0];
// Access To All Dishes Card
const dishesCards = dishesCardsParent.querySelectorAll(".dish-card");

// Access To All Popular Dishes
const dishes = document.querySelectorAll(".swiper-slide");


// step [1] Looping On All dishes
dishes.forEach(dish => {
    dish.addEventListener("click", dishCardPopup);
});


// step [2] dish Card Popup Function
function dishCardPopup() {

    // Show dishes Details Parent
    dishesCardsParent.style.display = "block";

    // Get Custom Att data-dish
    const dishAtt = this.getAttribute("data-dish");
    
    // Looping On All Dishes Cards
    for (let i = 0; i < dishesCards.length; i++) {
        const dishCard = dishesCards[i];

        // Get Custom Att data-popup
        const dishCardAtt = dishCard.getAttribute("data-card");

        // Check dishAtt == dishCardAtt ? 
        if (dishCardAtt == dishAtt) {
            // if dishAtt == dishCardAtt Show Dish Card
            dishCard.classList.add("preview");

        } else {
            // if dishAtt != dishCardAtt Hide Dish Card
            dishCard.classList.remove("preview");
        }
    };
};


// Access To Close Btn From Parent
const closeBtn = dishesCardsParent.getElementsByClassName("close-btn")[0];

closeBtn.addEventListener("click", function() {
    // Hide dishesCardsParent
    this.parentElement.style.display = "none";

    // Looping On All Dishes Cards
    for (let i = 0; i < dishesCards.length; i++) {
        const dishCard = dishesCards[i];
        // Hide Dish Card
        if (dishCard.classList.contains("preview")) {
            dishCard.classList.remove("preview")
        };
    };
});
// ================================================================
/*
[Deal With Order Form Data]
- Selcet Order Form
- Select All Inputs
*/

const form = document.getElementById("form");
const userName = document.getElementById("userName");
const foodName = document.getElementById("foodName");
const orderDetails = document.getElementById("orderDetails");
const textArea = document.getElementById("textArea");
const phoneNumber = document.getElementById("number");
// How Much Input
const howMuch = document.getElementById("howMuch");
// Date Much Input
const date = document.getElementById("date");


// Step [1] addEventListener(submit) To Form
form.addEventListener("submit", validationForm);


// Step [2] Create Error Function
let setErorr = (input, message) => {
    // Access To Input Control From Input Child
    const inputControl = input.parentElement;
    // Access To Erorr Message Div From Parent > inputControl
    let error = inputControl.querySelector(".erorr");
    error.innerText = message;

    // Add Erorr Class To inputControl
    inputControl.classList.add("erorr");
    // REmove Erorr Class To inputControl
    inputControl.classList.remove("success");
};

// Step [3] Create Error Function
let setSuccess = (input) => {
    // Access To Input Control From Input Child
    const inputControl = input.parentElement;
    // Access To Erorr Message Div From Parent > inputControl
    let error = inputControl.querySelector(".erorr");
    error.innerText = "";

    // Add Erorr Class To inputControl
    inputControl.classList.add("success");
    // Remove Erorr Class To inputControl
    inputControl.classList.remove("erorr")
};

// Step [4] validationForm Function
function validationForm (e) {
    e.preventDefault();

    // Input Vlaue > trim() The Expexted Space From User
    const userNameValue = userName.value.trim();
    const foodNameValue = foodName.value.trim();
    const orderDetailsValue = orderDetails.value.trim();
    const textAreaValue = textArea.value.trim();
    const phoneNumberValue = phoneNumber.value.trim();
    const howMuchValue = howMuch.value.trim();

    if (userNameValue === "") {
        // Calling Error Function
        setErorr(userName, "user name is required");

    } else {
        setSuccess(userName);
    }

    if (foodNameValue === "") {
        setErorr(foodName, "Food name is required");

    } else {
        setSuccess(foodName);
    }

    if (orderDetailsValue === "") {
        setErorr(orderDetails, "order deatils is required");

    } else {
        setSuccess(orderDetails);
    }

    if (phoneNumberValue === "") {
        setErorr(phoneNumber, "your phone number is required");

    } else if (phoneNumberValue.length > 15) {
        setErorr(phoneNumber, "max is 15 number");

    }
    else {
        setSuccess(phoneNumber);
    }

    if (howMuchValue === "") {
        setErorr(howMuch, "how much is required");

    } else {
        setSuccess(howMuch);
    }

    // if (typeof date != "number") {
    //     setErorr(date, "date is required");

    // } else {
    //     setSuccess(date);
    // }
};
// ================================================================
/*
[Window Scrolling]
- Up Button > Take The Window To Scroll To Top
- Header is Sticky
*/

const upBtn = document.getElementById("up");
const header = document.getElementById("header");

window.addEventListener("scroll", activeElements);

// Create ActiveElements Function
function activeElements() {
    // Active Up Btn
    if (window.scrollY >= 1100) {
        if (upBtn != null) {
            // Set Class Att
            upBtn.setAttribute("class", "active");
            upBtn.onclick = _ => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            };
        };

    } else {
        // Remove Class Att
        upBtn.removeAttribute("class");
    }


    if (window.scrollY >= 100) {
        // Sticky Header ==========
        if (!header.hasAttribute("class")) {
            // Set Active Class Att To header
            header.setAttribute("class", "active");
        };

    } else {
        if (header.hasAttribute("class")) {
            // Set Active Class Att To header
            header.removeAttribute("class");
        }
    }

};
// ================================================================
