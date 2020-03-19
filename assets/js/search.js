/**
 * SearchJS
 * @author yoonseo.lee <okayoon.lee@gmail.com>
 * @version 1.0
 * @since 2020.03
 * @file 검색 / 검색 하이라이트 js
 * @example <caption>Setting</caption>
 * searchJS.setting(DATA, { targetKey : 'subject' });
 * 
 * @example <caption>Search</caption>
 * var 반환되는데이터 = searchJS.search('키워드'));
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

    /**
     * 글로벌 옵션
     * @throws 무조건 obj의 뎁스는 1이어야함.
     */
    var searchJsOpt = {
        className : 'highlight', // css 클래스명
        targetKey : 'subject' // 배열 object의 key 이름
    };

    var originData;

    /**
     * 초기 셋팅 
     * @param {object} data 검색 리스트 (필수)
     * @param {object} userOpt searchJsOpt 덮어쓸 옵션 값
     */
    var _setting = function(data, userOpt){
        if(!data) return false;  

        // string to object
        if(typeof data === 'string') {
            data = _stringToObject(data);
        }

        // 옵션 병합
        if(userOpt) {
            searchJsOpt = _mergeOptions(userOpt);
        }

        // 원본 검색 리스트 복사
        originData = _copyObject(data);
    };

    /**
     * 검색
     * @param {string} word 검색 텍스트 (필수)
     * @return {object} 검색 결과 리스트
     */    
    var _search = function(word){
        var resultData = []; // 검색 결과 리스트
        var originWord; // 원본 검색 텍스트

        var targetKey = searchJsOpt.targetKey;
        var targetStr;

        var wordToLowerCase = word.toLowerCase(); // 소문자 검색 텍스트
        var wordMinify = wordToLowerCase.split(' ').join(''); // 공백제거 검색 텍스트

        var sameWordIndex; // 공백 제거 비교 인덱스
        var samePerfectWordIndex; // 공백 포함 비교 인덱스

        // 검색 텍스트가 빈 값일때
        if(word === ''){
            return resultData = originData;

        }else{
            /**
             * 검색 로직
             * @arg {object} obj 검색 리스트 항목
             */
            _copyObject(originData).map(function(obj){
                targetStr = obj[targetKey]; // 비교 텍스트
                targetStrToLowerCase = targetStr.toLowerCase(); // 소문자 비교 텍스트 
                targetStrMinify = targetStrToLowerCase.split(' ').join(''); // 공백제거 비교 텍스트
                sameWordIndex = targetStrMinify.indexOf(wordMinify);

                // 공백 제거 후 검색 
                if(sameWordIndex >= 0){
                    samePerfectWordIndex = targetStrToLowerCase.indexOf(wordToLowerCase);

                    /** 
                     * 공백 포함 검색(하이라이트)
                     * @todo highlight 옵션받아서, 별도 기능으로 분리
                     */
                    if(samePerfectWordIndex >= 0){
                        sameWordIndex = targetStrToLowerCase.indexOf(wordToLowerCase);
                        originWord = targetStr.substr(sameWordIndex, word.length); // 원본 검색 텍스트
                        
                        // obj의 해당 key에 삽입
                        obj[targetKey] = _setHighlightText(targetStr, originWord); 
                    }

                    // 일치하는 obj 삽입
                    resultData.push(obj);
                }
            });
        }

        return resultData;
    };

    /**
     * 옵션 병합
     * @param {object} userOpt
     * @throws 무조건 obj의 뎁스는 1 이어야함. 병합 시 덮여씌어지므로 이슈 발생.
     * @return 병합된 데이터
     * @todo 예외처리할 상황이 생기면 병합기능 업그레이드
     */
    function _mergeOptions(userOpt){

        // jQuery가 로드된 경우
        if(window.jQuery){
            return $.extend({}, searchJsOpt, userOpt);
            
        }else{
            var mergedObject = {};

            for (var key in searchJsOpt) { 
                mergedObject[key] = searchJsOpt[key]; 
            }
    
            for (var key in userOpt) { 
                mergedObject[key] = userOpt[key]; 
            }
    
            return mergedObject;
        }
    }

    /**
     * string으로 받은 데이터를 object로 형변환
     * @param {string} data 
     * @return object로 변환된 data
     */
    function _stringToObject(data){
        return JSON.parse(data);
    }

    /**
     * 검색 텍스트에 하이라이트 태그 삽입
     * @param {string} text 검색 대상 텍스트 
     * @param {string} originWord 검색어 텍스트
     * @param {string} className 하이라이트 태그 클래스
     * @return 하이라이트 태그가 삽입된 텍스트
     */
    function _setHighlightText(text, originWord, className){
        var className = searchJsOpt.className || 'highlight';

        return text.split(originWord)
                    .join('<span class="' + className + '">' + originWord + '</span>');
    }

    /**
     * 객체 복사
     * @param {object} obj 복사 대상 객체
     * @return 복사된 객체
     */
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
