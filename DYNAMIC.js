
function DYNAMIC(geometry,material){

  // This is the geometry we will use to display the object
  // AKA altering this will fundamentally change the look of 
  // object
  this.geometry = geometry.clone();

  // This is the geometery that we will base the main geometry
  // It is useful, because we need something to compare to
  // if we are altering the main geometry by music. 
  // Essentially it gives us a base that is unchanging,
  // that we can toy with, without affecting
  this.data = geometry.clone();

  // This is the geometry we will use when we are trying to 
  // smoothly move from one type of mesh to another. Essentially
  // it will be altered as a target, that will get tweened to,
  // but is never actually seen in the scene
  this.target = geometry.clone();

  // This is a copy of the Geometry we will keep forever,
  // so that if we want to return to the unaffected geometry,
  // We easily can
  this.OG = geometry.clone();

  // Give all the vertices 'normals' 
  // So that we can easily alter these normals, 
  // and apply them to the 'vertice normals of each face
  for( var i = 0; i < geometry.vertices.length; i++){
  
    var r1 = (Math.random() - .5) * 2;
    var r2 = (Math.random() - .5) * 2;
    var r3 = (Math.random() - .5) * 2;
   
    var n = new THREE.Vector3(r1,r2,r3).normalize()
    this.geometry.vertices[i].normal = new THREE.Vector3().copy(n);
    this.data.vertices[i].normal = new THREE.Vector3().copy(n);
    this.target.vertices[i].normal = new THREE.Vector3().copy(n);
    this.OG.vertices[i].normal = new THREE.Vector3().copy(n);
   
  }


  this.setOGNormals();
  this.returnToOG();

  this.material = material;
  this.mesh = new THREE.Mesh(this.geometry,this.material);

  //This is the speed we will move at between the
  //data and the target when the target changes
  this.movementSpeed = .1;

}


/*

  Dynamic prototype

*/
DYNAMIC.prototype = {

  
  // The update function,
  // which will move the data towards the target
  // as well as call all vert visual and face visual
  // functions that exist
  update:function(){

    for(var i = 0; i < this.target.vertices.length; i++){

      var target = this.target.vertices[i];
      var data = this.data.vertices[i];

      //moving the vertices of the data
      //to the vertices of the target
      data.x += (target.x - data.x) * this.movementSpeed;
      data.y += (target.y - data.y) * this.movementSpeed;
      data.z += (target.z - data.z) * this.movementSpeed;


      //Moving the normals of the the data
      //to the normals of the target
      data.normal.x += (target.normal.x - data.normal.x) * this.movementSpeed;
      data.normal.y += (target.normal.y - data.normal.y) * this.movementSpeed;
      data.normal.z += (target.normal.z - data.normal.z) * this.movementSpeed;

      if( this.vertVisuals ){
        this.vertVisuals(i);
      }else{
        this.mesh.geometry.vertices[i].copy(this.data.vertices[i]);
        this.mesh.geometry.vertices[i].normal.copy(this.data.vertices[i].normal);
      }

    }



    this.setVertexFaceNormals();

    this.geometry.verticesNeedUpdate = true; 
    this.geometry.normalsNeedUpdate = true; 

  },

  //Sets the vertex normals, as defined in the faces,
  //from the vertex normals we added to each vertex
  setVertexFaceNormals: function(){

    for(var i = 0; i < this.geometry.faces.length; i++){
      var face = this.geometry.faces[i];

      for(var j = 0; j < face.vertexNormals.length; j++){
        
        var vert;

        if (j == 0){
          vert = this.geometry.vertices[face.a].normal;
        }else if (j == 1){
          vert = this.geometry.vertices[face.b].normal;
        }else if (j == 2){
          vert = this.geometry.vertices[face.c].normal;
        }else if (j == 3){
          vert = this.geometry.vertices[face.d].normal;
        }

        face.vertexNormals[j] = vert;

      }

    }
  
    this.geometry.facesNeedUpdate = true;
    this.geometry.normalsNeedUpdate = true;
  },


  //Sets the vertex normals, as defined in the vertices,
  //from the vertex normals in the faces.
  //Redundant setting, but this should really only be used if
  //we are resetting the normals of the target.
  setVertexVertexNormals: function( which ){

    for(var i = 0; i < which.faces.length; i++){
      
      var face = which.faces[i];

      for(var j = 0; j < face.vertexNormals.length; j++){
        
        var vert ;

        if (j == 0){
          vert = which.vertices[face.a];
        }else if (j == 1){
          vert = which.vertices[face.b];
        }else if (j == 2){
          vert = which.vertices[face.c];
        }else if (j == 3){
          vert = which.vertices[face.d];
        }

        //console.log(face.vertexNormals[j]);
        vert.normal = face.vertexNormals[j].clone();

      }

    }
  
    which.facesNeedUpdate = true;
    which.normalsNeedUpdate = true;

  },


  randomGeometry:function(){

    for(var i = 0; i < this.target.vertices.length; i++){

      var vert = this.target.vertices[i];
      vert.x = (Math.random() - .5) * SCENESIZE;
      vert.y = (Math.random() - .5) * SCENESIZE;
      vert.z = (Math.random() - .5) * SCENESIZE;

    }

    this.target.verticesNeedUpdate = true;

  },

  randomVertexNormals:function(){

    for(var i = 0; i < this.target.vertices.length; i++){

      var vert = this.target.vertices[i].normal;
      vert.x = (Math.random() - .5) * 2;
      vert.y = (Math.random() - .5) * 2;
      vert.z = (Math.random() - .5) * 2;

    }

  },

  //Sets the normals of the target back to one that is
  //'Geometrically Accurate'
  returnToRegularNormal:function( which ){

    this.target.computeVertexNormals();
    this.setVertexVertexNormals( this.target );

  },

  setOGNormals:function(){
    this.OG.computeVertexNormals();
    this.setVertexVertexNormals( this.OG );
  },
  
  //Sets our target to OG,
  // so it will start moving back towards it.
  returnToOG: function(){

    //sets the target to OG 
    this.target = this.OG.clone();

    //Sets vertex normals of all the targets
    for( var i = 0; i < this.OG.vertices.length; i++){

      this.target.vertices[i].normal = this.OG.vertices[i].normal.clone();

    }

  }


}

