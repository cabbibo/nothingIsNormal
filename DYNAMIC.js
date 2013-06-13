
  function DYNAMIC(geometry,material){

    //This is the geometry we will use to display the object
    //AKA altering this will fundamentally change the look of 
    //object
    this.geometry = geometry.clone;

    //This is the geometery that we will base the main geometry
    //It is useful, because we need something to compare to
    //if we are altering the main geometry by music. 
    //Essentially it gives us a base that is unchanging,
    //that we can toy with, without affecting
    this.data = geometry.clone();

    //This is the geometry we will use when we are trying to 
    //smoothly move from one type of mesh to another. Essentially
    //it will be altered as a target, that will get tweened to,
    //but is never actually seen in the scene
    this.target = geometry.clone();

    //This is a copy of the Geometry we will keep forever,
    //so that if we want to return to the unaffected geometry,
    //We easily can
    this.OG = geometry.clone();

    //Give all the vertices 'normals' 
    //So that we can easily alter these normals, 
    //and apply them to the 'vertice normals of each face
    for( var i = 0; i < geo.vertices.length; i ++){
      
      var r1 = (Math.random() - .5) * 2;
      var r2 = (Math.random() - .5) * 2;
      var r3 = (Math.random() - .5) * 2;
      this.geometry.vertices[i].normal = new THREE.Vector3(r1,r2,r3);
      this.data.vertices[i].normal = new THREE.Vector3(r1,r2,r3);
      this.target.vertices[i].normal = new THREE.Vector3(r1,r2,r3);
      this.OG.vertices[i].normal = new THREE.Vector3(r1,r2,r3);
     
    }


    this.material = material
    this.mesh = new THREE.Mesh(this.geometry,this.material);

    //This is the speed we will move at between the
    //data and the target when the target changes
    this.movementSpeed = .1;

    //This is the function that will be used on each vertex,
    //Every frame.
    this.vertVisuals = function(i){

      this.mesh.geometry.vertices[i].copy(this.data.vertices[i]);

    }


    //This is the function that will be used on each face,
    //Every frame
    this.faceVisuals = function(i){

      var face = this.data.faces[i];

      //console.log('aas');
      var mainFace = this.geometry.faces[i];
      for(var j = 0; j < face.vertexNormals.length; j ++){
        var vert = face.vertexNormals[j];

        var rand1 = ( Math.random() - .5 ) * 2;
        var rand2 = ( Math.random() - .5 ) * 2;
        var rand3 = ( Math.random() - .5 ) * 2;
        vert.set(rand1,rand2,rand3);

        mainVert = mainFace.vertexNormals[j];
        mainVert.x += Math.sin(vert.x);

        
      }


    }

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
        if(data.x != target.x){
          data.x += (target.x - data.x) * this.movementSpeed;
        }

        if(data.y != target.y){
          data.y += (target.y - data.y) * this.movementSpeed;
        }

        if(data.z != target.z){
          data.z += (target.z - data.z) * this.movementSpeed;
        }

        if( this.vertVisuals ){
          this.vertVisuals(i);
        }

      }

      if(this.faceVisuals){
        for(var i = 0; i < this.data.faces.length; i++){

        //  this.faceVisuals(i);
        }
      }


      this.geometry.verticesNeedUpdate = true; 
      this.geometry.normalsNeedUpdate = true; 
  
    },

    //Sets the vertex normals, as defined in the faces,
    //from the vertex normals we added to each vertex
    setVertexNormals: function(){

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



    //Sets our target to OG,
    // so it will start moving back towards it.
    returnToOG: function(){
  
      this.target = this.OG.clone();

    }


  }

