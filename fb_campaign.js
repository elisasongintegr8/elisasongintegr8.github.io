(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "date_start",
        dataType: tableau.dataTypeEnum.datetime
    }, {
        id: "date_stop",
        dataType: tableau.dataTypeEnum.datetime
    }, {
        id: "impressions",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "spend",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "account_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "campaign_id",
        dataType: tableau.dataTypeEnum.string
    }];

    var tableSchema = {
        id: "earthquakeFeed",
        alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

    myConnector.getData = function(table, doneCallback) {
        var path = "https://graph.facebook.com/v3.2/23843102277980480/insights?time_increment=1&date_preset=lifetime&access_token=EAAIPQGpZCMrUBALWtSvPi7ZClj7jZCmt0MSK7nPes8ccIDQvDRgJH58dddQ4SBwTwrr3tmZBGmUZCLDDz4MvZBT52UVWy6vu6TqdBhsWJ4NQhZBcHNWZCquP73OA4yGRZBm69mkwsjZBROQ7G7VRGiIjnJ1DOJgrZAymC1c4OX3wtLN0N8mgw4zswpHtb0uYlYjD4IZD"
    $.getJSON(path, function(resp) {
        var data = resp.data,
            tableData = [];
        tableau.log(tableData)

        // Iterate over the JSON object
        for (var i = 0, len = data.length; i < len; i++) {
            tableData.push({
                "date_start": data[i].date_start,
                "date_stop": data[i].date_stop,
                "impressions": data[i].impressions,
                "spend": data[i].spend,
                "account_id": data[i].account_id,
                "campaign_id": data[i].campaign_id
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "USGS Earthquake Feed";
        tableau.submit();
    });
});
})();