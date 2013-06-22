var UTILS = {
  toPolar: function(x,y,z){
    
    var sqrd = (x*x)+(y*y)+(z*z);
    var radius = Math.pow(sqrd,.5);
    var theta = Math.acos(z/radius);
    var phi = Math.atan2(y,x);
    var toReturn = new THREE.Vector3(radius,theta,phi);
    
    return toReturn;
  },
	
	
  toCart: function(r,t,p){
    
    var toReturn; 
    
    if(p){ 
      var x = r *(Math.sin(t))*(Math.cos(p));
      var y = r *(Math.sin(t))*(Math.sin(p));
      var z = r * (Math.cos(t));
      var toReturn = new THREE.Vector3(x,y,z);
    }else{

      var x = r * Math.cos(t);
      var y = r * Math.sin(t);
      var z = 0;
      var toReturn = new THREE.Vector3(x,y,z);

    }


      
    return toReturn
      
  },


}
