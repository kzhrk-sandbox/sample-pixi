export const getParents = (dom)=>{
	let result = [];
	let currentDom = dom;

	while(currentDom.parentNode !== null) {
		result.push(currentDom.parentNode);
		currentDom = currentDom.parentNode;
	}

	return result;
};
