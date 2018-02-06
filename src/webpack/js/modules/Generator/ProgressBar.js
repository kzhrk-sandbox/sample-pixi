export default class ProgressBar {
  constructor() {
    this.stepClasses = [
      'step1',
      'step2',
      'step3',
      'step4',
      'step5'
    ];
    this.current = 0;
    this.target = document.getElementById('js-progress-bar');
  }

  init() {

  }

  next() {
    this.target.classList.call()
    this.target.classList.add(this.stepClasses[this.current++]);
  }

  prev() {
    this.target.classList.add(this.stepClasses[this.current--]);
  }
}