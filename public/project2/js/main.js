var camera, scene, light, renderer, container;
var meshs = [];
var grounds = [];
var isMobile = false;
var antialias = true;
var graph;
var stats;
var iterationNumber = 0;
var trailCount = 0;
var gravityConst = 0.5
var geos = {};
var mats = {};
var spheres = [];
var updateIntervalHandler;

loadAssets(main);
function main(){
	initShapes();
	init();
	loop();
	startAnimation();
	setupWorld();	
}

function setupWorld() {
	//drawAxes();
	
	//addSphere({x:0, y: 100, vx: 1 })

	 loadPlanets();
}


function loadPlanets(){
	// use variable planets from planets.js
	// to turn degrees to radian: alpha * Math.PI / 180
//------------------- BEGIN YOUR CODE
	for(var key in planets)
	{
		addSphere({name:key,vz:planets[key].velocity,x:planets[key].distance});
	}
//------------------- END YOUR CODE
	scene.add(sl);
	scene.remove(light);
	scene.remove(ambientLight);
	scene.remove(background);
}

/*
 *	returns mesh of a sphere positioned at x,y,z
 *
 *  creating a new mesh: new THREE.Mesh( geometry, material );
 *  setting a position:  mesh.position.set(x, y, z);
 */
function addSphere(params)
{
	// TODO
	// scene has a function .add(mesh)
	// geometry ---> geos.sphere
	// material ---> mats.sphere

	params = params || {};
	params.x = params.x || 0;
	params.y = params.y || 0;
	params.z = params.z || 0;
	params.vx = params.vx || 0;
	params.vy = params.vy || 0;
	params.vz = params.vz || 0;
	params.ax = params.ax || 0;
	params.ay = params.ay || 0;
	params.az = params.az || 0;
	params.name = params.name || "sphere";

	var meshTmp = new THREE.Mesh(geos[params.name], mats[params.name]);
	meshTmp.position.set(params.x, params.y, params.z)
	scene.add(meshTmp)

	var obj = {
		mesh : meshTmp,
		pos : {x : params.x, y : params.y, z : params.z},
		v : {x : params.vx, y : params.vy, z : params.vz},
		a : {x : params.ax, y : params.ay, z : params.az}
	}

	if(params.name != "sun") spheres.push(obj);
}

/*
* start calling the update function every 1000/60 milliseconds
*/
function startAnimation(){
	if(updateIntervalHandler) clearInterval(updateIntervalHandler);
	updateIntervalHandler =	setInterval(updateScene, 1000/60);
}

/*
* change the positions according to the physics
*/
function updateScene(){
	var i, obj, newPosition;
	iterationNumber = (iterationNumber + 1) % 100000;
	for(i = 0; i < spheres.length; ++i){
		obj = spheres[i];
		newPosition = getPosition(obj);
		if (iterationNumber % 30 == 0 && trailCount < 2000) addTrail(obj.pos);
		obj.mesh.position.set(newPosition.x, newPosition.y, newPosition.z)
		obj.pos = newPosition;
	}
}

function addTrail(pos){
	 var meshTmp = new THREE.Mesh(geos.trail, mats.trail);
	 meshTmp.position.set(pos.x, pos.y, pos.z)
	 scene.add(meshTmp)
	 trailCount++;
}


/*
* returns the acceleration, based on 
* gravity
*/
function getAcceleration(obj) {
	// simulate the gravity force between the object and the origin(sun)
	// dont forget to multiply by the gravityConst
//------------------- BEGIN YOUR CODE
	var r= Math.sqrt(obj.pos.x*obj.pos.x+obj.pos.y*obj.pos.y+obj.pos.z*obj.pos.z);
	var k= gravityConst;
	var a = {
		x:(-k)*obj.pos.x/(r*r),
		y:(-k)*obj.pos.y/(r*r),
		z:(-k)*obj.pos.z/(r*r)
				}

	return a;
//------------------- END YOUR CODE	
}

function getVelocity(obj) {
//------------------- BEGIN YOUR CODE

	a = getAcceleration(obj);
	obj.a = a;

	var newX = obj.v.x;
	var newY = obj.v.y;
	var newZ = obj.v.z;
	newX+= a.x;
	newY+= a.y;
	newZ+= a.z;
	return {x:newX,y:newY,z:newZ};  

//------------------- END YOUR CODE	

	return obj.v;
}

function getPosition(obj) {
	v = getVelocity(obj);
	obj.v = v;

	var newX = obj.pos.x + v.x;
	var newY = obj.pos.y + v.y;	
	var newZ = obj.pos.z + v.z;	
	
	return {x : newX, y : newY, z : newZ}
}

