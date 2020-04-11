import { Element, render, renderDom, setAttr } from './element';

let allPatches;
let index = 0;

function patch(node, pathces){
    allPatches = pathces;
    console.log("allPatches:",allPatches)
    walk(node);
}

function walk(node){
    console.log("node:",node)
    let current = allPatches[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => walk(child));
    if(current) doPatch(node, current);
}

function doPatch(node, patches){
    patches.forEach(patch => {
        switch(patch.type){
            case 'ATTR':
                for(let key in patch.attr){
                    let value = patch.attr[key];
                    if(value){
                        setAttr(node, key, value);
                    }else{
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT':
               node.textContent = patch.text;
               break;
            case 'REPLACE':
                let newNode = patch.newNode;
                newNode = (newNode instanceof Element) ? render(newNode) : document.createTextNode(newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node);
                break;
            default:
                break;
        }
    })
}

export default patch;