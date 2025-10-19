const card = document.getElementById("card");
card.draggable = false; // prevent native html drag hijacking

let isDragging = false;
let cardStartX = 0;
let cardStartY = 0;
let cardEndX = 0;
let cardEndY = 0;

const resetClasses = () => {
  card.classList.remove("swipeRight", "swipeLeft");
};

card.addEventListener("pointerdown", (event) => {
    isDragging = true;
    resetClasses();
    cardStartX = event.clientX;
    cardStartY = event.clientY;
    event.preventDefault();
    console.log("x started: ", cardStartX);
    console.log("y started: ", cardStartY);
})


window.addEventListener("pointermove", (event) => {
    if (!isDragging) return;
    cardEndX = event.clientX;
    cardEndY = event.clientY;

    console.log("x end: ", cardEndX);
    console.log("y end: ", cardEndY);

    if (cardEndX > cardStartX) {
        resetClasses();
        console.log("swipe right")
        card.classList.add("swipeRight");
    }
    else if (cardEndX < cardStartX) {
        resetClasses();
        console.log("swipe left")
        card.classList.add("swipeLeft");
    }
    else {
        resetClasses();
        console.log("nothing john snow")
    }
})

window.addEventListener("pointerup", () => {    
    if (!isDragging) return;      
    isDragging = false;           
    
    if (card.classList.contains("swipeRight")) {
        card.style.color = "blue"
    }

    else if (card.classList.contains("swipeLeft")) {
        card.style.color = "red"
    }
})
