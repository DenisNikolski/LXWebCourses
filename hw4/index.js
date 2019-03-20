function Computer() {
    this.processor = 0;
    this.manufacturer = "";
    this.graphicsCard = "";
}

Computer.prototype.setProcessor = function (processor) {
    if (processor) {
        this.processor = processor;
    } else {
        throw new Error('inital value');
    }
};

Computer.prototype.getProcessor = function () {
    return this.processor;
};

Computer.prototype.setManufacturer = function (manufacturer) {
    if (manufacturer) {
        this.manufacturer = manufacturer;
    } else {
        throw new Error('inital value');
    }
};

Computer.prototype.getManufacturer = function () {
    return this.manufacturer;
};

Computer.prototype.setGraphicsCard = function (graphicsCard) {
    if (graphicsCard) {
        this.graphicsCard = graphicsCard;
    } else {
        throw new Error('inital value');
    }
};

Computer.prototype.getGraphicsCard = function () {
    return this.graphicsCard;
};

function Ultrabook() {}
Ultrabook.prototype = Object.create(Computer.prototype);

function ComputingServer() {}
ComputingServer.prototype = Object.create(Computer.prototype);

var main = new function () {
    this.computerType = ["ultrabook", "computingServer"];
    this.allStuff = [];

    this.startApp = () => {
        dpd.nikolskicomputers.get(function (result, err) {
                if (err) return console.log(err);
                console.log(result);
            })
            .then(result => {
                this.addStuffToDOM(result);
            });
    };

    this.addStuffToDOM = function (stuffToAdd) {
        const P = "P",
            H6 = "H6",
            BUTTON = "button",
            FORM = "form",
            CARD_IMEM_FORM_HTML_CLASS = "g--5  g-m--12 no-nudge--m no-margin-vertical",
            CARD_ITEM_HTML_CLASS = "g--6 g-m--12 no-margin-vertical",
            CARD_BUTTON_EDIT_HTML_CLASS = "btn--raised btn--yellow g--5 g-m--12 no-nudge--m no-margin-vertical",
            CARD_BUTTON_DELETE_HTML_CLASS = "btn--raised btn--red g--12 nudge--left no-nudge--m no-margin-vertical",
            CARD_HTML_CLASS = "g--3 g-s--12 card m--1 container--wrap container--justify";

        this.allStuff = this.allStuff.concat(stuffToAdd);

        var cardContainer = document.getElementById("cardContainer");

        stuffToAdd.forEach(computer => {
            var card = document.createElement("div");
            card.className = CARD_HTML_CLASS;

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "Manufacturer:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.manufacturer);

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "GraphicsCard:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.graphicsCard);

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "Processor:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.processor);

            var editButton = this.createCardElement(card, BUTTON, CARD_BUTTON_EDIT_HTML_CLASS, "Edit");
            editButton.onclick = this.onEditCardButton;

            var deleteForm = this.createCardElement(card, FORM, CARD_IMEM_FORM_HTML_CLASS);
            var deleteButton = this.createCardElement(deleteForm, BUTTON, CARD_BUTTON_DELETE_HTML_CLASS, "Delete");
            deleteButton.onclick = this.onDeleteCardButton;

            cardContainer.appendChild(card);
        });
    };

    this.createCardElement = (card, element, className, elementInnerText) => {
        var cardElement = document.createElement(element);
        if (className) cardElement.className = className;
        if (elementInnerText) cardElement.innerText = elementInnerText;
        card.appendChild(cardElement);

        return cardElement;
    };

    this.onEditCardButton = oMouthEvent => {
        var clickedButton = oMouthEvent.currentTarget;
        var clickedCard = clickedButton.parentElement;
        var cardIndex = Array.from(clickedCard.parentElement.children).indexOf(clickedCard);
        var hiddenCheckBox = clickedCard.childNodes[8];

        if (cardIndex > -1) {
            var prevModalContent = document.getElementById("modal-content-edit");

            if (prevModalContent) {
                prevModalContent.remove();
                hiddenCheckBox.remove();
                clickedButton.id = "";
                return;
            }
            this.createEditModal(clickedButton, clickedCard);
        }
    };

    this.createEditModal = (clickedButton, clickedCard) => {
        clickedButton.id = "modal-edit-btn-";
        var hiddenCheckBox = this.createCardElement(clickedCard, "input", "", "");
        hiddenCheckBox.type = "checkbox";
        hiddenCheckBox.id = "modal-edit";

        var modalContent = document.createElement("div");
        modalContent.className = "modal-content g--4";
        modalContent.id = "modal-content-edit";
        clickedCard.appendChild(modalContent);

        var form = document.createElement("form");
        modalContent.appendChild(form);

        this.createEditModalInput(form, "input", clickedCard.childNodes[1].innerText,
            "ManufacturerEdit", "Manufacturer");

        this.createEditModalInput(form, "input", clickedCard.childNodes[3].innerText,
            "GraphicsCardEdit", "GrapgicsCard");

        this.createEditModalInput(form, "input", clickedCard.childNodes[5].innerText,
            "ProcessorEdit", "Processor");

        var formButtonOk = document.createElement("button");
        formButtonOk.className = "btn--raised btn--green g--10";

        formButtonOk.innerText = "ok";
        formButtonOk.onclick = this.updateComputer;
        form.appendChild(formButtonOk);

        hiddenCheckBox.checked = true;
    };

    this.createEditModalInput = (modalContent, element, inputValue, inputId, inputPlaceholder) => {
        var formInput = document.createElement(element);
        formInput.type = "text";
        formInput.value = inputValue;
        formInput.id = inputId;
        formInput.placeholder = inputPlaceholder;
        formInput.required = true;
        modalContent.appendChild(formInput);

        return formInput;
    };

    this.updateComputer = (oMouthEvent) => {
        oMouthEvent.preventDefault();

        var clickedCard = oMouthEvent.currentTarget.parentElement.parentElement.parentElement;
        var cardIndex = Array.from(clickedCard.parentElement.children).indexOf(clickedCard);

        if (cardIndex > -1) {
            var clickedComputer = this.allStuff[cardIndex];
            var processorEditValue = document.getElementById("ProcessorEdit").value;
            var manufacturerEditValue = document.getElementById("ManufacturerEdit").value;
            var graphicsCardEditValue = document.getElementById("GraphicsCardEdit").value;

            dpd.nikolskicomputers.put(clickedComputer.id, {
                "processor": processorEditValue,
                "manufacturer": manufacturerEditValue,
                "graphicsCard": graphicsCardEditValue
            }, function (result, err) {
                if (err) return console.log(err);
                console.log(result, result.id);
            }).then(() => {
                location.reload();
            });
        }
    };

    this.onDeleteCardButton = oMouthEvent => {
        oMouthEvent.preventDefault();

        var clickedCard = oMouthEvent.currentTarget.parentElement.parentElement;
        var cardIndex = Array.from(clickedCard.parentElement.children).indexOf(clickedCard);
        if (cardIndex > -1) {
            dpd.nikolskicomputers.del(this.allStuff[cardIndex].id, function (err) {
                if (err) console.log(err);
            }).then(() => {
                location.reload();
            });
        }
    };
}();

main.startApp();

document.getElementById("createButton").onclick = oMouthEvent => {
    oMouthEvent.preventDefault();

    var graphicsCard = document.getElementById("GraphicsCard");
    var processor = document.getElementById("Processor");
    var manufacturer = document.getElementById("Manufacturer");

    var newComputer;
    switch (document.getElementById("computerClass").value) {
        case "Ultrabook":
            newComputer = new Ultrabook();
            break;
        case "ComputingServer":
            newComputer = new ComputingServer();
            break;
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

    dpd.nikolskicomputers.post({
        "processor": processor.value,
        "manufacturer": manufacturer.value,
        "graphicsCard": graphicsCard.value
    }, function (result, err) {
        if (err) return console.log(err);
        console.log(result, result.id);
    }).then(() => {
        location.reload();
    });
};

document.getElementById("cancelLink").onclick = () => {
    document.getElementById("create_modal_trigger").click();
    document.getElementById("GraphicsCard").value = "";
    document.getElementById("GraphicsCard").value = "";
    document.getElementById("Manufacturer").value = "";
    document.getElementById("Processor").value = "";
};