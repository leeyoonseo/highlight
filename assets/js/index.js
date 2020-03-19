(function(){
    'use strict';

    var DATA;
    var search = document.getElementById('search');

    ajax();

    function ajax(){
        var req = new XMLHttpRequest();

        if(!req) return false;

        req.onreadystatechange = function(){
            if (req.readyState === XMLHttpRequest.DONE) {
                if(req.status === 200){
                    DATA = req.responseText;

                    createList(DATA);

                    /* 검색후 highlight */
                    searchJS.setting(DATA);


                }else{
                    console.log('Error');
                }
            }
        };

        req.open('GET', 'test.json', true);
        req.send();
    }

    /* 대상 List 생성 */
    function createList(data){
        if(!data) return false;

        if(typeof data !== 'object'){
            data = JSON.parse(data);
        }

        var ulList = document.querySelectorAll('#resultUl'),
            result = document.getElementById('result'),
            ulNode,
            liNode;

        if(ulList.length > 0) {
            ulList[0].remove();
        }
        
        ulNode = document.createElement('ul');
        ulNode.id = 'resultUl';
        
        for(var i in data){
            liNode = document.createElement('li');
            liNode.innerHTML = data[i].subject;
            
            ulNode.appendChild(liNode);
        }

        result.appendChild(ulNode);
    }


    /* 검색 input */
    search.addEventListener('input', function(e){
        var word = e.target.value;

        if(word === ''){
            createList(DATA);

        }else{
            var searchData = searchJS.search(word);
            createList(searchData);

        }
    });

    
})();