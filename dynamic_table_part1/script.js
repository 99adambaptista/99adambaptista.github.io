/*
    Adam Baptista
    10/25/2021

    script file for the table.html page
*/
//jquery validator checking
//https://www.sitepoint.com/basic-jquery-form-validation-tutorial/
$(function() {
    //checks if start width is greater than end width
    $.validator.addMethod("widthCheck", function(value, param) {
        if (parseInt($("#s_width").val()) > parseInt($("#e_width").val())) {
            return false;
        }
        return true;
    }, "End must be greater than start.");
    //checks if start height is greater than end height
    $.validator.addMethod("heightCheck", function(value, param) {
        if (parseInt($("#s_height").val()) > parseInt($("#e_height").val())) {
            return false;
        }
        return true;
    }, "End must be greater than start.");
    //checks if any inputs are decimals
    $.validator.addMethod("intCheck", function(value, element) {
        return Number.isInteger(parseFloat(value));
    }, "Please enter a whole number.");
    //validation
    $("form[name='table_param']").validate({
        rules: {
            s_width: {
                required: true,
                range: [-50, 50],
                intCheck: true,
            },
            e_width: {
                required: true,
                range: [-50, 50],
                intCheck: true,
                widthCheck: "#s_width"
            },
            s_height: {
                required: true,
                range: [-50, 50],
                intCheck: true
            },
            e_height: {
                required: true,
                range: [-50, 50],
                intCheck: true,
                heightCheck: "#s_height"
            }
        }
    });
    $("button").on("click", function() {
        if ($("form[name='table_param']").valid()) {
            gen_table();
        }
    });
});

/*
Table generation function, called by clicking the "create" button in table.html

@param      None
@return     None
*/
function gen_table() {
    /*
    sW: Int     Start width
    eW: Int     End width
    sH: Int     Start height
    eH: Int     End height
    */
    var sW = parseInt(document.getElementById("s_width").value);
    var eW = parseInt(document.getElementById("e_width").value);
    var sH = parseInt(document.getElementById("s_height").value);
    var eH = parseInt(document.getElementById("e_height").value);

    var table = "";

    /*
    Error checking to make sure start isnt larger than the end and not out of bounds
    restrictions: start < end, -50 < x < 50

    Will display error messages instead of the table if the above requirements are
    not met
    */
    if (sW > eW || sH > eH) {
        table = "<em>Error, start can not be greater than end.</em><br>"
    } else if (sW < -50 || sH < -50) {
        table = "<em>Error, start can not be less than -50.</em><br>"
    } else if (eW > 50 || eH > 50) {
        table = "<em>Error, end can not be greater than 50.</em><br>"
    } else {
        /*
        first loop is for the top row header
        */
        table = "<table><tr><th id='x'>x</th>";
        for (var i = sW; i <= eW; i++) {
            table += "<th>" + i + "</th>";
        }
        table += "</tr>";

        for (var i = sH; i <= eH; i++) {
            //This line is for the second header in the first column
            table += "<tr><th>" + i + "</th>";

            //math for the multiplication table
            for (var j = sW; j <= eW; j++) {
                table += "<th>" + i * j + "</th>";
            }
            table += "</tr>";
        }

        table += "</table>";
    }

    document.getElementById("dynamic_table").innerHTML = table;
}