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

    var set = function(listData, word, options){       
        if(!listData || word === '' || typeof word !== 'string') return false;

        if(typeof listData === 'string'){
            listData = JSON.parse(listData);
        }

        if(options){
            _setOptions();
        }
        
        var originData = _copyObject(listData);
        var originWord;
        var searchData = [];
        var hasWordIndex;
        var hasHighlightIndex;

        for(var i in originData){
            subject = originData[i].subject;
            subjectToLowerCase = subject.toLowerCase();
            hasWordIndex = subject.indexOf(word.toLowerCase());
            hasHighlightIndex = subject.indexOf(word.toLowerCase());
 
            if(hasWordIndex >= 0){
                console.log(subject);

                if(hasHighlightIndex >= 0){
                    originWord = subject.substr(hasWordIndex, word.length);
                    searchData.push({
                        "subject" : subject.split(originWord).join('<span class="highlight">' + originWord + '</span>')
                    });
                    console.log(1);
                }else{
                    searchData.push({
                        "subject" : subject
                    })
                    console.log(2);
                }
            }else{
                hasWordIndex = subject.split(' ').join('').indexOf(word.toLowerCase());
                if(hasWordIndex >= 0){
                    console.log(3);
                    if(hasHighlightIndex >= 0){
                        originWord = subject.substr(hasWordIndex, word.length);
                        searchData.push({
                            "subject" : subject.split(originWord).join('<span class="highlight">' + originWord + '</span>')
                        });
                        console.log(4);
                    }else{
                        searchData.push({
                            "subject" : subject
                        })
                        console.log(5);
                    }
                }
            }
        }

        return searchData;
    }


    // [TODO] options.. color...font-size..background.. or className...
    function _setOptions(){
        console.log('options이 있다.');
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

    return {
        set : set
    };
});
