import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createEarth } from './entities/earth.js'
import { createISS } from './entities/iss.js'
import { createStars } from './entities/stars.js'
import { AsteroidManager } from './entities/asteroidManager.js';
import { fetchISSLocation } from './api/issApi.js';
import { fetchAsteroids } from './api/nasaApi.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight);
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 100);
controls.update();

const earth = createEarth();

const stars = createStars();
scene.add(stars.mesh);

const asteroidManager = new AsteroidManager(scene);

const ISS = createISS();
earth.mesh.add(ISS.mesh);
scene.add(earth.mesh);

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 2);
sunLight.position.set(5, 3, 5);
scene.add(sunLight);

setInterval(async () => {
    const data = await fetchISSLocation();
    if(data) {
        ISS.updatePosition(data.lat, data.lon, earth.mesh);
    }
}, 3000);

async function initAsteroids() {
    const data = await fetchAsteroids();
    if (data.element_count > 0) {
        asteroidManager.setAsteroids(data);
    }
}
initAsteroids();

function animate() {
    controls.update();

    earth.update();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);