(function(global, factory){
    'use strict';

    if(typeof exports === 'object' && typeof module !== 'undefined'){
        module.exports = factory();

    }else if(typeof define === 'function' && define.amd){
        define(factory);

    }else{
        global.abc = factory();
    }
})(this, function(){
    

// ============================================================================================참고할 사항 + jQuery highlight도 참고
// 상수 선언 상단
// 주석 잘 달것
// 최대한 쪼갤것
// 클래스는 대문자, 클래스로 활용할 수 있는 부분이 있을까?

    
// jQuery.fn.highlight = function(pat) {
//     function innerHighlight(node, pat) {
//      var skip = 0;
//      if (node.nodeType == 3) {
//       var pos = node.data.toUpperCase().indexOf(pat);
//       if (pos >= 0) {
//        var spannode = document.createElement('span');
//        spannode.className = 'highlight';
//        var middlebit = node.splitText(pos);
//        var endbit = middlebit.splitText(pat.length);
//        var middleclone = middlebit.cloneNode(true);
//        spannode.appendChild(middleclone);
//        middlebit.parentNode.replaceChild(spannode, middlebit);
//        skip = 1;
//       }
//      }
//      else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
//       for (var i = 0; i < node.childNodes.length; ++i) {
//        i += innerHighlight(node.childNodes[i], pat);
//       }
//      }
//      return skip;
//     }
//     return this.each(function() {
//      innerHighlight(this, pat.toUpperCase());
//     });
//    };
   
//    jQuery.fn.removeHighlight = function() {
//     function newNormalize(node) {
//        for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
//            var child = children[i];
//            if (child.nodeType == 1) {
//                newNormalize(child);
//                continue;
//            }
//            if (child.nodeType != 3) { continue; }
//            var next = child.nextSibling;
//            if (next == null || next.nodeType != 3) { continue; }
//            var combined_text = child.nodeValue + next.nodeValue;
//            new_node = node.ownerDocument.createTextNode(combined_text);
//            node.insertBefore(new_node, child);
//            node.removeChild(child);
//            node.removeChild(next);
//            i--;
//            nodeCount--;
//        }
//     }
//     return this.find("span.highlight").each(function() {
//        var thisParent = this.parentNode;
//        thisParent.replaceChild(this.firstChild, this);
//        newNormalize(thisParent);
//     }).end();
//    };



//    highlight(any, type){
//        var match = value.match(검색어);
//        검색어 = new RegExp(this.searchKeyword.replace(/ /gi,'').split('').join('\\s*').replace(/\+/gi,'\\\+', 'gi'));
//        if(!match){
//            return value;
//        }else{
//            var res = value.replace(검색어, '' + match[0], '')
//            return res;
//        }
//    }



});