import React, { useEffect, useRef } from 'react'
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

//example: https://blog.bitsrc.io/starting-with-react-16-and-three-js-in-5-minutes-3079b8829817

const DataView = () => {
    let mount = useRef(null)
    const scene = new Scene()
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new WebGLRenderer()
    const geometry = new BoxGeometry()
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new Mesh(geometry, material)

    useEffect(() => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        mount.appendChild(renderer.domElement)

        scene.add(cube)

        camera.position.z = 5

        const animate = () => {
            requestAnimationFrame( animate )
    
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
    
            renderer.render( scene, camera )
        }

        animate()
    })

    return (
        <div ref={ ref => (mount = ref) }></div>
    )
}

export default DataView