import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas)
    controls.enableKeys = false
    //restricts zoom limits
    controls.minDistance = 10
    controls.maxDistance = 100

    return controls
}

export { createControls }