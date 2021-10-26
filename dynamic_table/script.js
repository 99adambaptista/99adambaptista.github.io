/*
    Adam Baptista
    10/25/2021

    script file for the table.html page
*/


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
        table = "<table><tr><th>x</th>";
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