const ua = navigator.userAgent.toLowerCase();

export const isIOS = ()=>{
  return /iphone|ipad|ipod/.test(ua);
};

export const isSp = ()=>{
  return /iphone|ipad|ipod|android/.test(ua);
};
