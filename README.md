# searchJS

- 검색 기능, 검색어 하이라이트 기능
+ 공백이 들어간 정확한 검색에 하이라이트 제공
+ 공백이 정확하지 않은 검색에는 검색 결과만 제공


### example

#### setting
// objcet {object} - 검색 리스트
// object.key {string} - 검색 리스트에서 검색되어야하는 key값
searchJS.setting({object}, { targetKey : {object.key} });
 
#### search
var 검색결과객체 = searchJS.search('검색 키워드'));

