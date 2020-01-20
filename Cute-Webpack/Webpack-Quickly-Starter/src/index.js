import _ from "lodash";
require("./style/index.scss");
import { main } from "@src/main";
import $ from 'jquery';


function createElement(){
    let div = document.createElement('div');
    div.innerHTML = _.join(['my', 'name', 'is', 'leo'], '');
    div.className = "box";
    return div;
}
let div = createElement();
document.body.appendChild(div);

$('.box').show();
