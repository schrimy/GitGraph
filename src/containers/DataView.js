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
const DataView = (props) => {
    let mount = useRef(null)
    //three.js variables
    let camera = useRef(null)
    let renderer = useRef(null)
    const { contributions } = props

    //useEffect to set up the renderer and camera once only -> no duplication
    useEffect(() => {
        console.log('set up scene etc')
        camera.current = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        renderer.current = new WebGLRenderer()
        //renderer.current.autoClear = true;

        renderer.current.setSize(window.innerWidth, window.innerHeight)
        //create canvas element and attach renderer to it
        mount.appendChild(renderer.current.domElement)

        //camera pos
        camera.current.position.z = 20
        camera.current.position.y = 30
        camera.current.rotateX(-1)
    }, [])

    //useEffect to create 3d objects for each day of a week when data is not null
    useEffect(() => {
        console.log('contributions:', contributions)
        if(contributions !== null) {
            setScene(contributions)
        }
    }, [contributions])

    const setScene = (contribs) => {
        console.log('set scene')
        const scene = new Scene()
        renderer.current.clear()

        //day cube creation
        for(const [i, week] of contribs.entries()) {
            for(const [y, day] of week.contributionDays.entries()) {
                const geometry = new BoxGeometry(1, 1, 1)
                const material = new MeshBasicMaterial({ color: day.color })
                const cube = new Mesh(geometry, material)
                cube.position.z = y*2
                cube.position.x += (i*2) - contribs.length
                cube.position.y = 1
                //store end height in name param
                cube.name = (1 + day.contributionCount / 2)
                scene.add(cube)
            }
        }

        renderer.current.render( scene, camera.current )

        const animate = () => {

            const changeScale = 45

            //method to call the checks again
            requestAnimationFrame( animate )
    
            //run through every object in scene, make sure it's a mesh and then see if it's at stored height in name
            //if not then add a fraction of the height on and check again
            scene.traverse((obj) => {
                if(obj.isMesh && obj.scale.y < obj.name) {
                    obj.scale.setY(obj.scale.y += (obj.name/changeScale))
                    obj.position.y += (obj.name/changeScale) /2
                }
            })
    
            renderer.current.render( scene, camera.current )
        }

        animate()
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