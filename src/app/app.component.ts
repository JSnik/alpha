import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
// @ts-ignore
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import GameScene from ""

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;

  private keyboardControls = {
    left: false,
    right: false,
    up: false,
    down: false,
    s: false,
    w: false
  };
  private mouse = new THREE.Vector2();
  private prevMouse = new THREE.Vector2();
  private isMouseDown = false;
  @ViewChild('rendererContainer', {static: false}) rendererContainer!: ElementRef;
  ngOnInit() {
    this.scene = new THREE.Scene();
    // Create the camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Create the renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  ngAfterViewInit() {
    this.rendererContainer.nativeElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.rendererContainer.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.rendererContainer.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this));

    const loader = new GLTFLoader();
    const url = '../assets/rm/rm.gltf';
    const urltwo = '../assets/rm2/mowrili bari/gltf/Main.gltf'
    loader.load('', (gltf: any) => {
      // Add the model to the scene
      this.scene.add(gltf.scene);
    }, undefined, (error: any) => {
      console.error(error);
    });


    // Add an ambient light to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    // Add a point light to the scene
    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(0, 10, 10);
    this.scene.add(pointLight);

    // Adjust the camera position and lookAt target
    this.camera.position.set(0, -5, 0);
    this.camera.lookAt(new THREE.Vector3(4, 0, 50));

    setTimeout(() => {
      this.animate();
    }, )
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Move the camera based on keyboard input
    const moveSpeed = 2;
    if (this.keyboardControls.left) {
      this.camera.position.x += moveSpeed;
    }
    if (this.keyboardControls.right) {
      this.camera.position.x -= moveSpeed;
    }
    if (this.keyboardControls.up) {
      this.camera.position.y += moveSpeed;
    }
    if (this.keyboardControls.down) {
      this.camera.position.y -= moveSpeed;
    }
    if (this.keyboardControls.w) {
      this.camera.position.z += moveSpeed;
    }
    if (this.keyboardControls.s) {
      this.camera.position.z -= moveSpeed;
    }

    // Update the scene
    this.scene.rotation.y += 0.0000000001;

    // Render the scene
    this.renderer.render(this.scene, this.camera);
    if (this.isMouseDown) {
      const xDiff = this.mouse.x - this.prevMouse.x;
      const yDiff = this.mouse.y - this.prevMouse.y;
      this.prevMouse.x = this.mouse.x;
      this.prevMouse.y = this.mouse.y;

      this.camera.rotation.y -= xDiff * 0.01;
      this.camera.rotation.x -= yDiff * 0.01;
    }

}
  onMouseMove(event: MouseEvent) {
    const rect = this.rendererContainer.nativeElement.getBoundingClientRect();
    this.mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
    this.mouse.y = -(event.clientY - rect.top) / rect.height * 2 + 1;

    if (this.isMouseDown) {
      const xDiff = this.mouse.x - this.prevMouse.x;
      const yDiff = this.mouse.y - this.prevMouse.y;
      this.prevMouse.x = this.mouse.x;
      this.prevMouse.y = this.mouse.y;

      const moveSpeed = 0.1;
      this.camera.position.x -= xDiff * moveSpeed;
      this.camera.position.y -= yDiff * moveSpeed;
    }
  }

  onMouseDown(event: MouseEvent) {
    this.prevMouse.x = event.clientX;
    this.prevMouse.y = event.clientY;
    this.isMouseDown = true;
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(event)
    switch (event.key) {
      case 'ArrowLeft':
        this.keyboardControls.left = true;
        break;
      case 'ArrowRight':
        this.keyboardControls.right = true;
        break;
      case 'ArrowUp':
        this.keyboardControls.up = true;
        break;
      case 'ArrowDown':
        this.keyboardControls.down = true;
        break;
      case'w':
        this.keyboardControls.w = true;
        break;
      case 's':
        this.keyboardControls.s = true;
        break;
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.keyboardControls.left = false;
        break
      case 'ArrowRight':
        this.keyboardControls.right = false;
        break;
      case 'ArrowUp':
        this.keyboardControls.up = false;
        break;
      case 'ArrowDown':
        this.keyboardControls.down = false;
        break;
      case 'w':
        this.keyboardControls.w = false;
        break;
      case 's':
        this.keyboardControls.s = false;
        break;
    }
  }

  constructor() {

  }

}
