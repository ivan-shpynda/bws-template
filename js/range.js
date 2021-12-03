"use strict";

function init2slider(idX, btwX, btn1X, btn2X, input1, input2) {
  const slider = document.getElementById(idX);
  const between = document.getElementById(btwX);
  const button1 = document.getElementById(btn1X);
  const button2 = document.getElementById(btn2X);
  const inpt1 = document.getElementById(input1);
  const inpt2 = document.getElementById(input2);

  const { min, max } = inpt1;

  const sliderCoords = getCoords(slider);
  button1.style.marginLeft = "0px";
  button2.style.marginLeft = slider.offsetWidth - button1.offsetWidth + "px";
  between.style.width = slider.offsetWidth - button1.offsetWidth + "px";
  inpt1.value = min;
  inpt2.value = max;

  const inputChange = (evt) => {
    if (parseInt(inpt1.value) < min) {
      inpt1.value = min;
    }

    if (parseInt(inpt1.value) > max) {
      inpt1.value = max;
    }

    if (parseInt(inpt2.value) < min) {
      inpt2.value = min;
    }

    if (parseInt(inpt2.value) > max) {
      inpt2.value = max;
    }

    if (parseInt(inpt1.value) > parseInt(inpt2.value)) {
        const { value } = inpt1;
        inpt1.value = inpt2.value;
        inpt2.value = value;
      }

    const per1 = (parseInt(inpt1.value - min) * 100) / (max - min);
    const per2 = (parseInt(inpt2.value - min) * 100) / (max - min);
    const left1 = (per1 * (slider.offsetWidth - button1.offsetWidth)) / 100;
    const left2 = (per2 * (slider.offsetWidth - button1.offsetWidth)) / 100;

    button1.style.marginLeft = left1 + "px";
    button2.style.marginLeft = left2 + "px";

    if (left1 > left2) {
      between.style.width = left1 - left2 + "px";
      between.style.marginLeft = left2 + "px";
    } else {
      between.style.width = left2 - left1 + "px";
      between.style.marginLeft = left1 + "px";
    }
  }

  inpt1.onchange = inputChange;
  inpt2.onchange = inputChange;

  const handleRangeButton = (evt) => {
    evt.preventDefault();

    let btnTracker;

    evt.target === button1 ? btnTracker = 1 : btnTracker = 2;

    const buttonCoords1 = getCoords(button1);
    const buttonCoords2 = getCoords(button2);
    let shiftX2 = evt.pageX - buttonCoords2.left;
    let shiftX1 = evt.pageX - buttonCoords1.left;

    const handleMouseMove = (evt) => {
      let left1;
      let right1;
      let left2;
      let right2;

      switch (btnTracker) {
        case 1 :
          left1 = evt.pageX - shiftX1 - sliderCoords.left;
          right1 = slider.offsetWidth - button1.offsetWidth;

          if (left1 < 0) left1 = 0;
          if (left1 > right1) left1 = right1;
          button1.style.marginLeft = left1 + "px";

          shiftX2 = evt.pageX - buttonCoords2.left;
          left2 = evt.pageX - shiftX2 - sliderCoords.left;
          right2 = slider.offsetWidth - button2.offsetWidth;

          if (left2 < 0) left2 = 0;
          if (left2 > right2) left2 = right2;
          
          break;
        case 2 :
          left2 = evt.pageX - shiftX2 - sliderCoords.left;
          right2 = slider.offsetWidth - button2.offsetWidth;

          if (left2 < 0) left2 = 0;
          if (left2 > right2) left2 = right2;

          button2.style.marginLeft = left2 + "px";
          shiftX1 = evt.pageX - buttonCoords1.left;
          left1 = evt.pageX - shiftX1 - sliderCoords.left;
          right1 = slider.offsetWidth - button1.offsetWidth;

          if (left1 < 0) left1 = 0;
          if (left1 > right1) left1 = right1;
          break;
        default:
          break;
      }

      let per_min = 0;
      let per_max = 0;

      if (left1 > left2) {
        between.style.width = left1 - left2 + "px";
        between.style.marginLeft = left2 + "px";

        per_min = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
        per_max = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
      } else {
        between.style.width = left2 - left1 + "px";
        between.style.marginLeft = left1 + "px";

        per_min = (left1 * 100) / (slider.offsetWidth - button1.offsetWidth);
        per_max = (left2 * 100) / (slider.offsetWidth - button1.offsetWidth);
      }

      inpt1.value = parseInt(min) + Math.round(((max - min) * per_min) / 100);
      inpt2.value = parseInt(min) + Math.round(((max - min) * per_max) / 100);
    }

    document.addEventListener('mousemove', handleMouseMove);

    document.onmouseup = function () {
      document.removeEventListener('mousemove', handleMouseMove)
    };
  };

  button1.onmousedown = handleRangeButton;
  button2.onmousedown = handleRangeButton;

  function getCoords(elem) {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  }
}

init2slider("id66", "id66b", "id661", "id662", "id66i1", "id66i2");
