import * as THREE from 'three'
import { toRadians } from './angle.js'

export function latLon2Vec3(lat, lon, rad) {
    const phi = toRadians(90 - lat);
    const theta = toRadians(lon + 180);

    const x = -(rad * Math.sin(phi) * Math.cos(theta));
    const z = (rad * Math.sin(phi) * Math.sin(theta));
    const y = (rad * Math.cos(phi));

    return new THREE.Vector3(x, y, z);
}
