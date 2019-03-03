function Computer() {
    var processor = 0;
    var manufacturer = "";
    var graphicsCard = "";

    this.setProcessor = _processor => {
        if (_processor) {
            processor = _processor;
        } else {
            throw new Error('inital value');
        }
    };

    this.getProcessor = () => {
        return processor;
    };

    this.setManufacturer = _manufacturer => {
        if (_manufacturer) {
            manufacturer = _manufacturer;
        } else {
            throw new Error('inital value');
        }
    };

    this.getManufacturer = () => {
        return manufacturer;
    };

    this.setGraphicsCard = _graphicsCard => {
        if (_graphicsCard) {
            graphicsCard = _graphicsCard;
        } else {
            throw new Error('inital value');
        }
    };

    this.getGraphicsCard = () => {
        return graphicsCard;
    };

}

function Ultrabook() {
    Computer.apply(this, arguments);
}

function ComputingServer() {
    Computer.apply(this, arguments);
}

var main = new function () {
    this.computerType = ["ultrabook", "computingServer"];
    this.allStuff = [];

    this.startApp = () => {
        var ultrabook = new Ultrabook();
        ultrabook.setManufacturer("Apple");
        ultrabook.setGraphicsCard("Intel Iris");
        ultrabook.setProcessor("Intel i5");
        this.allStuff.push(ultrabook);

        var computingServer = new ComputingServer();
        computingServer.setManufacturer("Huawei");
        computingServer.setGraphicsCard("AMD");
        computingServer.setProcessor("Intel i9");
        this.allStuff.push(computingServer);

        this.addStuffToDOM(this.allStuff);

    };

    this.addStuffToDOM = function (stuffToAdd) {
        var cardContainer = document.getElementById("cardContainer");

        stuffToAdd.forEach(computer => {
            const P = "P",
                H6 = "H6",
                BUTTON = "button",
                CARD_ITEM_HTML_CLASS = "g--6 g-m--12 no-margin-vertical",
                CARD_BUTTON_EDIT_HTML_CLASS = "btn--raised btn--yellow g--5  g-m--12 no-nudge--m no-margin-vertical",
                CARD_BUTTON_DELETE_HTML_CLASS = "btn--raised btn--red g--5 nudge--left g-m--12 no-nudge--m no-margin-vertical";

            var card = document.createElement("div");
            card.className = "g--3 g-s--12 card m--1 container--wrap container--justify";

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "Manufacturer:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.getManufacturer());

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "GraphicsCard:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.getGraphicsCard());

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "Processor:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.getProcessor());

            var editButton = this.createCardElement(card, BUTTON, CARD_BUTTON_EDIT_HTML_CLASS, "Edit");
            editButton.onclick = this.onEditCartButton;

            var deleteButton = this.createCardElement(card, BUTTON, CARD_BUTTON_DELETE_HTML_CLASS, "Delete");
            deleteButton.onclick = this.onDeleteCardButton;

            cardContainer.appendChild(card);
        });
    };

    this.createCardElement = function (card, element, className, cardInnerText) {
        var cardElement = document.createElement(element);
        cardElement.className = className;
        cardElement.innerText = cardInnerText;
        card.appendChild(cardElement);

        return cardElement;
    };

    this.onEditCartButton = oMouthEvent => {
        var clickedCard = oMouthEvent.currentTarget.parentElement;
        var cardIndex = Array.from(clickedCard.parentElement.children).indexOf(clickedCard);
        if (cardIndex > -1) {
            alert(cardIndex);
        }
    };

    this.onDeleteCardButton = oMouthEvent => {
        var clickedCard = oMouthEvent.currentTarget.parentElement;
        var cardIndex = Array.from(clickedCard.parentElement.children).indexOf(clickedCard);
        if (cardIndex > -1) {
            this.allStuff.splice(cardIndex, 1);
            clickedCard.remove();
        }
    };

}();

main.startApp();

document.getElementById("createButton").onclick = function () {
    var computer = new Computer();
    main.allStuff.push(computer);
    main.addStuffToDOM([computer]);
};