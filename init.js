
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

    
    material = new THREE.MeshNormalMaterial();
    material.shading = THREE.SmoothShading;
    geo = new THREE.SphereGeometry(SCENESIZE/2,6,6); 
    mesh = new DYNAMIC(geo,material);

    DYNAMOS.push(mesh);
    console.log(mesh.geometry.vertices);
    scene.add(mesh.mesh);

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

    for(var i = 0; i < DYNAMOS.length; i++){
      DYNAMOS[i].update();
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

