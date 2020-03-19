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

    var options = {
        className : 'highlight',
        targetKey : 'subject'
    }


    var _set = function(listData, word, newOpts){       
        if(!listData || word === '' || typeof word !== 'string') return false;

        if(typeof listData === 'string'){
            listData = JSON.parse(listData);
        }

        if(newOpts){
            // _setOptions();

            options = Objcet.assign({}, newOpts, options);

        }
        
        var originData = _copyObject(listData);
        var originWord;
        var searchData = [];

        var targetStr;
        var targetKey = options.targetKey;
        var wordToLowerCase = word.toLowerCase();
        var wordMinify = wordToLowerCase.split(' ').join('');

        var sameWord; // 공백 무시하고 같다
        var samePerfectWord; // 공백 포함 같다

        var sameWordIndex;

        originData.map(function(obj){
            targetStr = obj[targetKey]
            targetStrToLowerCase = targetStr.toLowerCase();
            targetStrMinify = targetStrToLowerCase.split(' ').join('');

            sameWord = targetStrMinify.match(wordMinify);

            // 공백을 무시하고 검색
            if(sameWord){
                samePerfectWord = targetStrToLowerCase.match(wordToLowerCase);

                // 공백 포함
                if(samePerfectWord){
                    console.log('포함');
                    sameWordIndex = targetStrToLowerCase.indexOf(wordToLowerCase);
                    originWord = targetStr.substr(sameWordIndex, word.length);

                    searchData.push({
                        [targetKey.toString()] : _setHighlightText(targetStr, originWord)
                    })  

                // 공백 안 포함
                }else{
                    console.log('안포함');
                    searchData.push({
                        [targetKey.toString()] : targetStr
                    })  
                }
            }
        });
        return searchData;
    }

    // 하이라이트태그 텍스트 추출
    function _setHighlightText(text, originWord, className){
        var className = className || 'highlight';

        return text.split(originWord)
                    .join('<span class="' + className + '">' + originWord + '</span>');
    }


    // [TODO] options.. color...font-size..background.. or className...
    function _setOptions(){
        console.log('options이 있다.');
    }

    // object 복사
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

    return {
        set : _set
    };
});
