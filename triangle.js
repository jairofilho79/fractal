(()=>{
	const container = document.getElementById("svg-container");
	
	let 
	width = 100; 
	height = 100;
	xi = 0;
	xf = xi+width;
	yi = 0;
	yf = yi+height;

	container.innerHTML = `<svg id="mysvg" height="${height}" width="${width}"></svg>`;

	let svg = document.getElementById("mysvg");

	let iterations = 9;
	svg.innerHTML = drawFractal(doFractal(1,iterations,[[[width/2,yi],[xi,yf],[xf,yf]]],width,height)	);
})();

function doFractal(it,itf,dtset,width,height) {
	let triangle = [];
	let x = width/2**(it+1), y = height/2**(it);
	for(let dt of dtset) {

		let x1 = Number(dt[0][0]), x2 = Number(dt[1][0]), x3 = Number(dt[2][0]); y1 = Number(dt[0][1]), y2 = Number(dt[1][1]), y3 = Number(dt[2][1]);
		let dots = [];
		dots.push([[x1-x,y1+y],                    [x2,y2],                                                   [x1,y3]]);
		dots.push([[x1,y1],                                  	          [x2+x,y2-y],                        [x1+x,y3-y]]);
		dots.push([[x1+x,y1+y],                    [x2+(2*x),y2],                                             [x3,y3]]);
		triangle = triangle.concat(dots);
	}
	if(it === itf) {return triangle};

	return doFractal(++it,itf,triangle,width,height);
}
function drawFractal(dataset) {
	let paths = ``;
	for(let dt of dataset) {
		paths += `<path d="M${dt[0][0]} ${dt[0][1]} L${dt[1][0]} ${dt[1][1]} L${dt[2][0]} ${dt[2][1]} Z" />`;
	}
	return paths;
} 