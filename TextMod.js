/*
*   Tamás Szabó
*   TextMod.js
*
*   How it works:
*
*   2 specific CSS rule needed to decrease an overflown text
*   max-height and max-width
*   
*   3 specific CSS rule needed to increase a small text
*   max-height and max width, and the element's height and width need to be equal to the text height and width
*   
*   For example lets take a <div> element which is a block level element, so we need to set a width or height rule aswell not just the 
*   max-height and max-width property or we can specifiy the <div> as an inline-block element so it automatically takes the width and height of its content
*
*/

function TextModInit(settings) {

  // Set Default settings if not given
  if(typeof settings === 'undefined') {
    settings = {};
  }
  
  settings = {
    minFontSize: ( typeof settings.minFontSize === 'undefined' ) ? 0 : settings.minFontSize,
    maxFontSize: ( typeof settings.maxFontSize === 'undefined' ) ? 200 : settings.maxFontSize,
    debug: ( typeof settings.debug === 'undefined' ) ? true : settings.debug,
    elemSelector: ( typeof settings.elemSelector === 'undefined' ) ? 'div' : settings.elemSelector,
    waitForElementToLoad: ( typeof settings.waitForElementToLoad === 'undefined') ? false : settings.waitForElementToLoad
  }

  // Init TextMod
  if(settings.waitForElementToLoad) {

    // The interval checks every 500ms if the element is loaded, when it's loaded the text resizin begins
    var interval = setInterval(function() {
      var text = document.querySelector(settings.elemSelector);

      if(text.offsetWidth > 0 && text.offsetHeight > 0) {
        clearInterval(interval);
        TextModResize(text, settings);
      }
    }, 500);
  }else {
    var text = document.querySelector(settings.elemSelector);
    TextModResize(text, settings)
  }
}

function TextModResize(text, settings) {

  if(settings.debug) {
    console.warn('TextMod: TextMod has started');
  } 

  if(!text && settings.debug) {
    console.error('TextMod: ' + settings.elemSelector + " does not exists!");
    return;
  }

  var maxWidth  = parseInt(window.getComputedStyle(text, null).getPropertyValue('max-width').replace('px', ''));
  var maxHeight = parseInt(window.getComputedStyle(text, null).getPropertyValue('max-height').replace('px', ''));

  if(!maxWidth && settings.debug) {
    console.warn("TextMod: Element does not have a max width CSS property!");
  }

  if(!maxHeight && settings.debug) {
    console.warn("TextMod: Element does not have a max width CSS property!");
  }

  // Checking if the text is oveflown or if the text is too small for the container
  if(text.offsetWidth < text.scrollWidth || text.offsetHeight < text.scrollHeight) { TextModDecrease(text, maxHeight, maxWidth, settings) }
  if(text.offsetWidth < maxWidth && text.offsetHeight < maxHeight) { TextModIncrease(text, maxWidth, maxHeight, settings) }
}
    
function TextModDecrease(text, maxHeight, maxWidth) {

  if(settings.debug) {
    console.warn('TextMod: Text decreasing has started')
  }

  // Looping and decreasing font size as long as the text isn't fiting perfectly
  do {  
    var currentFontSizeDecrease = parseInt(window.getComputedStyle(text, null).getPropertyValue('font-size').replace('px', ''));
    text.style.fontSize = (currentFontSizeDecrease -1 ) + 'px';

    if(currentFontSizeDecrease > settings.minFontSize) {
      if(settings.debug) {
        console.error('TextMod: Text decreasing reached the specified minimum font size');
      }
      break;
    }

  } while(text.scrollWidth > maxWidth || text.scrollHeight > maxHeight)
}

function TextModIncrease(text, maxWidth, maxHeight) {

  // Looping and increasing font size as long as the text has space to grow
  do {

    var currentFontSizeIncrease = parseInt(window.getComputedStyle(text, null).getPropertyValue('font-size').replace('px', ''));
    text.style.fontSize = (currentFontSizeIncrease + 1 ) + 'px';

    if(currentFontSizeIncrease > settings.maxFontSize) {
      if(settings.debug) {
        console.error('TextMod: Text increasing reached the specified maximum font size');
      }
      break;
    }

  }while(text.clientWidth < maxWidth && text.clientHeight < maxHeight);

  text.style.fontSize = currentFontSizeIncrease + 'px';
}