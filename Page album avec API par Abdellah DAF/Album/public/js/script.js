
var mybutton = document.getElementById("myBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

var myRequest = new XMLHttpRequest();
        var result = document.getElementById('nalbum');

        myRequest.onreadystatechange = function(){
            if(this.readyState === 4 && this.status === 200){
                var myJsObject = JSON.parse(this.responseText);

                for (var j =0 ; j < myJsObject.albums.length; j++){


                var row = document.createElement('div');
                var colL = document.createElement('div');
                var H1 = document.createElement('h1');
                var H2 = document.createElement('h2');
                var H4 = document.createElement('h4');
                var LIS = document.createElement('div');
                var A = document.createElement('a');
                var colS = document.createElement('div');
                var IMG = document.createElement('img');

                row.className = "row";
                colL.className = "col-sm-8 album-title";
                LIS.className = "listen";
                colS.className = "col-sm-4";
                A.setAttribute("href", "#");
                A.innerHTML = "Listen Here";
                IMG.setAttribute("src",myJsObject.albums[j].img);

                H1.innerHTML = myJsObject.albums[j].title;
                H2.innerHTML = myJsObject.albums[j].title;
                H4.innerHTML = myJsObject.albums[j].release;

                LIS.appendChild(A);
                colL.appendChild(H1);
                colL.appendChild(H2);
                colL.appendChild(H4);
                colL.appendChild(LIS);

                colS.appendChild(IMG);

                row.appendChild(colL);
                row.appendChild(colS);

                if(myJsObject.albums[j].id % 2 != 0){
                  row.appendChild(colL);
                  row.appendChild(colS);
                }else {
                  row.appendChild(colS);
                  row.appendChild(colL);
                
                }


                result.appendChild(row);


            }

            }
        };

        myRequest.open("GET", "data.json", true);
        myRequest.send();
