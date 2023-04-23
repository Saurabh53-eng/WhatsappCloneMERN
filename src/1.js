function addNode() {
    var newP = document.createElement("p");
    var textNode = document.createTextNode(" This is a new text node");
    newP.appendChild(textNode); document.getElementById("firstP").appendChild(newP);
    console.log('hii');
} 