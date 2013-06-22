
function init(){

  clock = new THREE.Clock();

  //Sets up the CSS3D Scene
  camera = new THREE.PerspectiveCamera( 
    75, 
    window.innerWidth / window.innerHeight, 
    1, 
    10 * SCENESIZE 
  );
  camera.position.z = SCENESIZE;  
  scene = new THREE.Scene();
  
  var material = new THREE.MeshNormalMaterial();
  material.shading = THREE.SmoothShading;
  var geo = new THREE.SphereGeometry(SCENESIZE/4,20,20);
  
  sphere = new DYNAMIC(geo,material);
  spheres = new CLUSTER( sphere , 20 );

  spheres.addToScene();
  clusters.push(spheres);



  var material = new THREE.MeshNormalMaterial();
  material.shading = THREE.SmoothShading;
  var geo = new THREE.IcosahedronGeometry(SCENESIZE/4,2);

  icosahedron = new DYNAMIC(geo,material);
  icosahedrons = new CLUSTER( icosahedron, 20 );

  icosahedrons.targetScene.position.x = SCENESIZE/2;

  icosahedrons.addToScene();
  clusters.push(icosahedrons);



  var material = new THREE.MeshNormalMaterial();
  material.shading = THREE.SmoothShading;
  var geo = new THREE.CubeGeometry(SCENESIZE/4,SCENESIZE/4,SCENESIZE/4,10,10,10);

  cube = new DYNAMIC(geo,material);
  cubes = new CLUSTER( cube , 20 );

  cubes.targetScene.position.x = -SCENESIZE/2;

  cubes.addToScene();
  clusters.push(cubes);




  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position =  'absolute';

  stats = new Stats();
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';

  document.getElementById( 'container' )
    .appendChild( renderer.domElement);
  document.getElementById( 'container' )
    .appendChild( stats.domElement );


}

function animate(){

  
  delta = clock.getDelta();

  window.requestAnimationFrame(animate);

  for(var i = 0; i < clusters.length; i++){
    clusters[i].update();
  }

  stats.update(clock);
  renderer.render( scene , camera );

  TWEEN.update();
}

//Resizes the camera and renderer
//so that they always fill the screen
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}


init();
animate();
