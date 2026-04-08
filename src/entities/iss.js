import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { latLon2Vec3 } from '../utils/coords.js';

export function createISS() {
    const ISSGroup = new THREE.Group();
    const modelLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    let issMesh = null;
    dracoLoader.setDecoderPath('/draco/');
    modelLoader.setDRACOLoader(dracoLoader);

    modelLoader.load('/models/International Space Station (ISS) (B).glb', (gltf) => {
        issMesh = gltf.scene;
        issMesh.scale.set(0.05, 0.05, 0.05);
        ISSGroup.add(issMesh);
    }, 
    undefined, 
    (error) => console.error('Error loading ISS model:', error));

    const updatePosition = (lat, lon, earth) => {
        const globalPos = latLon2Vec3(lat, lon, 10);

        issMesh.position.copy(globalPos);
        
        issMesh.lookAt(0, 0, 0); 
    };


    return {mesh: ISSGroup, updatePosition};
}