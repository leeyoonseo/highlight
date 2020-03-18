(function(global, factory){
    'use strict';

    if(typeof exports === 'object' && typeof module !== 'undefined'){
        module.exports = factory();

    }else if(typeof define === 'function' && define.amd){
        define(factory);

    }else{
        global.SearchHighlight = factory();
    }

})(this, function(){

    var set = function(DATA, word, options){
        if(!DATA || word === '' || typeof word !== 'string') return false;

        if(typeof DATA === 'string'){
            DATA = JSON.parse(DATA);
        }

        var resultData = _copyObject(DATA);

        // [TODO] options.. color...font-size..background.. or className...
        if(options){
            console.log('options이 있다.');
        }

        var wordToLowerCase = word.toLowerCase();
        var reg = new RegExp(wordToLowerCase, 'gi');
        var subject;
        var subjectToLowerCase;
        var spanNode;
        var pos;

        for(var i in resultData){
            subject = resultData[i].subject;
            subjectToLowerCase = subject.toLowerCase();

            pos = subjectToLowerCase.indexOf(wordToLowerCase);

            if(pos >= 0){
                console.log(subject);
                spanNode = document.createElement('span');
                spanNode.classList.add('highlight');
                
                var originWord = subject.substr(pos, word.length);
                spanNode.innerHTML = originWord;

                resultData[i].subject = subjectToLowerCase.replace(reg, '<span class="highlight">' + originWord + '</span>');
            }
        }


        function _copyObject(obj){
            if (obj === null || typeof obj !== 'object') return obj;

            var copiedObject = obj.constructor();

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    copiedObject[key] = _copyObject(obj[key]);
                }
            };

            return copiedObject;
        }

        return resultData;
    }

    return {
        set : set
    };
});



    // console.log(DATA, word);

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
//     
//      return this.each(function() {
//          innerHighlight(this, pat.toUpperCase());
//     });
//  };
   
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








// 해당 첨부파일과 함께

// css 파일에

// .highlight { background-color: yellow; color: red; }

// 와 같이 하이라이트된 검색어에 적용할 색상을 만들어 놓은 후

 

// 사용시에는

// 스크립트 상의 window.onoload나 body태그가 있다면 body태그 안에 onload 등을 사용하여 이용.

 

// //////////  사용예

 

// // 필요한 jquery와 jquery.highlight-4.js 파일을 js 복사, css파일에 위와 같은 class 생성 후 페이지 상단에서 선언

// <script type="text/javascript" src="/js/jquery-1.8.0.min.js'" charset="utf-8"></script>

// <link rel="stylesheet" type="text/css" href="/css/main.css" />

// <script type="text/javascript" src="/js/jquery.highlight-4.js"></script>

 

// //// onload시 읽어드리는 스크립트에 다음과 같이 사용

//  var sKey1 = '${vo.searchKeyword}';              // 해당 검색어
//   if(sKey1 != ''){
//   $('.sch1').highlight(sKey1);                        // 하이라이트(여러개의 검색어라면 단순하게 여러번 사용
//  }
 

// 스페이스로 구분되어 and 연산자 검색을 한 검색어의 경우

// var sKey = '${vo.searchKeyword}';
//  var splitKey = sKey.split(" ");
//  if(splitKey.length > 1) {
//   for(var i=0; i<splitKey.length; i++){
//    $('.sch1').highlight(splitKey[i]);// 검색어 하이라이트 
//   }
//  } else {
//   $('.sch1').highlight(sKey);     
//  }

 

// // 예로 foreach를 사용한  테이블의 특정 td에 적용시 class이름을 적용해 준다.

// <td class="sch1" "> ${result.aa} </td>

 

// ///////////////////////////////////////////////////

//  $('.aaa').highlight('키워드')  : class이름이 aaa 인 것들만 확인해서 하이라이트

//  $('td').highlight('키워드')     : 태그이름이 td인 것들만 확인해서 하이라이트

//  $('#ccc').highlight('키워드')  : id가 ccc 인 것에서만 확인해서 하이라이트

 

 

 
// [출처] 검색어(키워드) 하이라이트 기능|작성자 대을이