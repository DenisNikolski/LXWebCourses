sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sap.ui.demo.db.controller.App", {
        onItemSelected: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("people");
            var sPath = oContext.getPath();
            var oProductDetailPanel = this.byId("PersonDetailsPanel");
            oProductDetailPanel.bindElement({
                path: sPath,
                model: "people"
            });

            var oAddressDetailPanel = this.byId("addressDetailsPanel");
            oAddressDetailPanel.bindElement({
                path: sPath,
                model: "people"
            });
        }
    });
});