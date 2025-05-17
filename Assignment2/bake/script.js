window.addEventListener("load", () => {
    const ovenImg = document.getElementById("oven-img");
    const canvas = document.getElementById("drawing-canvas");
    const ctx = canvas.getContext("2d");
    const colorPicker = document.getElementById("color-picker");
    const undoBtn = document.getElementById("undo-btn");
    const exportBtn = document.getElementById("export-btn");
    const chalkSound = document.getElementById("chalk-sound");
  
    let drawing = false;
    let currentColor = "#000000";
    let prevState = null;
  
    ovenImg.onload = () => {
      canvas.width = ovenImg.width;
      canvas.height = ovenImg.height;
  
      canvas.style.width = ovenImg.width + "px";
      canvas.style.height = ovenImg.height + "px";
  
      canvas.style.position = "absolute";
      canvas.style.top = ovenImg.offsetTop + "px";
      canvas.style.left = ovenImg.offsetLeft + "px";
  
      const container = document.getElementById("drawing-container");
      container.style.width = ovenImg.width + "px";
      container.style.height = ovenImg.height + "px";
      container.style.position = "relative";
    };
  
    if (ovenImg.complete) ovenImg.onload();
  
    colorPicker.addEventListener("input", () => {
      currentColor = colorPicker.value;
    });
  
    // Save current state for undo
    function saveState() {
      prevState = canvas.toDataURL();
    }
  
    undoBtn.addEventListener("click", () => {
      if (!prevState) return;
      drawDataURLToCanvas(prevState);
    });
  
    // Draw saved state back onto canvas
    function drawDataURLToCanvas(imgDataURL) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = imgDataURL;
    }
  
    // Start drawing
    canvas.addEventListener("mousedown", (e) => {
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
      saveState(); // Save before drawing
  
      // Play chalk sound
      chalkSound.currentTime = 0;
      chalkSound.loop = true;
      chalkSound.play();
    });
  
    // Draw
    canvas.addEventListener("mousemove", (e) => {
      if (!drawing) return;
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    });
  
    // Stop drawing
    function stopDrawing() {
      if (!drawing) return;
      drawing = false;
      ctx.closePath();
      chalkSound.pause();
      chalkSound.currentTime = 0;
    }
  
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseleave", stopDrawing);
  
    // Export oven + drawing
    exportBtn.addEventListener("click", () => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
  
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
  
      tempCtx.drawImage(ovenImg, 0, 0, canvas.width, canvas.height); // oven background
      tempCtx.drawImage(canvas, 0, 0); // drawing on top
  
      const link = document.createElement("a");
      link.download = "oven-drawing.png";
      link.href = tempCanvas.toDataURL("image/png");
      link.click();
    });
  });
  
// Play Chief talk audio
function playDrawTalk() {
    const audio = document.getElementById('chiefAudio');
    audio.currentTime = 0;  // rewind to start
    audio.play();
  }
  