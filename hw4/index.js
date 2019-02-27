function Computer(_processor, manufacturer, graphicsCard) {
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

};

var comp1 = new Computer();
comp1.setProcessor(123);
console.log(comp1.getProcessor());