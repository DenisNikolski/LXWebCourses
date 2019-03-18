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

    this.addStuffToDOM = stuffToAdd => {
        const P = "P",
            H6 = "H6",
            BUTTON = "button",
            CARD_ITEM_HTML_CLASS = "g--6 g-m--12 no-margin-vertical",
            CARD_BUTTON_EDIT_HTML_CLASS = "btn--raised btn--yellow g--5  g-m--12 no-nudge--m no-margin-vertical",
            CARD_BUTTON_DELETE_HTML_CLASS = "btn--raised btn--red g--5 nudge--left g-m--12 no-nudge--m no-margin-vertical",
            CARD_HTML_CLASS = "g--3 g-s--12 card m--1 container--wrap container--justify";

        var cardContainer = document.getElementById("cardContainer");

        stuffToAdd.forEach(computer => {
            var card = document.createElement("div");
            card.className = CARD_HTML_CLASS;

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "Manufacturer:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.getManufacturer());

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "GraphicsCard:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.getGraphicsCard());

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "Processor:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.getProcessor());

            // var hiddenInput = this.createCardElement(card, "input", "", "");
            // hiddenInput.type = "checkbox";
            // hiddenInput.id = "modal-edit-dummy";
            // hiddenInput.style = "display:block";

            var editButton = this.createCardElement(card, "label", "modal-trigger g--5  g-m--12 no-nudge--m no-margin-vertical", "Edit");
            editButton.onclick = this.onEditCardButton;
            editButton.htmlFor = "modal-edit";
            editButton.id = "update_modal_trigger";

            var deleteButton = this.createCardElement(card, BUTTON, CARD_BUTTON_DELETE_HTML_CLASS, "Delete");
            deleteButton.onclick = this.onDeleteCardButton;

            cardContainer.appendChild(card);
        });
    };

    this.createCardElement = (card, element, className, cardInnerText) => {
        var cardElement = document.createElement(element);
        cardElement.className = className;
        cardElement.innerText = cardInnerText;
        card.appendChild(cardElement);

        return cardElement;
    };

    this.onEditCardButton = oMouthEvent => {
        var clickedButton = oMouthEvent.currentTarget;
        var clickedCard = clickedButton.parentElement;
        var cardIndex = Array.from(clickedCard.parentElement.children).indexOf(clickedCard);
        var hiddenCheckBox = clickedCard.childNodes[8];
        // var hiddenCheckBox = document.getElementById("modal-edit-dummy")

        if (cardIndex > -1) {
            var prevModalContent = document.getElementById("modal-content-edit");

            if (prevModalContent) {
                prevModalContent.remove();
                // hiddenCheckBox.id = "modal-edit-dummy";
                // clickedButton.htmlFor = "modal-edit-dummy";
                hiddenCheckBox.remove();
                return;
            }

            var hiddenCheckBox = this.createCardElement(clickedCard, "input", "", "");
            hiddenCheckBox.type = "checkbox";
            hiddenCheckBox.id = "modal-edit";
            hiddenCheckBox.style = "display:block";

            // clickedButton.htmlFor = "modal-edit";
            // hiddenCheckBox.id = "modal-edit";
            // hiddenCheckBox.checked = true;

            var modalContent = document.createElement("div");
            modalContent.className = "modal-content g--4";
            modalContent.id = "modal-content-edit"
            clickedCard.appendChild(modalContent);

            var formInputManufacturer = document.createElement("input");
            formInputManufacturer.type = "text";
            formInputManufacturer.value = clickedCard.childNodes[1].innerText;
            formInputManufacturer.id = "ManufacturerEdit";
            formInputManufacturer.placeholder = "Manufacturer";
            modalContent.appendChild(formInputManufacturer);

            var formButtonOk = document.createElement("button");
            formButtonOk.className = "btn--raised btn--green g--10";
            formButtonOk.innerText = "ok";
            modalContent.appendChild(formButtonOk);

            // clickedCard.appendChild(editBtnContariner);

            // document.getElementById("update_modal_trigger").click();
            // alert(cardIndex);
            hiddenCheckBox.checked = true;
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

document.getElementById("createButton").onclick = oMouthEvent => {
    oMouthEvent.preventDefault();

    var graphicsCard = document.getElementById("GraphicsCard");
    var processor = document.getElementById("Processor");
    var manufacturer = document.getElementById("Manufacturer");


    switch (document.getElementById("computerClass").value) {
        case "Ultrabook":
            var newComputer = new Ultrabook();
        case "ComputingServer":
            var newComputer = new ComputingServer();
        default:
            console.log("no such class");
    }

    try {
        newComputer.setGraphicsCard(graphicsCard.value);
        newComputer.setManufacturer(manufacturer.value);
        newComputer.setProcessor(processor.value);
    } catch (error) {
        alert(error);
        return;
    }

    main.allStuff.push(newComputer);
    main.addStuffToDOM([newComputer]);
    document.getElementById("create_modal_trigger").click();

    graphicsCard.value = "";
    manufacturer.value = "";
    processor.value = "";
};

document.getElementById("cancelLink").onclick = () => {
    document.getElementById("create_modal_trigger").click();
    document.getElementById("GraphicsCard").value = "";
    document.getElementById("GraphicsCard").value = "";
    document.getElementById("Manufacturer").value = "";
    document.getElementById("Processor").value = "";
};