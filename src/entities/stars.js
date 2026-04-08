import * as THREE from 'three'

export function createStars() {
    const starsGroup = new THREE.Group();
    for(let i = 0; i < 1000; i ++) {
        const starGeometry = new THREE.BoxGeometry(2, 2, 2);
        const starMaterial = new THREE.MeshBasicMaterial(0xFFFFFF);
        const starMesh = new THREE.Mesh(starGeometry, starMaterial);
        
        let position = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        position.setX(position.x / position.length());
        position.setY(position.y / position.length());
        position.setZ(position.z / position.length());
        position.multiplyScalar(500);
        starMesh.position.set(position.x, position.y, position.z);
        starsGroup.add(starMesh);
    }

    return {mesh: starsGroup};
}