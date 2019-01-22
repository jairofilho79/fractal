// (()=> {
//
// })();

let polygonCounter = 1;
//Add new input
document.getElementById('btn-input').addEventListener('click',function() {
    polygonCounter++;

    let input = document.getElementById('inputs-container').appendChild(document.createElement(`input`));
    input.setAttribute("class","polygon")
    input.setAttribute("type","text")
    input.setAttribute("id",`${polygonCounter}-polygon`)
    input.setAttribute("placeholder","Polygon");

    document.getElementById('inputs-container').appendChild(document.createElement('br'));

    Array.from( document.getElementsByClassName("polygon")).forEach(function(element) {
        element.addEventListener('mousedown', function(e) {
            if(e.which == 3) {
                let elem = document.getElementById(this.id);
                elem.parentElement.removeChild(elem);
            }
        });
    });
})

//Generate Fractal Data
document.getElementById('generate').addEventListener('click',function() {
    //Getting Input data and validating
    let firstIteration = document.getElementById('firstIt'); if(firstIteration.value.length == 0) {firstIteration.focus(); return;}

    let stopCond = document.getElementById('stopCond');
    // if(stopCond.value.length == 0) {stopCond.focus(); return;}
    // else {if(!(!isNaN(stopCond.value) && isFinite(stopCond.value))) {alert("This must be a Number"); stopCond.focus(); return;}}

    let sizeIt = document.querySelector(`input[name="size-it"]:checked`);
    let polygons = [];

    firstIteration = eval(firstIteration.value);

    //TODO: melhorar sistemas de validação para evitar injection.

    for(let pol of document.getElementsByClassName('polygon')) {
        let p = {};
        if(eval(pol).value.length == 0) {pol.focus(); return;}
        if(eval(pol.value).length != firstIteration.length) {alert("This polygon must of the same size of First Iteration Polygon"); pol.focus(); return;}
        polygons.push(pol);
    }

    //Generating data
    let i = 0;
    let dataset = [];

    function doFractal(stopCond,dtset) {
        let temp = [];
        for(let dt of dtset) {
            let p = {};
            for(let i = 1; i <= dt.length; i++) {
                p["x"+i] = dt[i-1][0];
                p["y"+i] = dt[i-1][1];
            }
            let dots = [];
            for(let i = 0; i < polygons.length; i++) {
                dots.push(eval(eval(polygons[i]).value));
            }
            temp = temp.concat(dots);
        }
        if(sizeIt == 1) {dataset = dataset.concat(temp);}
        i++;
        if( i == 10) return temp;
        if(eval(stopCond)) return sizeIt == 1 ? dataset : temp;
        return doFractal(stopCond,temp);
        i++;
    }
    console.log(doFractal(stopCond,[firstIteration]));
})