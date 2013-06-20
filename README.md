NOTHING IS NORMAL



Roadmap:

Dynamic geometry: It is this geometry that we are going to use to do weird things with the normals, of both the face and the vertices. As well this is the geometry that will be pulsing to different music.

DG_visualizing functions: Visualizing functions that are primarily created for altering the dynamic geometry itself

shape clusters: This will be an array of a specific dynamic geometry. There will be tools to move these clusters into vcertain formations, as well as remove and add object to them

SC_visualizing functions: These functions are created to add visuals to the arrangment of the shape clusters, it will rotate and scale the clusters, but not change the actual geometry itself

event array: This is where the 'choreography happens', each index of the array will have the following form:

[ 
  time the event happens,
  speed at which the event happens,
  what object / geometry the event happens to,
  what the event is
]


