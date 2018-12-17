(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
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

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("http://p240179.mittwaldserver.info/biallo-mlab-data/histories.json", function(resp) {
            console.log(resp)
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
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

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "biallo mlab data"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
