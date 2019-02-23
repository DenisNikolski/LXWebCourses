"use strict"

document.getElementById("goToButton").addEventListener("click", function () {
    window.location.replace("http://www.w3schools.com");
})

document.getElementById("clearContentButton").onclick = function () {
    document.getElementById("text").remove();
}