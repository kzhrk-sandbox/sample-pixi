export const getNumber = (string)=>{
	return parseInt(string, 10);
};

export const isSpView = ()=>{
	return matchMedia('(max-width: 768px)').matches;
};

export const enablePassiveEventListeners = ()=>{
	let result = false;

	const opts = Object.defineProperty && Object.defineProperty({}, 'passive', {
		get: ()=>{
			result = true;
		}
	});

	document.addEventListener('test', ()=>{}, opts);

	return result;
};

export const getComputedTranslateXY = (obj)=>{
  const transArr = [];
  if(!window.getComputedStyle) return;

  const style = getComputedStyle(obj);
  const transform = style.transform || style.webkitTransform || style.mozTransform;
  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if(mat) return parseFloat(mat[1].split(', ')[13]);
  mat = transform.match(/^matrix\((.+)\)$/);
  mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : 0;
  mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : 0;
  return transArr;
}

export const getTransitionendName = ()=>{
  const el = document.createElement('test');
  const transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
  };
  let key;

  for(key in transitions){
    if( el.style[key] !== undefined ){
      return transitions[key];
    }
  }

  return false;
};

export const hasCssProperty = (key)=>{
  const styles = getComputedStyle(document.body);
  const vendors = ['', 'ms', 'moz', 'webkit', 'o'];
  let result = false;
  let style;

  vendors.forEach((vendor)=>{
    if (result) return;

    if (vendor === '') {
      style = key;
    }
    else {
      style = key.replace(/^[a-z]/, key.charAt(0).toUpperCase());
    }

    result = styles.hasOwnProperty(`${vendor}${style}`);
  });

  return result;
};

export const getQueryObject = ()=>{
  let object = {};

  let arrQueries = location.search.replace(/^\?/, '').split('&');

  arrQueries.forEach((query)=>{
    let key = query.split('=')[0];
    let val = query.split('=')[1];

    object[key] = val;
  });

  return object;
};

export const mouseWheelEvent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';