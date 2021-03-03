import React, {
    useEffect,
    useRef
} from 'react'
import { connect } from 'react-redux'
import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three'

//example used: https://blog.bitsrc.io/starting-with-react-16-and-three-js-in-5-minutes-3079b8829817
//TODO: remove scene etc on unMount
//TODO: or / and stop new scene being rendered on new search results

const DataView = (props) => {
    let mount = useRef(null)
    const { contributions } = props

    //TODO: change width / height of camera perspective
    //three.js variables
    const scene = new Scene()
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new WebGLRenderer()

    //useEffect to setup and render 3d scene when component mounted
    useEffect(() => {
        console.log('contributions:', contributions)
        if(contributions !== null) {
            setScene(contributions)
        }
    })

    const setScene = (contribs) => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        mount.appendChild(renderer.domElement)

        for(const [i, day] of contribs.entries()) {
            console.log('add cube')
            const geometry = new BoxGeometry(1, (1 + day.contributionCount/2), 1)
            const material = new MeshBasicMaterial({ color: day.color })
            const cube = new Mesh(geometry, material)
            cube.position.x += (i*2) - contribs.length
            cube.position.y = 1 + (day.contributionCount/2)/2
            scene.add(cube)
        }

        camera.position.z = 10
        camera.position.y = 5
        renderer.render( scene, camera )

        /*const animate = () => {
            requestAnimationFrame( animate )
    
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
    
            renderer.render( scene, camera )
        }

        animate()*/
    }

    return (
        <div ref={ ref => (mount = ref) }></div>
    )
}

//for now just return first week of contributions, so not to break processing
function mapStateToProps({ gitData }) {
    return {
        contributions: gitData !== null ? gitData.weeks[0].contributionDays : null
    }
}

export default connect(mapStateToProps)(DataView)