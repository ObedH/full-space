import * as THREE from 'three'

export class AsteroidManager {
    constructor(scene) {
        this.scene = scene;
        this.count = 200;
        this.mesh = null;
        this.dummy = new THREE.Object3D();
        this.asteroidData = [];
        this._initMesh();
    }
    _initMesh() {
        const asteroidGeometry = new THREE.IcosahedronGeometry();
        const asteroidMaterial = new THREE.MeshStandardMaterial({
            color: 0x888888,
            flatShading: true
        });
        this.mesh = new THREE.InstancedMesh(asteroidGeometry, asteroidMaterial, this.count);
        this.scene.add(this.mesh);
    }
    setAsteroids(data) {
        this.asteroidData = data;
        data.near_earth_objects[0].forEach(
            (asteroid, i) => {
                if(i >= this.count) {
                    return;
                }
                console.log("Hey bro");
                const distance = 10 + (Math.random() * 15); 
                const phi = Math.random() * Math.PI;
                const theta = Math.random() * Math.PI * 2;

                this.dummy.position.setFromSphericalCoords(distance, phi, theta);
                
                // Scale based on actual asteroid diameter
                const size = Math.max(0.1, asteroid.size / 500); 
                this.dummy.scale.set(size, size, size);
                
                this.dummy.rotation.set(Math.random(), Math.random(), Math.random());
                
                this.dummy.updateMatrix();
                this.mesh.setMatrixAt(i, this.dummy.matrix);
            }
        );
        this.mesh.instanceMatrix.needsUpdate = true;
    }
}