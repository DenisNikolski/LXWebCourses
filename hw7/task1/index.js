var tableBody = $("#table").find('tbody');

$.get("https://services.odata.org/V4/(S(srg3pj2qhftjrzv0oh4gpzva))/TripPinServiceRW/People?$top=5&$skip=2",
    function (oResult) {
        tableBody.append($('<tr>').append($('<td>').text('$top=5&$skip=2')))
        oResult.value.forEach(element => {
            tableBody.append($(`<tr><td>${element.FirstName}</td><td>${element.LastName}</td></tr>`))
        });
    });

$.get("https://services.odata.org/V4/(S(srg3pj2qhftjrzv0oh4gpzva))/TripPinServiceRW/People?$select=FirstName",
    function (oResult) {
        tableBody.append($('<tr>').append($('<td>').text('$select=FirstName')))
        oResult.value.forEach(element => {
            tableBody.append($(`<tr><td>${element.FirstName}</td></tr>`));
        });
    }
);

$.get("https://services.odata.org/V4/(S(srg3pj2qhftjrzv0oh4gpzva))/TripPinServiceRW/People/$count",
    function (oResult) {
        tableBody.append($(`<tr><td>$count</td>`));
        tableBody.append($(`<tr><td>${oResult}</td></tr>`));
    }
);

$.get("https://services.odata.org/V4/(S(srg3pj2qhftjrzv0oh4gpzva))/TripPinServiceRW/People('russellwhyte')?$expand=Trips",
    function (oResult) {
        tableBody.append($(`<tr><td>$expand</td>`));
        oResult.Trips.forEach(element => {
            tableBody.append($(`<tr><td>${element.Description}</td></tr>`));
        });
    }
);

$.get("https://services.odata.org/V4/(S(srg3pj2qhftjrzv0oh4gpzva))/TripPinServiceRW/People?$orderby=FirstName",
    function (oResult) {
        tableBody.append($(`<tr><td>$orderby=FirstName</td>`));
        oResult.value.forEach(element => {
            tableBody.append($(`<tr><td>${element.FirstName}</td><td>${element.LastName}</td></tr>`))
        });
    }
);

$.get("https://services.odata.org/V4/(S(srg3pj2qhftjrzv0oh4gpzva))/TripPinServiceRW/People?$search=Guess",
    function (oResult) {
        tableBody.append($(`<tr><td>$search=Guess </td>`));
        oResult.value.forEach(element => {
            tableBody.append($(`<tr><td>${element.FirstName}</td><td>${element.LastName}</td></tr>`))
        });
    }
);

$.get("https://services.odata.org/V4/(S(srg3pj2qhftjrzv0oh4gpzva))/TripPinServiceRW/People?$filter=FirstName eq 'Javier' or LastName eq 'Mundy'",
    function (oResult) {
        tableBody.append($(`<tr><td>$filter=FirstName eq 'Javier' or LastName eq 'Mundy'</td>`));
        oResult.value.forEach(element => {
            tableBody.append($(`<tr><td>${element.FirstName}</td><td>${element.LastName}</td></tr>`))
        });
    }
);

$.get("https://services.odata.org/V4/(S(srg3pj2qhftjrzv0oh4gpzva))/TripPinServiceRW/People?$filter=startswith(FirstName,'R') and endswith(LastName,'e')&Gender eq 'Male'",
    function (oResult) {
        tableBody.append($(`<tr><td>$filter=startswith(FirstName,'R') and endswith(LastName,'e')&Gender eq 'Male'</td></tr>`));
        oResult.value.forEach(element => {
            tableBody.append($(`<tr><td>${element.FirstName}</td><td>${element.LastName}</td><td>${element.Gender}</td></tr>`))
        });
    }
);

$.get("https://services.odata.org/V4/(S(srg3pj2qhftjrzv0oh4gpzva))/TripPinServiceRW/People?$orderby=LastName&$top=5&$skip=2",
    function (oResult) {
        tableBody.append($('<tr>').append($('<td>').text('$top=5&$skip=2$orderby=LastName')))
        oResult.value.forEach(element => {
            tableBody.append($(`<tr><td>${element.FirstName}</td><td>${element.LastName}</td></tr>`))
        });
    });