var camera, scene, light, renderer, container;
var meshs = [];
var grounds = [];
var isMobile = false;
var antialias = true;
var graph;
var stats;

var geos = {};
var mats = {};
var spheres = [];
var updateIntervalHandler;

initShapes();
init();
loop();
startAnimation();
setupWorld();

function setupWorld() {
	drawAxes();
	addSphere({x:parseInt(Math.random()*10),y:parseInt(Math.random()*10),z:parseInt(Math.random()*10), vx: parseInt(Math.random()*5), vy:parseInt(Math.random()*5),vz:parseInt(Math.random()*5) });
	addSphere({x:parseInt(Math.random()*10),y:parseInt(Math.random()*10),z:parseInt(Math.random()*10), vx: parseInt(Math.random()*5), vy:parseInt(Math.random()*5),vz:parseInt(Math.random()*5) });
	addSphere({x:parseInt(Math.random()*10),y:parseInt(Math.random()*10),z:parseInt(Math.random()*10), vx: parseInt(Math.random()*5), vy:parseInt(Math.random()*5),vz:parseInt(Math.random()*5) });
	addSphere({x:parseInt(Math.random()*10),y:parseInt(Math.random()*10),z:parseInt(Math.random()*10), vx: parseInt(Math.random()*5), vy:parseInt(Math.random()*5),vz:parseInt(Math.random()*5) });
	addSphere({x:parseInt(Math.random()*10),y:parseInt(Math.random()*10),z:parseInt(Math.random()*10), vx: parseInt(Math.random()*5), vy:parseInt(Math.random()*5),vz:parseInt(Math.random()*5) });
	addSphere({x:parseInt(Math.random()*10),y:parseInt(Math.random()*10),z:parseInt(Math.random()*10), vx: parseInt(Math.random()*5), vy:parseInt(Math.random()*5),vz:parseInt(Math.random()*5) });
	addSphere({x:parseInt(Math.random()*10),y:parseInt(Math.random()*10),z:parseInt(Math.random()*10), vx: parseInt(Math.random()*5), vy:parseInt(Math.random()*5),vz:parseInt(Math.random()*5) });
	addSphere({x:parseInt(Math.random()*10),y:parseInt(Math.random()*10),z:parseInt(Math.random()*10), vx: parseInt(Math.random()*5), vy:parseInt(Math.random()*5),vz:parseInt(Math.random()*5) });
	addSphere({x:parseInt(Math.random()*10),y:parseInt(Math.random()*10),z:parseInt(Math.random()*10), vx: parseInt(Math.random()*5), vy:parseInt(Math.random()*5),vz:parseInt(Math.random()*5) });
	addSphere({x:parseInt(Math.random()*10),y:parseInt(Math.random()*10),z:parseInt(Math.random()*10), vx: parseInt(Math.random()*5), vy:parseInt(Math.random()*5),vz:parseInt(Math.random()*5) });
	addSphere({x:parseInt(Math.random()*10),y:parseInt(Math.random()*10),z:parseInt(Math.random()*10), vx: parseInt(Math.random()*5), vy:parseInt(Math.random()*5),vz:parseInt(Math.random()*5) });
	


	// TODO

}

/*
 *	returns mesh of a sphere positioned at x,y,z
 *
 *  creating a new mesh: new THREE.Mesh( geometry, material );
 *  setting a position:  mesh.position.set(x, y, z);
 */
function addSphere(params)
{
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
	// TODO
	var sphere = new THREE.Mesh(geos.sphere, mats.sphere);
	sphere.position.set(params.x,params.y,params.z);
	var obj = {
		mesh: sphere,
		v: {
			x: params.vx,
			y: params.vy,
			z: params.vz
		}, 
		pos: {
			x: params.x,
			y: params.y,
			z: params.z
		},
		a: {
			x: params.ax,
			y: params.ay,
			z: params.az
		}
	}
	scene.add(sphere);
	spheres.push(obj);
	
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
	for(i = 0; i < spheres.length; ++i){
		obj = spheres[i];
		newPosition = getPosition(obj);
		obj.mesh.position.set(newPosition.x, newPosition.y, newPosition.z)
		obj.pos = newPosition;
	}
}


/*
* returns the acceleration, based on 
* gravity and friction
*/
function getAcceleration(obj) {
	return obj.a;
}

function getVelocity(obj) {
	return obj.v;
}

function getPosition(obj) {
	v= getVelocity(obj);
	p={ x:obj.pos.x
		,y:obj.pos.y,
		z:obj.pos.z}
	if(p.x>100 || p.x<0)
	{
		obj.v.x = -(obj.v.x);
	}
	if(p.y>100 || p.y<0)
	{
		obj.v.y = -(obj.v.y);
	}
	if(p.z>100 || p.z<0)
	{
		obj.v.z = -(obj.v.z);
	}
	a= getAcceleration(obj);
	obj.v.y-=a.y;
	p.x += v.x || 0;
	p.y += v.y;
	p.z += v.z || 0;
	return p;
}