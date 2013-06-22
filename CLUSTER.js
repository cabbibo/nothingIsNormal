
/*
 *
 * A CLUSTER is a system made from a single Dynamic Object
 * It can be moved 
 *
 */

function CLUSTER( dynamic , numOf ){

  this.dynamic = dynamic;
  this.numOf = numOf;

  this.dynamics = [];
  this.data = [];
  this.targets = [];

  this.scene = new THREE.Object3D();
  this.targetScene = new THREE.Object3D();
  this.dataScene = new THREE.Object3D();

  scene.add(this.scene);

  this.movementSpeed = .1;

  for( var i = 0; i < numOf; i++){

    var newDynamic = new THREE.Mesh( dynamic.geometry , dynamic.material );
    var newData = new THREE.Mesh( dynamic.geometry , dynamic.material );
    var newTarget = new THREE.Mesh( dynamic.geometry , dynamic.material );

    this.dynamics.push( newDynamic );
    this.data.push( newData );
    this.targets.push( newTarget );

  }

  // Set the first object in the dynamics array 
  // equal to the original dynamic
  this.dynamics[0] = this.dynamic.mesh; 

}


CLUSTER.prototype = {

  addToScene:function(){
    for( var i = 0; i < this.dynamics.length; i++){
      this.scene.add( this.dynamics[i] )
    }
  },

  removeFromScene:function(){
    for( var i = 0; i < this.dynamics.length; i++){
      this.scene.remove( this.dynamics[i] )
    }
  },

  removeAllButOG: function(){
    for( var i = 1; i < this.dynamics.length; i++){
      this.scene.remove( this.dynamics[i] )
    }
  },


  update: function(){

    this.dynamic.update();

    var data = this.dataScene;
    var target = this.targetScene;

    data.position.x += (target.position.x - data.position.x) * this.movementSpeed;
    data.position.y += (target.position.y - data.position.y) * this.movementSpeed;
    data.position.z += (target.position.z - data.position.z) * this.movementSpeed;
    
    data.rotation.x += (target.rotation.x - data.rotation.x) * this.movementSpeed;
    data.rotation.y += (target.rotation.y - data.rotation.y) * this.movementSpeed;
    data.rotation.z += (target.rotation.z - data.rotation.z) * this.movementSpeed;

    data.scale.x += (target.scale.x - data.scale.x) * this.movementSpeed;
    data.scale.y += (target.scale.y - data.scale.y) * this.movementSpeed;
    data.scale.z += (target.scale.z - data.scale.z) * this.movementSpeed;
    
    if( this.sceneVisuals ){
      this.sceneVisuals();
    }else{
      this.scene.position.copy(data.position);
      this.scene.rotation.copy(data.rotation);
      this.scene.scale.copy(data.scale);
    }
    
    

    for(var i = 0; i < this.targets.length; i++){

      var target = this.targets[i];
      var data = this.data[i];
      var dynamic = this.dynamics[i];

      // Moving position to target
      data.position.x += (target.position.x - data.position.x) * this.movementSpeed;
      data.position.y += (target.position.y - data.position.y) * this.movementSpeed;
      data.position.z += (target.position.z - data.position.z) * this.movementSpeed;

      // Moving rotation to target
      data.rotation.x += (target.rotation.x - data.rotation.x) * this.movementSpeed;
      data.rotation.y += (target.rotation.y - data.rotation.y) * this.movementSpeed;
      data.rotation.z += (target.rotation.z - data.rotation.z) * this.movementSpeed;

      //Moving scale to target
      data.scale.x += (target.scale.x - data.scale.x) * this.movementSpeed;
      data.scale.y += (target.scale.y - data.scale.y) * this.movementSpeed;
      data.scale.z += (target.scale.z - data.scale.z) * this.movementSpeed;

      if( this.visuals ){
        this.visuals(i);
      }else{
        dynamic.position.copy(data.position);
        dynamic.rotation.copy(data.rotation);
        dynamic.scale.copy(data.scale);
      }

    }

  },


  centerPosition: function(){
    for(var i = 0; i < this.numOf; i++){
      this.targets[i].position.set( 0 , 0 , 0);
    }
  },

  lineXPosition: function( length ){
    for(var i = 0; i < this.numOf; i++){
      var x = ((i/this.numOf)-.5) * length;
      this.targets[i].position.set( x , 0, 0 );
    }
  },


  ringXPosition: function( radius ){
    for(var i = 0; i < this.numOf; i++){
      var angle = (i/this.numOf)*2*Math.PI;
      var pos = UTILS.toCart( radius , angle );
      this.targets[i].position.set( pos.z, pos.y, pos.x );
    }
  },

  ringYPosition: function( radius ){
    for(var i = 0; i < this.numOf; i++){
      var angle = (i/this.numOf)*2*Math.PI;
      var pos = UTILS.toCart( radius , angle );
      this.targets[i].position.set( pos.x, pos.z, pos.y );
    }
  },

  ringZPosition: function( radius ){
    for(var i = 0; i < this.numOf; i++){
      var angle = (i/this.numOf)*2*Math.PI;
      var pos = UTILS.toCart( radius , angle );
      this.targets[i].position.set( pos.x, pos.y, pos.z );
    }
  },


  cubePosition: function( size ){
    for( var i = 0; i < this.numOf; i ++){
      
      var vert = i % 8;
      var vertArray = [
        [ size , size , size ],
        [ -size , size , size ],
        [ size , -size , size ],
        [ size , size , -size ],
        [ -size , -size , size ],
        [ -size , size , -size ],
        [ size , -size , -size ],
        [ -size , -size , -size ],
      ]

      var x = vertArray[vert][0];
      var y = vertArray[vert][1];
      var z = vertArray[vert][2];
      
      this.targets[i].position.set( x , y , z );
    
    }
  },

  tetrahedronPosition:function( size ){

    for( var i = 0; i < this.numOf; i ++){
      
      var vert = i % 6;
      var vertArray = [
        [ size , 0 , 0 ],
        [ 0 , size , 0 ],
        [ 0 , 0, size ],
        [ -size , 0 , 0 ],
        [ 0 , -size , 0 ],
        [ 0 , 0 , -size ],
      ]

      var x = vertArray[vert][0];
      var y = vertArray[vert][1];
      var z = vertArray[vert][2];
      
      this.targets[i].position.set( x , y , z );
    
    }

  },

  loopPosition:function( size ){
    for(var i = 0; i < this.numOf; i++){
      var t = (i/this.numOf)*2*Math.PI;
      var p = ((i/this.numOf)-.5)*2*Math.PI;
      var pos = UTILS.toCart( radius , t , p );
      this.targets[i].position.set( pos.x, pos.y, pos.z );
    }
  },

  spherePosition:function( size ){
    for(var i = 0; i < this.numOf; i++){
      var t = Math.random()*2*Math.PI;
      var p = (Math.random()-.5)*2*Math.PI;
      var pos = UTILS.toCart( size , t , p );
      this.targets[i].position.set( pos.x, pos.y, pos.z );
    }
  },

  randomPosition:function( size ){
    for( var i = 0; i < this.numOf; i ++){
      var x = (Math.random()-.5) * size;
      var y = (Math.random()-.5) * size;
      var z = (Math.random()-.5) * size;
      this.targets[i].position.set( x , y , z );
    }
  },

  xRotation: function( range ){
    for( var i = 0; i < this.numOf; i ++){
      var x = (i/this.numOf) * range;
      this.targets[i].rotation.set( x , 0 , 0 );
    }
  },

  yRotation: function( range ){
    for( var i = 0; i < this.numOf; i ++){
      var y = (i/this.numOf) * range;
      this.targets[i].rotation.set( 0 , y , 0 );
    }
  },

  zRotation: function( range ){
    for( var i = 0; i < this.numOf; i ++){
      var z = (i/this.numOf) * range;
      this.targets[i].rotation.set( 0 , 0 , z );
    }
  },
 
  randomRotation: function( range ){
    for( var i = 0; i < this.numOf; i ++){
      var x = (Math.random()-.5) * range;
      var y = (Math.random()-.5) * range;
      var z = (Math.random()-.5) * range;
      this.targets[i].rotation.set( x , y , z );
    }
  },

  noRotation: function( range ){
    for( var i = 0; i < this.numOf; i ++){
      this.targets[i].rotation.set( 0 , 0 , 0 );
    }
  },

  randomXScale:function( size ){
    for( var i = 0; i < this.numOf; i ++){
      var s = Math.random() * size;
      this.targets[i].scale.set( s , 0 , 0 );
    }
  },

  randomYScale:function( size ){
    for( var i = 0; i < this.numOf; i ++){
      var s = Math.random() * size;
      this.targets[i].scale.set( 0 , s , 0 );
    }
  },

  randomZScale:function( size ){
    for( var i = 0; i < this.numOf; i ++){
      var s = Math.random() * size;
      this.targets[i].scale.set( 0 , 0 , s );
    }
  },

  randomScale:function( size ){
    for( var i = 0; i < this.numOf; i ++){
      var s = Math.random() * size;
      this.targets[i].scale.set( s , s , s );
    }
  },

  randomAllScale: function( size ){
    for( var i = 0; i < this.numOf; i ++){
      var x = Math.random() * size;
      var y = Math.random() * size;
      var z = Math.random() * size;
      this.targets[i].scale.set( x , y , z );
    }
  },

  linearScale: function( size ){
    for( var i = 0; i < this.numOf; i ++){
      var s = (i/this.numOf) * size;
      this.targets[i].scale.set( s , s , s );
    }
  },

  noScale:function( range ){
    for( var i = 0; i < this.numOf; i ++){
      this.targets[i].scale.set( 1 , 1 , 1 );
    }
  },

  randomSceneScale:function( size ){
    var s = Math.random() * size;
    this.targetScene.scale.set( s , s , s );
  },

  randomSceneAllScale: function( size ){
    var x = Math.random() * size;
    var y = Math.random() * size;
    var z = Math.random() * size;
    this.targetScene.scale.set( x , y , z );
  },

  linearSceneScale: function( size ){
    var s = (i/this.numOf) * size;
    this.targetScene.scale.set( s , s , s );
  },

  noSceneScale:function( range ){
    this.targetScene.scale.set( 1 , 1 , 1 );
  },

  randomSceneRotation: function(range){
    var x = ( Math.random() - .5 ) * range; 
    var y = ( Math.random() - .5 ) * range; 
    var z = ( Math.random() - .5 ) * range; 
    this.targetScene.rotation.set( x , y , z );
  },

  targetSceneRotation: function( x , y , z ){
    this.targetScene.rotation.set( x , y , z );
  },

  noSceneRotation: function(){
    this.targetScene.rotation.set( 0 , 0 , 0 );
  },

  centerScene: function(){
    this.targetScene.position.set( 0 , 0 , 0 );
  },

  

}
