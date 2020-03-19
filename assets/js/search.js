/**
 * SearchJS
 * @author yoonseo.lee <okayoon.lee@gmail.com>
 * @version 1.0.0
 * @since 2020.03
 * @file 검색 / 검색 하이라이트 js
 */
(function(global, factory){
    'use strict';

    if(typeof exports === 'object' && typeof module !== 'undefined'){
        module.exports = factory();

    }else if(typeof define === 'function' && define.amd){
        define(factory);

    }else{
        global.searchJS = factory();
    }

})(this, function(){

    var options = {
        className : 'highlight',
        targetKey : 'subject'
    }

    var originData;

    // 초기 세팅
    var _setting = function(data, userOpt){
        if(!data) {
            return false;  
        } 

        if(typeof data === 'string') {
            data = _stringToObject(data);
        }

        if(userOpt) {
            _setOptions(userOpt);
        }

        originData = _copyObject(data);
    };

    var _search = function(word){
        var originWord;
        var resultData = [];

        var targetStr;
        var targetKey = options.targetKey;

        var wordToLowerCase = word.toLowerCase();
        var wordMinify = wordToLowerCase.split(' ').join('');

        var sameWordIndex; // 공백 무시 텍스트 같다.
        var samePerfectWordIndex; // 공백 포함 같다.

        originData.map(function(obj){
            targetStr = obj[targetKey]
            targetStrToLowerCase = targetStr.toLowerCase();
            targetStrMinify = targetStrToLowerCase.split(' ').join('');

            
            sameWordIndex = targetStrMinify.indexOf(wordMinify); 

            // 공백을 무시하고 검색
            if(sameWordIndex >= 0){
                samePerfectWordIndex = targetStrToLowerCase.indexOf(wordToLowerCase);

                // 공백 포함
                if(samePerfectWordIndex >= 0){
                    sameWordIndex = targetStrToLowerCase.indexOf(wordToLowerCase);
                    originWord = targetStr.substr(sameWordIndex, word.length);

                    resultData.push({
                        [targetKey.toString()] : _setHighlightText(targetStr, originWord)
                    })  

                // 공백 안 포함
                }else{
                    resultData.push({
                        [targetKey.toString()] : targetStr
                    })  
                }
            }
        });

        return resultData;
    };

     // 옵션 세팅하기
    function _setOptions(userOpt){
        options = Objcet.assign({}, userOpt, options);
    }

    // string 데이터를 obj로
    function _stringToObject(data){
        return JSON.parse(data);
    }

    // 하이라이트태그 텍스트 추출
    function _setHighlightText(text, originWord, className){
        var className = className || 'highlight';

        return text.split(originWord)
                    .join('<span class="' + className + '">' + originWord + '</span>');
    }

    // [TODO] 옵션줄수있게해보자!! class나 true-false로 할수있고 없고
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
        setting : _setting,
        search : _search
    };
});
