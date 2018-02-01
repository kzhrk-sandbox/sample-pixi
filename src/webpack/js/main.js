import Generator from './modules/Generator';
import Stamps from './modules/Stamps';
import Gesture from './modules/Gesture';
import Filter from './modules/Filter';

import * as config from './config';

window.addEventListener('load', ()=>{
  const addFilterAlpha = document.getElementById('js-filter-alpha-add');
  const addFilterBlur = document.getElementById('js-filter-blur-add');
  const removeFilterAlpha = document.getElementById('js-filter-alpha-remove');
  const removeFilterBlur = document.getElementById('js-filter-blur-remove');

  const addButton = document.getElementById('js-add-image');
  const downloadButton = document.getElementById('js-download');

  const generator = new Generator();
  const stamps = new Stamps(generator.app);
  const gesture = new Gesture(generator.app, stamps);
  const filter = new Filter(generator.app);

  generator.init();

  gesture.addEvent();

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

}, false);

