import * as THREE from 'three';

export function createEarth() {
    const earthGroup = new THREE.Group();
    const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const earthMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(import.meta.env.BASE_URL + "textures/2k_earth_nightmap.jpg"),
        bumpMap: textureLoader.load(import.meta.env.BASE_URL + "textures/8081_earthbump2k.jpg"),
        bumpScale: 20,
        roughness: 0.8
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthGroup.add(earthMesh);

    const update = () => {
    }

    return {mesh: earthGroup, update};
}
