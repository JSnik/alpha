import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;

  ngOnInit() {
    // this.scene = new THREE.Scene();
    // // Create the camera
    // this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.camera.position.z = 5;
    //
    // // Create the renderer
    // this.renderer = new THREE.WebGLRenderer();
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(this.renderer.domElement);
  }

  ngAfterViewInit() {
    // const loader = new GLTFLoader();
    // loader.load('../assets/EPISODE-FBX.gltf', (gltf: any) => {
    //   // Add the model to the scene
    //   this.scene.add(gltf.scene);
    // }, undefined, (error: any) => {
    //   console.error(error);
    // });
    //
    // // Add an ambient light to the scene
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // this.scene.add(ambientLight);
    //
    // // Add a point light to the scene
    // const pointLight = new THREE.PointLight(0xffffff, 0.5);
    // pointLight.position.set(0, 10, 10);
    // this.scene.add(pointLight);
    //
    // // Adjust the camera position and lookAt target
    // this.camera.position.set(0, 0, 0);
    // this.camera.lookAt(new THREE.Vector3(4, 5, 10));
    //
    // setTimeout(() => {
    //   this.animate();
    // }, )
  }

  // animate() {
  //   requestAnimationFrame(() => this.animate());
  //
  //   // Update the scene
  //   this.scene.rotation.y += 0.01;
  //
  //   // Render the scene
  //   this.renderer.render(this.scene, this.camera);
  // }

  constructor() {

  }

}
