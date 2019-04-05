class Computer {
    constructor() {
        this.processor = 0;
        this.manufacturer = "";
        this.graphicsCard = "";
    }

    setProcessor(processor) {
        if (processor) {
            this.processor = processor;
        } else {
            throw new Error('initial value');
        }
    }

    getProcessor() {
        return this.processor;
    }

    setManufacturer(manufacturer) {
        if (manufacturer) {
            this.manufacturer = manufacturer;
        } else {
            throw new Error('initial value');
        }
    }

    getManufacturer() {
        return this.manufacturer;
    }

    setGraphicsCard(graphicsCard) {
        if (graphicsCard) {
            this.graphicsCard = graphicsCard;
        } else {
            throw new Error('initial value');
        }
    }

    getGraphicsCard() {
        return this.graphicsCard;
    }
}

class Ultrabook extends Computer {
    constructor() {
        super();
    }
}

class ComputingServer extends Computer {
    constructor() {
        super();
    }
}

const main = new function () {
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
        const P = "<P/>",
            H6 = "<H6/>",
            BUTTON = "<button/>",
            FORM = "<form/>",
            CARD_ITEM_FORM_HTML_CLASS = "g--5  g-m--12 no-nudge--m no-margin-vertical",
            CARD_ITEM_HTML_CLASS = "g--6 g-m--12 no-margin-vertical",
            CARD_BUTTON_EDIT_HTML_CLASS = "btn--raised btn--yellow g--5 g-m--12 no-nudge--m no-margin-vertical",
            CARD_BUTTON_DELETE_HTML_CLASS = "btn--raised btn--red g--12 nudge--left no-nudge--m no-margin-vertical",
            CARD_HTML_CLASS = "g--3 g-s--12 card m--1 container--wrap container--justify";

        this.allStuff = this.allStuff.concat(stuffToAdd);

        const cardContainer = $("#cardContainer");

        stuffToAdd.forEach(computer => {
            const card = $('<div/>');
            card.addClass(CARD_HTML_CLASS);

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "Manufacturer:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.manufacturer);

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "GraphicsCard:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.graphicsCard);

            this.createCardElement(card, H6, CARD_ITEM_HTML_CLASS, "Processor:");
            this.createCardElement(card, P, CARD_ITEM_HTML_CLASS, computer.processor);

            const editButton = this.createCardElement(card, BUTTON, CARD_BUTTON_EDIT_HTML_CLASS, "Edit");
            editButton.click(this.onEditCardButton);

            const deleteForm = this.createCardElement(card, FORM, CARD_ITEM_FORM_HTML_CLASS);
            const deleteButton = this.createCardElement(deleteForm, BUTTON, CARD_BUTTON_DELETE_HTML_CLASS, "Delete");
            deleteButton.click(this.onDeleteCardButton);

            cardContainer.append(card);
        });
    };

    this.createCardElement = (card, element, className, elementInnerText) => {

        const cardElement = $(element);
        if (className) cardElement.addClass(className);
        if (elementInnerText) cardElement.text(elementInnerText);
        card.append(cardElement);

        return cardElement;
    };

    this.onEditCardButton = oMouthEvent => {
        const clickedButton = oMouthEvent.currentTarget;
        const clickedCard = clickedButton.parentElement;
        const cardIndex = Array.from(clickedCard.parentElement.children).indexOf(clickedCard);
        const hiddenCheckBox = clickedCard.childNodes[8];

        if (cardIndex > -1) {
            const prevModalContent = $("#modal-content-edit");

            if (prevModalContent.length !== 0) {
                prevModalContent.remove();
                hiddenCheckBox.remove();
                $(clickedButton).attr("id", "");
                return;
            }
            this.createEditModal(clickedButton, clickedCard);
        }
    };

    this.createEditModal = (clickedButton, clickedCard) => {
        $(clickedButton).attr("id", "modal-edit-btn-");
        const hiddenCheckBox = this.createCardElement($(clickedCard), "<input/>", "", "");
        hiddenCheckBox.attr({type: "checkbox", id: "modal-edit", checked: true});

        const modalContent = $("<div/>");
        modalContent.attr({class: "modal-content g--4", id: "modal-content-edit"});
        $(clickedCard).append(modalContent);

        const form = $("<form/>");
        modalContent.append(form);

        this.createEditModalInput(form, "<input/>", clickedCard.childNodes[1].innerText,
            "ManufacturerEdit", "Manufacturer");

        this.createEditModalInput(form, "<input/>", clickedCard.childNodes[3].innerText,
            "GraphicsCardEdit", "GraphicsCard");

        this.createEditModalInput(form, "<input/>", clickedCard.childNodes[5].innerText,
            "ProcessorEdit", "Processor");

        const formButtonOk = $("<button/>");
        formButtonOk.addClass("btn--raised btn--green g--10");
        formButtonOk.text("ok");

        formButtonOk.click(this.updateComputer);
        form.append(formButtonOk);
    };

    this.createEditModalInput = (modalContent, element, inputValue, inputId, inputPlaceholder) => {
        const formInput = $(element);
        formInput.attr({
            type: "text",
            value: inputValue,
            id: inputId,
            placeholder: inputPlaceholder,
            required: true
        });
        modalContent.append(formInput);
        return formInput;
    };

    this.updateComputer = (oMouthEvent) => {
        oMouthEvent.preventDefault();

        const clickedCard = oMouthEvent.currentTarget.parentElement.parentElement.parentElement;
        const cardIndex = Array.from(clickedCard.parentElement.children).indexOf(clickedCard);

        if (cardIndex > -1) {
            const clickedComputer = this.allStuff[cardIndex];
            const processorEditValue = $("#ProcessorEdit").val();
            const manufacturerEditValue = $("#ManufacturerEdit").val();
            const graphicsCardEditValue = $("#GraphicsCardEdit").val();

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

        const clickedCard = oMouthEvent.currentTarget.parentElement.parentElement;
        const cardIndex = Array.from(clickedCard.parentElement.children).indexOf(clickedCard);
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

$("#createButton").click(oMouthEvent => {
    oMouthEvent.preventDefault();

    const graphicsCard = $("#GraphicsCard");
    const processor = $("#Processor");
    const manufacturer = $("#Manufacturer");

    let newComputer;
    switch ($("#computerClass").val()) {
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
        newComputer.setGraphicsCard(graphicsCard.val());
        newComputer.setManufacturer(manufacturer.val());
        newComputer.setProcessor(processor.val());
    } catch (error) {
        alert(error);
        return;
    }

    dpd.nikolskicomputers.post({
        "processor": processor.val(),
        "manufacturer": manufacturer.val(),
        "graphicsCard": graphicsCard.val()
    }, function (result, err) {
        if (err) return console.log(err);
        console.log(result, result.id);
    }).then(() => {
        location.reload();
    });
});

$("#cancelLink").click(() => {
    $('#create_modal_trigger').click();
    $('#GraphicsCard').val("");
    $('#Manufacturer').val("");
    $('#Processor').val("");
});