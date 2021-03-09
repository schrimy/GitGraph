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
    //three.js variables
    let scene = useRef(null)
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new WebGLRenderer()
    const { contributions } = props

    //TODO: in use Effect when contributions change delete / clear current refs / delete current webGL scene
    //useEffect to setup and render 3d scene when component mounted
    useEffect(() => {
        console.log('contributions:', contributions)
        if(contributions !== null) {
            scene.current = new Scene()
            setScene(contributions)
        }
    })

    const setScene = (contribs) => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        mount.appendChild(renderer.domElement)

        //day cube creation
        for(const [i, week] of contribs.entries()) {
            for(const [y, day] of week.contributionDays.entries()) {
                const geometry = new BoxGeometry(1, (1 + day.contributionCount / 2), 1)
                const material = new MeshBasicMaterial({ color: day.color })
                const cube = new Mesh(geometry, material)
                cube.position.z = y*2
                cube.position.x += (i*2) - contribs.length
                cube.position.y = 1 + (day.contributionCount / 2) / 2
                scene.current.add(cube)
            }
        }

        //camera pos
        camera.position.z = 20
        camera.position.y = 30
        camera.rotateX(-1)
        renderer.render( scene.current, camera )

        /*const animate = () => {
            requestAnimationFrame( animate )
    
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
    
            renderer.render( scene, camera )
        }

        animate()*/
    }

    //ref set to allow to mount 3D scene in a component and not to root
    return (
        <div ref={ ref => (mount = ref) }></div>
    )
}

//for now just return first week of contributions, so not to break processing
function mapStateToProps({ gitData }) {
    return {
        contributions: gitData !== null ? gitData.weeks : null
    }
}

export default connect(mapStateToProps)(DataView)