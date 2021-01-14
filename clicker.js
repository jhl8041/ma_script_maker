
var div=document.createElement("div"); 
document.body.appendChild(div); 
div.id = "pop";
div.style.cssText = 'display:none; position:absolute; top:0px; left:0px ;' + 
                      'z-index: 999; background-color: #74992e; width: 300px;' +
                      'font-size: 12px';

var script=document.createElement("script"); 
document.head.appendChild(script); 
script.innerText = 'function sendScriptVar(str){ alert(str); }';


function addProp(variable, propScript){
  switch(variable){
    case "userId":
      chrome.storage.sync.set({userId: propScript});
      break;
    case "name":
      chrome.storage.sync.set({name: propScript});
      break;
    case "email":
      chrome.storage.sync.set({email: propScript});
      break;
    case "phone":
      chrome.storage.sync.set({phone: propScript});
      break;
    case "emailFlag":
      chrome.storage.sync.set({emailFlag: propScript});
      break;
    case "smsFlag":
      chrome.storage.sync.set({smsFlag: propScript});
      break;
    case "productCode":
      chrome.storage.sync.set({productCode: propScript});
      break;
    case "productName":
      chrome.storage.sync.set({productName: propScript});
      break;
    case "productImg":
      chrome.storage.sync.set({productImg: propScript});
      break;
    case "productPrice":
      chrome.storage.sync.set({productPrice: propScript});
      break;
    case "productUrl":
      chrome.storage.sync.set({productUrl: propScript});
      break;
    default:
      chrome.storage.sync.set({error: 'true'});
  }
}


document.addEventListener("click", function(e) {
    var htmlStr = "<table>";

    //마우스 커서 위치
    var x = e.pageX;
    var y = e.pageY;

    //팝업 위치 변경
    document.getElementById("pop").style.display = "";
    document.getElementById("pop").style.top = y + "px";
    document.getElementById("pop").style.left = x + "px";

    //클릭 부분 html 출력
    console.log(e.target);

    //attribute 보유여부 체크
    var hasId = e.target.hasAttribute('id');
    var hasClass = e.target.hasAttribute('class');
    var hasName = e.target.hasAttribute('name');
    var hasOnclick = e.target.hasAttribute('onclick');

    //id가 존재할 때
    if (hasId) {
      var idName = e.target.id;
      var idCnt = document.querySelectorAll('#'+idName).length; 

      htmlStr +=    "<tr onclick=sendScriptVar('var&#32userId&#32=&#32document.getElementById(`"+ idName +"`).value')>";
      //htmlStr +=    "<tr id='idSel'>";
      htmlStr +=      "<td class='humusjae'>";
      htmlStr +=       "id: #" + idName + " (" + idCnt + ")";
      if (idCnt == 1){
        htmlStr +=       " UNIQUE!";
      }
      htmlStr +=      "</td>";
      htmlStr +=    "</tr>";
    }

    //class가 존재할 때
    if (hasClass && e.target.className != 'humusjae') {
      //클래스명 연속공백 제거 및 연결
      var className = e.target.className.replace(/(^ *)|( *$)/g, "").replace(/ +/g, " ");
      var classNameArr = className.split(" ");
      var classNameFinal = "";
      for (var i = 0; i < classNameArr.length; i++) {
        classNameFinal+= "." + classNameArr[i];
      }
      var classCnt = document.querySelectorAll(classNameFinal).length;  

      htmlStr +=    "<tr>";
      htmlStr +=      "<td class='humusjae'>";
      htmlStr +=       "class: " + classNameFinal + " (" + classCnt + ")";
      if (classCnt == 1){
        htmlStr +=       " UNIQUE!";
      }
      htmlStr +=      "</td>";
      htmlStr +=    "</tr>";
    }

    //name 프로퍼티가 존재할 때
    if (hasName) {
      var nameName = e.target.name;  //split 적용
      var nameCnt = document.querySelectorAll('[name=' + '"' + nameName.toString() + '"' + ']').length;  

      htmlStr +=    "<tr>";
      htmlStr +=      "<td class='humusjae'>";
      htmlStr +=       "name: " + nameName + " (" + nameCnt + ")";
      if (nameCnt == 1){
        htmlStr +=       " UNIQUE!";
      }
      htmlStr +=      "</td>";
      htmlStr +=    "</tr>";
    }

    //onclick 프로퍼티가 존재할 때
    if (hasOnclick) {
      var onclickName = e.target.getAttribute('onclick');
      var onclickCnt = document.querySelectorAll('[onclick=' + '"' + onclickName + '"' + ']').length;  

      htmlStr +=    "<tr>";
      htmlStr +=      "<td class='humusjae'>";
      htmlStr +=       "onclick: " + onclickName + " (" + onclickCnt + ")";
      if (onclickCnt == 1){
        htmlStr +=       " UNIQUE!";
      }
      htmlStr +=      "</td>";
      htmlStr +=    "</tr>";
    }

    //위 4개가 존재하지 않을 때
    if ((hasId || hasClass || hasName || hasOnclick) == false){
      htmlStr +=    "<tr>";
      htmlStr +=      "<td class='humusjae'>";
      htmlStr +=        "Attribute가 충분하지 않습니다";
      htmlStr +=      "</td>";
      htmlStr +=    "</tr>";

    }

    htmlStr +=  "</table>";

    document.getElementById("pop").innerHTML = htmlStr;
    
});