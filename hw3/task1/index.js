"use strict"

var userName = prompt("Please, enter user name", "");

if (userName.search(/\d/) === -1) {
    userName = userName.split("").reverse().join("");
} else {
    userName = userName.toUpperCase();
};

document.write("<h2>" + userName + "</h2>");