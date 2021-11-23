/*
    Adam Baptista
    10/25/2021

    script file for the table.html page
*/
var table_count = 1;

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
    //form validation rules
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
    //slider code
    $("#sw_slider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) { //When sliding the toggle
            updateInputFromSlider("#s_width", $(this).slider("value"));
            $("#table_output").tabs({ active: 0 });
        },
        //added change so that table only updates on mouse up on slider, makes my laptop slow with updates on slide
        change: function(event, ui) { //When releasing the toggle
            updateInputFromSlider("#s_width", $(this).slider("value"));
            $("#table_output").tabs({ active: 0 });
            if ($("form[name='table_param']").valid()) {
                draw_table(create_table());
            }
        }
    });
    $("#ew_slider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            updateInputFromSlider("#e_width", $(this).slider("value"));
            $("#table_output").tabs({ active: 0 });
        },
        change: function(event, ui) {
            updateInputFromSlider("#e_width", $(this).slider("value"));
            $("#table_output").tabs({ active: 0 });
            if ($("form[name='table_param']").valid()) {
                draw_table(create_table());
            }
        }
    });
    $("#sh_slider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            updateInputFromSlider("#s_height", $(this).slider("value"));
            $("#table_output").tabs({ active: 0 });
        },
        change: function(event, ui) {
            updateInputFromSlider("#s_height", $(this).slider("value"));
            $("#table_output").tabs({ active: 0 });
            if ($("form[name='table_param']").valid()) {
                draw_table(create_table());
            }
        }
    });
    $("#eh_slider").slider({
        min: -50,
        max: 50,
        step: 1,
        value: 0,
        slide: function(event, ui) {
            updateInputFromSlider("#e_height", $(this).slider("value"));
            $("#table_output").tabs({ active: 0 });
        },
        change: function(event, ui) {
            updateInputFromSlider("#e_height", $(this).slider("value"));
            $("#table_output").tabs({ active: 0 });
            if ($("form[name='table_param']").valid()) {
                draw_table(create_table());
            }
        }
    });

    //updates sliders on input
    $(".param").on("change", function() {
        $("." + this.id).slider("value", parseInt(this.value));
        if ($("form[name='table_param']").valid()) {
            draw_table(create_table());
        }
        $("#table_output").tabs({ active: 0 });
    });

    //init tabs
    $("#table_output").tabs();

    //button for adding tabs
    $("#saveTab").on("click", function() {
        if ($("form[name='table_param']").valid()) {
            //tab naming
            var width = $("#e_width").val() - $("#s_width").val();
            var height = $("#e_height").val() - $("#s_height").val();
            var tab_name = width + "x" + height;

            //append tab data with checkmark and delete button
            $("#tables").append(
                "<li class='temp' id='b" + table_count + "'><input class='bDel' id='b" + table_count + "' type='button' value='x' onclick='delButton(this.id)'><a href='#tab" +
                table_count + "'>" + tab_name + " Table</a></li>"
            );
            $("#table_output").append(
                "<div class='tab' id='tab" + table_count +
                "'>" + create_table() + "</div>"
            );
            //refresh for styling
            $("#table_output").tabs("refresh");
            $("#table_output").tabs("option", "active", -1);

            //to keep track of tabs
            table_count++;
        }
    });

    //delete all tabs
    $("#delTabs").on("click", function() {
        $("#table_output ul .temp").each(function() {
            $("#" + $(this).attr("aria-controls")).remove();
            $(this).remove()
            $("#table_output").tabs("refresh");
        });
    });


});

//delete button on the top right of each tab
function delButton(button_id) {
    $("#ta" + button_id).remove();
    button_id = "#" + button_id;
    $(button_id).remove();
    $("#table_output").tabs("refresh");
}


/*
Table generation function, called by clicking the "create" button in table.html

@param      None
@return     None
*/
function create_table() {
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
    first loop is for the top row header
    */
    table = "<p><table><tr><th id='x'>x</th>";
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

    table += "</table></p>";

    return table;
}

function draw_table(table) {
    document.getElementById("tab0").innerHTML = table;
}

//update slider in real time
//https://write.corbpie.com/updating-an-input-value-from-a-jquery-slider/
function updateInputFromSlider(input_id, value) {
    $(input_id).val(value);
}