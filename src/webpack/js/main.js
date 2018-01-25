import Canvas from './modules/Canvas';
import Stamps from './modules/Stamps';
import Gesture from './modules/Gesture';
// import Generator from './modules/Generator';

window.addEventListener('load', ()=>{
  const addButon = document.getElementById('js-add-image');
  const canvas = new Canvas();
  const stamps = new Stamps(canvas.app);
  const gesture = new Gesture(canvas.app, stamps);

  canvas.init();

  gesture.addEvent();

  addButon.addEventListener('click', ()=>{
    stamps.add('/images/sample.jpeg')
  }, false);

}, false);

