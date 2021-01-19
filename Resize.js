function textResize(elem) {
    var text = document.querySelector(elem);
    var maxWidth  = parseInt(window.getComputedStyle(text, null).getPropertyValue('max-width').replace('px', ''));
    var maxHeight = parseInt(window.getComputedStyle(text, null).getPropertyValue('max-height').replace('px', ''));
  
    if(text.innerHTML.indexOf('}}') > -1) {
        return;
    }
  
    if(!text) {
      console.error("Element does not exists!");
    }
  
    if(!maxWidth) {
      console.error("Element does not have a max width CSS property!");
    }
  
    if(!maxHeight) {
      console.error("Element does not have a max width CSS property!");
    }
  
    if((text.scrollWidth > text.clientWidth) || (text.scrollHeight > text.clientHeight)){ decrease(text) }
    if((text.clientWidth < maxWidth) && (text.clientHeight < maxHeight)) { increase(text) }
  }
  
  function decrease(text) {
    var maxWidth  = parseInt(window.getComputedStyle(text, null).getPropertyValue('max-width').replace('px', ''));
    var maxHeight = parseInt(window.getComputedStyle(text, null).getPropertyValue('max-height').replace('px', ''));
  
    while((text.scrollWidth > maxWidth) || (text.scrollHeight > maxHeight)) {
      var currentFontSize = parseInt(window.getComputedStyle(text, null).getPropertyValue('font-size').replace('px', ''));
      text.style.fontSize = (currentFontSize -1 ) + 'px';
    }
  }
  
  function increase(text) {
    var maxWidth  = parseInt(window.getComputedStyle(text, null).getPropertyValue('max-width').replace('px', ''));
    var body = document.querySelector('body');
    var isTempDivExists = document.getElementById('temp-div');
    currentFontSize = parseInt(window.getComputedStyle(text, null).getPropertyValue('font-size').replace('px', ''));
  
    if(!isTempDivExists) {
      var tempDiv = document.createElement('div');
      tempDiv.id = 'temp-div';
      tempDiv.className = text.parentNode.className;
      tempDiv.style.position = 'absolute';
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.width = 'auto';
      tempDiv.style.height = 'auto';
      tempDiv.style.fontSize = currentFontSize + 'px';
      tempDiv.innerHTML = text.innerHTML;
      body.appendChild(tempDiv);
    }
  
    while(tempDiv.clientWidth < maxWidth - 10) {
      console.log(tempDiv.clientWidth)
      console.log(maxWidth)
      currentFontSize = parseInt(window.getComputedStyle(text, null).getPropertyValue('font-size').replace('px', ''));
  
      text.style.fontSize = (currentFontSize + 1 ) + 'px';
      tempDiv.style.fontSize = (currentFontSize + 1 ) + 'px';
    }
  
    //body.removeChild(tempDiv);
  }
  
  setTimeout(function() {
    textResize('.copy span');
  }, 200);
  