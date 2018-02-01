import 'classlist.js';
import anime from 'animejs';
import * as util from '../helper/util';

const className = {
  active: 'is-active'
};

export default class Navigation {
  constructor() {
    this.header = document.getElementById('js-header');
    this.target = document.getElementById('js-navi');
    this.anchors = this.target.querySelectorAll('a');
    this.sections = document.querySelectorAll('js-scroll-section');
  }

  init() {
  }

  addEvent() {
    const options = util.enablePassiveEventListeners() ? {
      passive: true
    } : false;

    [].forEach.call(this.anchors, (anchor)=>{
      anchor.addEventListener('click', this.onClickAnchor.bind(this), options);
    });

    window.addEventListener('scroll', this.onScroll.bind(this), options);
  }

  onScroll() {
    
  }

  onClickAnchor() {

  }



}
