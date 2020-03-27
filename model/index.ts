import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";

import { Button, AdvancedDynamicTexture } from "@babylonjs/gui"

import { CannonJSPlugin, PhysicsImpostor } from "@babylonjs/core"


import "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Materials"
import "@babylonjs/gui"

window.onload = function () {
  const canvas = <HTMLCanvasElement>document.getElementById("canvas");
  const engine = new Engine(canvas);


  var scene = new Scene(engine);
  scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin());

  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  camera.setTarget(Vector3.Zero());

  camera.attachControl(canvas, true);

  var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);

  light.intensity = 0.7;

  var sphere = Mesh.CreateSphere("sphere1", 160, 2, scene);
  sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);

  sphere.position.y = 1.2;

  var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);
  ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.PlaneImpostor, { mass: 0 }, scene)


  engine.runRenderLoop(() => {
    scene.render();
  });
}