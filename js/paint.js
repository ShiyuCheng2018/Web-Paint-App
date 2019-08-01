/*Shiyu Cheng 23329948
*Web Painting application
* 4/6/2019
* This web painting app allows users to choose color of drawing, shapes of drawing
* and clean canvas
* */
"use strict";
(function () {

    window.onload = function () {
        let isdown = false;
        //the mode of user's choice
        let mode = "";
        //get elements
        let clearSelector = document.getElementById("clear");
        let circleSelector = document.getElementById("circle");
        let squareSelector = document.getElementById("squares");
        let lineSelector = document.getElementById("lines");
        let penSelector = document.getElementById("pen");
        let colorSelector = document.getElementById("colorSelector");
        //get the main canvas
        let canvas = document.getElementById("window");
        //
        colorChooseSelector();
        penSizeSelector();
        //selectors with click events
        clearSelector.addEventListener("click", clearHandler);
        colorSelector.addEventListener("click", pixelHandler);
        //mode selectors
        circleSelector.addEventListener("click", function () {
            mode = "circle";
        });

        penSelector.addEventListener("click", function () {
            mode = "pen";
        });

        squareSelector.addEventListener("click", function () {
            mode = "square";
        });

        lineSelector.addEventListener("click", function () {
            mode = "line";
        });

        canvas.addEventListener("mousedown", function () {
            isdown = true;
        });

        canvas.addEventListener("mousemove", function () {
            //mouse move event runs only and only if mouse is down
            if (isdown === true){
                getMove(mode);
            }
        });

        canvas.addEventListener("mouseup", function () {
            isdown = false; //set mouse up
        });

        canvas.addEventListener("mouseover", function () {
            isdown = false; //set mouse up
        });
    };

    let colorChooseSelector = function(){
        //set colors in color canvas
        let colorSelector = document.getElementById("colorSelector");
        let contextColor = colorSelector.getContext("2d");
        let gradient = contextColor.createLinearGradient(0, 0, 110, 0);
        gradient.addColorStop(0, "rgba(255, 0, 0)");
        gradient.addColorStop(0.15, "rgba(255, 0, 255)");
        gradient.addColorStop(0.33, "rgba(0 ,0 ,255)");
        gradient.addColorStop(0.49, "rgba(0 ,255 ,255)");
        gradient.addColorStop(0.67, "rgba(255 ,255 ,0)");
        gradient.addColorStop(0.84, "rgba(255 ,0 ,0)");
        contextColor.fillStyle = gradient;
        contextColor.fillRect(0, 0, 200, 200);
        //set up gradients
        let gradient2 = contextColor.createLinearGradient(0, 0, 0, 170);
        gradient2.addColorStop(0, "rgba(255, 255 ,255, 1)");
        gradient2.addColorStop(0.5, "rgba(255, 255 ,255, 0)");
        gradient2.addColorStop(0.5, "rgba(0, 0 ,0, 0)");
        gradient2.addColorStop(1, "rgba(0, 0 ,0, 1)");
        contextColor.fillStyle = gradient2;
        contextColor.fillRect(0, 0, 200, 200);
    };

    let pixelHandler = function(event) {
        //this function is get the color data whenever user chooses color, and
        //set color to pen size canvas and apply to drawing
        let colorSelector = document.getElementById("colorSelector");
        let contextColor = colorSelector.getContext("2d");
        let penSizeSelector = document.getElementById("penSizeSelector");
        let sizeContext = penSizeSelector.getContext("2d");
        let canvas = document.getElementById("window");
        let context = canvas.getContext("2d");
        //get color data
        let rect = colorSelector.getBoundingClientRect();
        let data = contextColor.getImageData(event.clientX - rect.left,
            event.clientY - rect.top, 1, 1);
        //set color to color canvas
        contextColor.strokeStyle = "rgba(" + data.data[0] + "," + data.data[1] +
            "," + data.data[2] + "," + data.data[3] + ")";
        //set color to pen size canvas
        sizeContext.strokeStyle = contextColor.strokeStyle;
        sizeContext.strokeRect(24, 24, 1, 1);
        //set color to draw
        context.strokeStyle = contextColor.strokeStyle;
    };

    let getMove = function(mode){
        let penSizeSelector = document.getElementById("penSizeSelector");
        let sizeContext = penSizeSelector.getContext("2d");
        let canvas = document.getElementById("window");
        let context = canvas.getContext("2d");
        let rect = canvas.getBoundingClientRect();
        //set color and the size
        context.lineWidth = sizeContext.lineWidth;
        //check the mode
        let moveHandler = function (event) {
            console.log("star to draw: "+mode);
            if (mode === "circle"){
                context.beginPath();
                context.arc(event.clientX - rect.left, event.clientY - rect.top, 40, 0, 2*Math.PI);
            }else if(mode === "pen" || mode === ""){
                context.lineTo(event.clientX - rect.left, event.clientY - rect.top);
            }else if(mode === "square"){
                context.rect(event.clientX - rect.left, event.clientY - rect.top, 40, 40);
            }else if(mode === "line"){
                context.moveTo(0,0);
                context.lineTo(event.clientX - rect.left, event.clientY - rect.top);
            } //start to draw
            context.stroke();
        };

        let upHandler = function(){
            context.beginPath();
            //clean move event-listener
            canvas.removeEventListener("mousemove", moveHandler);
        };
        //these are canvas event-listeners: move, up, over
        canvas.addEventListener("mousemove", moveHandler);
        canvas.addEventListener("mouseup", upHandler);
        canvas.addEventListener("mouseover", upHandler);
    };

    let clearHandler = function(){
        //clear the canvas
        let canvas = document.getElementById("window");
        let context = canvas.getContext("2d");
        context.clearRect(0,0, context.canvas.width, context.canvas.height);
    };

    let penSizeSelector = function(){
        //this function is for user changing the drawing size
        let penSizeSelector = document.getElementById("penSizeSelector");
        let sizeContext = penSizeSelector.getContext("2d");
        sizeContext.strokeRect(24, 24, 1, 1);
        let plus = document.getElementById("+");
        let minus = document.getElementById("-");
        //plus and minus size algorithm
        plus.addEventListener("click", function () {
            sizeContext.lineWidth ++;
            sizeContext.strokeRect(24, 24, 1, 1);
        });
        minus.addEventListener("click", function () {
            sizeContext.lineWidth -= 1;
            sizeContext.clearRect(0,0, sizeContext.canvas.width, sizeContext.canvas.height);
            sizeContext.strokeRect(24, 24, 1, 1);
        });
    };
})();