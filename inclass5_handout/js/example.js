// ADD NEW ITEM TO END OF LIST
var endOfList = document.createElement("li");
endOfList.appendChild(document.createTextNode("cream"));
document.querySelector("ul").appendChild(endOfList);

// ADD NEW ITEM START OF LIST
var startOfList = document.createElement("li");
startOfList.prepend(document.createTextNode("kale"));
document.querySelector("ul").prepend(startOfList);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var element = document.getElementsByTagName("li");
for (var i = 0; i < element.length; i++) {
    element[i].className = "cool";
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var header_2 = document.getElementsByTagName("h2");
header_2[0].innerHTML += "<span>" + element.length + "</span>";

//console.log(document.getElementsByTagName("H2").item(0).appendChild("a"));
//("<span>" + element.length + "</span>");