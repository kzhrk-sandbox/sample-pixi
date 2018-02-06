import Generator from './modules/Generator';
import Stamps from './modules/Generator/Stamps';
import Gesture from './modules/Generator/Gesture';
import Filter from './modules/Generator/Filter';
import Text from './modules/Generator/Text';
import Photo from './modules/Generator/Photo';

import * as config from './config';

window.addEventListener('load', ()=>{
  const addFilterAlpha = document.getElementById('js-filter-alpha-add');
  const addFilterBlur = document.getElementById('js-filter-blur-add');
  const removeFilterAlpha = document.getElementById('js-filter-alpha-remove');
  const removeFilterBlur = document.getElementById('js-filter-blur-remove');

  const inputText = document.getElementById('js-text');
  const textSubmit = document.getElementById('js-text-submit');
  const fontFamilies = document.querySelectorAll('.js-text-font');
  const textColors = document.querySelectorAll('.js-text-color');

  const addButton = document.getElementById('js-add-image');
  const downloadButton = document.getElementById('js-download');

  const generator = new Generator();
  const stamps = new Stamps(generator.app);
  const gesture = new Gesture(generator.app, stamps);
  const filter = new Filter(generator.app);
  const text = new Text(generator.app);
  const photo = new Photo(generator.app);

  generator.init();

  gesture.addEvent();
  photo.addEvent();

  addFilterAlpha.addEventListener('click', ()=>{
    filter.add(config.filter.alpha);
  }, false);

  addFilterBlur.addEventListener('click', ()=>{
    filter.add(config.filter.blur);
  }, false);

  removeFilterAlpha.addEventListener('click', ()=>{
    filter.remove(config.filter.alpha);
  }, false);

  removeFilterBlur.addEventListener('click', ()=>{
    filter.remove(config.filter.blur);
  }, false);

  addButton.addEventListener('click', ()=>{
    stamps.add('images/sample.jpeg')
  }, false);

  downloadButton.addEventListener('click', ()=>{
    const tmpImg = new Image();

    tmpImg.src = generator.getImage();

    document.body.appendChild(tmpImg)
  }, false);

  textSubmit.addEventListener('click', ()=>{
    text.setText(inputText.value);
    text.add();
  }, false);

  [].forEach.call(fontFamilies, (fontFamily)=>{
    fontFamily.addEventListener('click', ()=>{
      text.setFontFamily(fontFamily.dataset.font);
    }, false);
  });

  [].forEach.call(textColors, (textColor)=>{
    textColor.addEventListener('click', ()=>{
      text.setFill(textColor.dataset.color);
    }, false);
  });

}, false);

