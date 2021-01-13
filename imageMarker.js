
var div=document.createElement("div"); 
document.body.appendChild(div); 
div.id = "pop";
div.style.cssText = 'display:none; position:absolute; top:0px; left:0px ;' + 
                      'z-index: 999; background-color: #74992e; width: 300px;' +
                      'font-size: 12px';

var script=document.createElement("script"); 
document.head.appendChild(script); 
script.innerText = 'function sendScriptVar(str){ alert(str); }';



document.addEventListener("click", function( e ) {
    var htmlStr = "<table>";

    //마우스 커서 위치
    var x = e.pageX;
    var y = e.pageY;

    //팝업 위치 변경
    document.getElementById("pop").style.display = "";
    document.getElementById("pop").style.top = y + "px";
    document.getElementById("pop").style.left = x + "px";

    console.log(e.target);

    var hasId = e.target.hasAttribute('id');
    var hasClass = e.target.hasAttribute('class');
    var hasName = e.target.hasAttribute('name');
    var hasOnclick = e.target.hasAttribute('onclick');


    if (hasId) {
      var idName = e.target.id;
      var idCnt = document.querySelectorAll('#'+idName).length; 

      htmlStr +=    "<tr onclick=sendScriptVar('var&#32userId&#32=&#32document.getElementById(`"+ idName +"`).value')>";
      htmlStr +=      "<td class='humusjae'>";
      htmlStr +=       "id: #" + idName + " (" + idCnt + ")";
      if (idCnt == 1){
        htmlStr +=       " UNIQUE!";
      }
      htmlStr +=      "</td>";
      htmlStr +=    "</tr>";
    }

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