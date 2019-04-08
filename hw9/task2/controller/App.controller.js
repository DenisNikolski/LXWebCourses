sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("sap.ui.demo.db.controller.App", {
        onItemSelected: function (oEvent) {
            var oSelectedItem = oEvent.getSource();
            var oContext = oSelectedItem.getBindingContext("products");
            var sPath = oContext.getPath();
            var oProductDetailPanel = this.byId("productDetailsPanel");
            oProductDetailPanel.bindElement({
                path: sPath,
                model: "products"
            });

            var oAddressDetailPanel = this.byId("addressDetailsPanel");
            oAddressDetailPanel.bindElement({
                path: sPath,
                model: "products"
            });
        }
    });
});