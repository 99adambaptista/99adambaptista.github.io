/*
Adam Baptista
HW5

12/16/2021
https://github.com/99adambaptista

refrences:
https://jqueryui.com/
http://yongcho.github.io/GUI-Programming-1/assignment9.html

other sources included as comments before related code
*/

"use strict";

//variables
var REMAINING_LETTERS;
var SCORE = 0;
var LETTERS = [];
var TOTAL_SCORE = 0;
var WORD = [".", ".", ".", ".", ".", ".", "."];

//pieces data from pieces.json
var data = {
    "pieces": [
        { "letter": "A", "value": 1, "amount": 9, "image": "/Scrabble_Tiles/Scrabble_Tile_A.jpg" },
        { "letter": "B", "value": 3, "amount": 2, "image": "/Scrabble_Tiles/Scrabble_Tile_B.jpg" },
        { "letter": "C", "value": 3, "amount": 2, "image": "/Scrabble_Tiles/Scrabble_Tile_C.jpg" },
        { "letter": "D", "value": 2, "amount": 4, "image": "/Scrabble_Tiles/Scrabble_Tile_D.jpg" },
        { "letter": "E", "value": 1, "amount": 12, "image": "/Scrabble_Tiles/Scrabble_Tile_E.jpg" },
        { "letter": "F", "value": 4, "amount": 2, "image": "/Scrabble_Tiles/Scrabble_Tile_F.jpg" },
        { "letter": "G", "value": 2, "amount": 3, "image": "/Scrabble_Tiles/Scrabble_Tile_G.jpg" },
        { "letter": "H", "value": 4, "amount": 2, "image": "/Scrabble_Tiles/Scrabble_Tile_H.jpg" },
        { "letter": "I", "value": 1, "amount": 9, "image": "/Scrabble_Tiles/Scrabble_Tile_I.jpg" },
        { "letter": "J", "value": 8, "amount": 1, "image": "/Scrabble_Tiles/Scrabble_Tile_J.jpg" },
        { "letter": "K", "value": 5, "amount": 1, "image": "/Scrabble_Tiles/Scrabble_Tile_K.jpg" },
        { "letter": "L", "value": 1, "amount": 4, "image": "/Scrabble_Tiles/Scrabble_Tile_L.jpg" },
        { "letter": "M", "value": 3, "amount": 2, "image": "/Scrabble_Tiles/Scrabble_Tile_M.jpg" },
        { "letter": "N", "value": 1, "amount": 6, "image": "/Scrabble_Tiles/Scrabble_Tile_N.jpg" },
        { "letter": "O", "value": 1, "amount": 8, "image": "/Scrabble_Tiles/Scrabble_Tile_O.jpg" },
        { "letter": "P", "value": 3, "amount": 2, "image": "/Scrabble_Tiles/Scrabble_Tile_P.jpg" },
        { "letter": "Q", "value": 10, "amount": 1, "image": "/Scrabble_Tiles/Scrabble_Tile_Q.jpg" },
        { "letter": "R", "value": 1, "amount": 6, "image": "/Scrabble_Tiles/Scrabble_Tile_R.jpg" },
        { "letter": "S", "value": 1, "amount": 4, "image": "/Scrabble_Tiles/Scrabble_Tile_S.jpg" },
        { "letter": "T", "value": 1, "amount": 6, "image": "/Scrabble_Tiles/Scrabble_Tile_T.jpg" },
        { "letter": "U", "value": 1, "amount": 4, "image": "/Scrabble_Tiles/Scrabble_Tile_U.jpg" },
        { "letter": "V", "value": 4, "amount": 2, "image": "/Scrabble_Tiles/Scrabble_Tile_V.jpg" },
        { "letter": "W", "value": 4, "amount": 2, "image": "/Scrabble_Tiles/Scrabble_Tile_W.jpg" },
        { "letter": "X", "value": 8, "amount": 1, "image": "/Scrabble_Tiles/Scrabble_Tile_X.jpg" },
        { "letter": "Y", "value": 4, "amount": 2, "image": "/Scrabble_Tiles/Scrabble_Tile_Y.jpg" },
        { "letter": "Z", "value": 10, "amount": 1, "image": "/Scrabble_Tiles/Scrabble_Tile_Z.jpg" }
        //{ "letter": "Blank", "value": 0, "amount": 2, "image": "/Scrabble_Tiles/Scrabble_Tile_Blank.jpg" }
    ],
    "creator": "Ramon Meza"
};

//adds avaliable letters to stack
for (var i = 0; i < data.pieces.length; i++) {
    for (var j = 0; j < data.pieces[i].amount; j++) {
        LETTERS.push(data.pieces[i].letter);
    }
}
REMAINING_LETTERS = LETTERS.length;

//To make getting values in data faster
var letter_index = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
    "E": 4,
    "F": 5,
    "G": 6,
    "H": 7,
    "I": 8,
    "J": 9,
    "K": 10,
    "L": 11,
    "M": 12,
    "N": 13,
    "O": 14,
    "P": 15,
    "Q": 16,
    "R": 17,
    "S": 18,
    "T": 19,
    "U": 20,
    "V": 21,
    "W": 22,
    "X": 23,
    "Y": 24,
    "Z": 25,
    //"Blank": 26
}

