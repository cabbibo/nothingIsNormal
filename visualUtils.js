 function setVertArray(whichObj){

    var array = [];
    for(var i = 0; i < whichObj.vertices.length; i++){
      var vert = whichObj.vertices[i];
      var toPush = [vert.x,vert.y,vert.z];
      array.push(toPush);
    }

    console.log(array);
    return array;

  }

  function getVertArray(whichVertArray,whic){


  }

  function tweenMesh (whichMesh){


    for(var i = 0; i < whichMesh.geometry.length; i++){

      var target = whichMesh.target.vertices[i];
      whichMesh.geometry.vertices[i].lerp(target,0.5);

    }


  }


  function randomFaceNormals(whichMesh){

    var randomNormals = [];

    for(var i = 0; i < whichMesh.geometry.faces.length; i++){
      
      var rand1 = ( Math.random() - .5 ) * 2;
      var rand2 = ( Math.random() - .5 ) * 2;
      var rand3 = ( Math.random() - .5 ) * 2;
      var norm = new THREE.Vector3(rand1,rand2,rand3);

      randomNormals.push(norm);
    }

    return randomNormals;
  }
  
  function randomVertexNormals(whichMesh){

    var randomNormals = [];

    for(var i = 0; i < whichMesh.geometry.faces.length; i++){

      var face = whichMesh.geometry.faces[i];

      var faceNormals = [];
      for(var j = 0; j < face.vertexNormals.length; j ++){
        
        var rand1 = ( Math.random() - .5 ) * 2;
        var rand2 = ( Math.random() - .5 ) * 2;
        var rand3 = ( Math.random() - .5 ) * 2;
        face.vertexNormals[j].set(rand1,rand2,rand3);


      }

    }

    whichMesh.geometry.normalsNeedUpdate = true;

    return randomNormals;
  }



  //Gets a random set of face normals for a given mesh
  function changeFaceNormals(whichMesh){

    for(var i = 0; i < whichMesh.geometry.faces.length; i++){
      var norm = whichMesh.geometry.faces[i].normal;
      norm.set(Math.random(),Math.random(),Math.random());
    }

    whichMesh.geometry.normalsNeedUpdate = true;
    
  }


  //gets a random set for a geometery, and sets the target to it,
  //so that the data will tween there
  function randomGeometry(whichObj){

    for(var i = 0; i < whichObj.target.vertices.length; i++){

      var vert = whichObj.target.vertices[i];
      vert.x = (Math.random() - .5) * SCENESIZE;
      vert.y = (Math.random() - .5) * SCENESIZE;
      vert.z = (Math.random() - .5) * SCENESIZE;

    }

    whichObj.target.verticesNeedUpdate = true;
  }


