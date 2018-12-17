(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "_id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "userId",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "type",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "text",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "date",
        dataType: tableau.dataTypeEnum.datetime
    }];

    var tableSchema = {
        id: "bialloFeed",
        alias: "all biallo histories",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

    myConnector.getData = function(table, doneCallback) {
        var path = "http://p240179.mittwaldserver.info/biallo-mlab-data/histories.json"
    $.getJSON(path, function(resp) {
        var data = resp.data,
            tableData = [];
        tableau.log(tableData)

        // Iterate over the JSON object
        for (var i = 0, len = data.length; i < len; i++) {
            tableData.push({
                "_id": data[i]._id.$oid,
                "userId": data[i].userId,
                "type": data[i].message.type,
                "text": data[i].message.text,
                "date": data[i].date.$date
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "biallo mlab data";
        tableau.submit();
    });
});
})();