$(function() {
    //create the board for the tiles to be placed on
    $("#board").html(gen_board());
    //create the tiles randomly
    $("#letters").html(gen_table(7));
    $("#letters").droppable({
        accept: ".draggable",
        drop: function(event, ui) {
            $(ui.draggable).detach().css({ top: 0, left: 0 }).appendTo(this);
        }
    });

    $(".tile").each(function() {
        //gets the box number
        var c = $(this).attr("class").slice(-1);
        //sets the box position
        var pos = c * 100 + "px";
        //sets the tile scoring based on position
        if (c == 1 || c == 5) {
            $(this).css({
                "background-image": "url('./graphics_data/double_letter.png')"
            });
        } else {
            $(this).css({
                "background-image": "url('./graphics_data/blank_tile.png')"
            });
        }
        $(this).css({
            "width": "100px",
            "height": "100px",
            "left": String(pos),
        });
    });

    $(".tile").droppable({
        drop: function(event, ui) {
            $(ui.draggable).detach().css({
                top: 0,
                left: 0,
            }).appendTo(this);
            console.log($(this).attr("id"));
            $(this).droppable("disable");
            //get the letter that is dragged to the corresponding spot
            var letter = $(ui.draggable).attr("class").split(" ")[1];
            //add the letter to the stack
            WORD[$(this).attr("class").split(" ")[1].slice(-1)] = letter;
        }
    });

    $(".letter").each(function() {
        //get the letter;
        var letter = $(this).attr("class").split(" ")[1];
        //get the letter's image
        var img = data.pieces[letter_index[letter]].image;
        $(this).css({
            "background-image": "url('./graphics_data" + img + "')",
            "width": "100px",
            "height": "100px",
        });

        $(this).draggable({
            snap: ".tile",
            //go back to original position if not dropped in right place
            //https://stackoverflow.com/questions/5735270/revert-a-jquery-draggable-object-back-to-its-original-container-on-out-event-of
            revert: function(event, ui) {
                $(this).data("uiDraggable").originalPosition = {
                    top: 0,
                    left: 0,
                };
                return !event;
            }
        });
    });

    //initialize word, score and remaining letters
    $("#word").html(WORD);
    $("#total_score").html(TOTAL_SCORE);
    $("#remaining_letters").html(REMAINING_LETTERS);

    //reset button
    $(".reset").click(function() {
        //reload the page
        location.reload();
    });

    //enter button
    $(".enter").click(function() {
        var check_word = WORD[0];
        if (WORD[0] != ".") {
            for (var i = 1; i < WORD.length; i++) {
                if (WORD[i] != ".") {
                    check_word += WORD[i];
                }
            }
            //dont allow 1 letter words because scrabble rules
            if (check_word.length > 1) {
                check_word = check_word.toLowerCase();
                SCORE = 0;
                for (var i in check_word) {
                    //letter value
                    var val = data.pieces[letter_index[check_word[i].toUpperCase()]].value;
                    if (i == 1 || i == 5) {
                        SCORE += 2 * val;
                    } else {
                        SCORE += val;
                    }
                }
                TOTAL_SCORE += SCORE;
                SCORE = 0;
                $("#total_score").html(TOTAL_SCORE);
                //$("#letters").html(gen_table());
                $(".tile .letter").remove();
                var remaining = 0;
                $(".ui-draggable").each(function() {
                    var letter = $(this).attr("class").split(" ");
                    remaining += 1;
                });
                $("#letters").append(gen_table(7 - remaining));
                //add css styling for dragging and letters etc
                style_letters();
                //reset disabled droppable li elements
                $(".tile").droppable("enable");
                $("#word").html(WORD);
                //reset WORD variable
                WORD = [".", ".", ".", ".", ".", ".", "."];
                $("#total_score").html(TOTAL_SCORE);
                $("#remaining_letters").html(REMAINING_LETTERS);
            }
        }
    });
});

//generate list elements in html format for the board and returns a string
function gen_board() {
    var board = "";
    for (var i = 0; i < 7; i++) {
        board += "<li class='tile box" + i + "'></li>";
    }
    return board;
}

function gen_table(tiles) {
    var table = "";
    for (var i = 0; i < tiles; i++) {
        //gets a random letter from LETTERS
        var tile = get_random_letter();
        //gets image url from data.pieces
        var img = data.pieces[letter_index[tile[0]]].image;
        table += "<li class='letter " + tile[0] + "'></li>";
    }
    return table;
}

//returns a random letter from LETTERS and removes it from the list
function get_random_letter() {
    var i = parseInt(Math.random() * LETTERS.length);
    var letter = LETTERS.splice(i, 1);
    REMAINING_LETTERS = LETTERS.length;
    return letter;
}

function style_letters() {
    $(".letter").each(function() {
        //get the letter;
        var letter = $(this).attr("class").split(" ")[1];
        //get the letter's image
        var img = data.pieces[letter_index[letter]].image;
        $(this).css({
            "background-image": "url('./graphics_data" + img + "')",
            "width": "100px",
            "height": "100px",
        });

        $(this).draggable({
            snap: ".tile",
            //go back to original position if not dropped in right place
            //https://stackoverflow.com/questions/5735270/revert-a-jquery-draggable-object-back-to-its-original-container-on-out-event-of
            revert: function(event, ui) {
                $(this).data("uiDraggable").originalPosition = {
                    top: 0,
                    left: 0,
                };
                return !event;
            }
        });
    });
}

/*
set list with all letters and amounts
use random to select letters
letters selected remove from list and subtract from data.pieces.amount
set id to letter, value by looking at data.pieces.value and img by image
*/

/*
check_if_word_exists() from 
https://www.codegrepper.com/code-examples/javascript/check+if+a+word+exists+in+dictionary+javascript
*/
function check_if_word_exists(word) {
    const url = "dictionary.json";

    var dict = 1;
    $.ajax({
        url: url,
        success: function(result) {
            dict = result;
        }
    });

    console.log(dict);

    return dict;
}

console.log(check_if_word_exists("word").status);
console.log(check_if_word_exists("asdker").status);
