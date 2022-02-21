window.addEventListener("load",function(event) {







    var animationCanvas = documant.getElementById("animationCanvas"),
        animationContext = animationCanvas.getContext("2d"),
        paintingElement = new Image(),
        paintingElementInfoList = [],
        paintingElementCollection = {},

        cloud1PosX = 60,
        cloud1PosY = 30,
        cloud2PosX = 500,
        cloud2PosY = 40,
        giraffePosX = 600,
        giraffePosY = 220,
        appleTreePosX = 400,
        appleTreePosY = 180,
        rosePosX = 260,
        rosePosY = 300,
        roseRotation = -30,
        roseRotationDirection = 1,
        dandelionPosX = 200,
        dandelionPosY = 350,
        dandelionRotation = 30,
        dandelionDirection = -1,
        dogPosX = 30,
        dogPosY = 320;

    paintingElement.addEventListener("load",paintingElementLoadHandler,false);
    paintingElement.src = "https://raw.githubusercontent.com/happpylee/book-code-html5/master/ch1_dancing_flower/res/image/paintingElement.png";

    paintingElementInfoList.push({cropX:0, cropY:0, cropWidth:174, cropHeight:220, cropImageIndex:"giraffe",cropImageName:"기린"});
    paintingElementInfoList.push({cropX:174, cropY:0, cropWidth:150, cropHeight:215, cropImageIndex:"appleTree",cropImageName:"사과나무"});
    paintingElementInfoList.push({cropX:324, cropY:0,cropWidth:169,cropHeight:91,cropImageIndex:"cloud1",cropImageName:"구름1"});
    paintingElementInfoList.push({cropX:324, cropY:91, cropWidth:147, cropHeight:89, cropImageIndex:"cloud2",cropImageName:"구름2"});
    paintingElementInfoList.push({cropX:0, cropY:220, cropWidth:208, cropHeight:140, cropImageIndex:"twinhouse",cropImageName:"쌍둥이집"});
    paintingElementInfoList.push({cropX:208, cropY:220 ,cropWidth:158,cropHeight:147,cropImageIndex:"singlehouse",cropImageName:"외톨이집"});
    paintingElementInfoList.push({cropX:685, cropY:0, cropWidth:150, cropHeight:164, cropImageIndex:"burgerstore",cropImageName:"햄버거가게"});
    paintingElementInfoList.push({cropX:493, cropY:0, cropWidth:192, cropHeight:166, cropImageIndex:"truckhouse",cropImageName:"지게차집"});
    paintingElementInfoList.push({cropX:366, cropY:180,cropWidth:71,cropHeight:101,cropImageIndex:"colorrose",cropImageName:"컬러장미꽃"});
    paintingElementInfoList.push({cropX:437, cropY:180, cropWidth:61, cropHeight:86, cropImageIndex:"dandelion",cropImageName:"민들레꽃"});
    paintingElementInfoList.push({cropX:498, cropY:180, cropWidth:31, cropHeight:51, cropImageIndex:"spore",cropImageName:"홀씨"});
    paintingElementInfoList.push({cropX:366, cropY:281,cropWidth:100,cropHeight:100,cropImageIndex:"tulip",cropImageName:"튤립"});
    paintingElementInfoList.push({cropX:466, cropY:281, cropWidth:100, cropHeight:95, cropImageIndex:"rose",cropImageName:"장미꽃"});
    paintingElementInfoList.push({cropX:566, cropY:166, cropWidth:153, cropHeight:129, cropImageIndex:"cat",cropImageName:"고양이"});
    paintingElementInfoList.push({cropX:719, cropY:166,cropWidth:93,cropHeight:123,cropImageIndex:"dog",cropImageName:"강아지"});
    paintingElementInfoList.push({cropX:0, cropY: 381,cropWidth: 800,cropHeight:122,cropImageIndex:"hill", cropImageName:"언덕길"});







    function init(){

      window.renderAnimationFrame = ( function() {

        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||

        function(callback){
          window.setTimeout(callback, 1000/60);
        };
      })();
    }

    function loadPaintingElements(){

      for(var i=0; i<paintingElementInfoList.length;i++){

        var elementCanvas = document.createElement("canvas"),
            elementContext = elementCanvas.getContext("2d"),
            elementInfo = paintingElementInfoList[i];

        elementCanvas.width = elementInfo.cropWidth;
        elementCanvas.height = elementInfo.cropHeight;

        elementContext.drawImage(paintingElement,elementInfo.cropX,elementInfo.cropY,elementInfo.cropWidth, elementInfo.cropHeight,0,0,elementInfo.cropWidth, elementInfo.cropHeight);

        paintingElementCollection[elementInfo.cropImageIndex] = elementCanvas;
      }
    }

    function loopAnimationFrame(){

      drawPaintingElements();
      window.renderAnimationFrame(loopAnimationFrame);
    }

    function drawPaintingElements(){


      animationContext.clearRect(0,0,animationCanvas.width,animationCanvas.height);


      var hillImage = paintingElementCollection["hill"];
      animationContext.drawImage(hillImage,0,animationCanvas.height-hillImage.height);
      animationContext.drawImage(paintingElementCollection["giraffe"],giraffePosX,giraffePosY);
      animationContext.drawImage(paintingElementCollection["cloud1"],cloud1PosX,cloud1PosY);
      animationContext.drawImage(paintingElementCollection["cloud2"],cloud2PosX,cloud2PosY);
      animationContext.drawImage(paintingElementCollection["appleTree"],appleTreePosX,appleTreePosY);


      var roseImage = paintingElementCollection["rose"];
      animationContext.save();
      animationContext.transform(1,0,0,1,0,0);
      animationContext.translate(rosePosX+roseImage.width/2,rosePosY+roseImage.height);
      animationContext.rotate(roseRotation * Math.PI /180);
      animationContext.drawImage(roseImage, -(roseImage.width/2), -roseImage.height);
      animationContext.restore();


      var dandelionImage = paintingElementCollection["dandelion"];
      animationContext.save();
      animationContext.transform(1,0,0,1,0,0);
      animationContext.translate(dandelionPosX+dandelionImage.width/2,dandelionPosY+dandelionImage.height);
      animationContext.rotate(dandelionRotation * Math.PI /180);
      animationContext.drawImage(dandelionImage, -(dandelionImage.width/2), -dandelionImage.height);
      animationContext.restore();

      animationContext.drawImage(paintingElementCollection["singlehouse"],20,220);


      var dogImage = paintingElementCollection["dog"];
      animationContext.save();
      animationContext.transform(1,0,0,1,0,0);
      animationContext.translate(dogPosX+dogImage.width/2,dogPosY+dogImage.height);
      animationContext.scale(0.5,0.5);
      animationContext.drawImage(dogImage, -(dogImage.width/2), -dogImage.height);
      animationContext.restore();




      cloud1PosX = (cloud1PosX < -200) ? animationCanvas.width +10:cloud1PosX-1;
      cloud2PosX = (cloud2PosX < -200) ? animationCanvas.width +10:cloud2PosX=2;


      if(roseRotation >=30){
        roseRotationDirection = -1;
      }
      else if(roseRotation<=-30){
        roseRotationDirection = 1;
      }
      roseRotation +=roseRotationDirection;


      if(dandelionRotation>=30){
        dandelionDirection=-1;
      }
      else if(dandelionRotation <=-30){
        dandelionDirection = 1;
      }
      dandelionRotation +=dandelionDirection;
    }







    function paintingElementLoadHandler(event){

      init();
      loadPaintingElements();
      loopAnimationFrame()/
    }

},false);
