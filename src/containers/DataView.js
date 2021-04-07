import { isEmptyObject } from 'jquery'
import React, {
    Fragment,
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
import { createControls } from '../system/controls'

//example used: https://blog.bitsrc.io/starting-with-react-16-and-three-js-in-5-minutes-3079b8829817
const DataView = (props) => {
    let mount = useRef(null)
    //three.js variables
    let camera = useRef(null)
    let renderer = useRef(null)
    let controls = useRef(null)
    const { contributions, totalContributions, dateSpan } = props

    //useEffect to set up the renderer and camera once only -> no duplication
    useEffect(() => {
        console.log('set up scene etc')
        camera.current = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        renderer.current = new WebGLRenderer()
        //renderer.current.autoClear = true;

        //give canvas id so responsive width and height can be set in css
        renderer.current.domElement.id = 'canvas-holder'
        //create canvas element and attach renderer to it
        mount.appendChild(renderer.current.domElement)

        //camera pos
        camera.current.position.z = 35
        camera.current.position.y = 30
        camera.current.rotateX(-1)

        //attach mouse controls to middle of the scene to allow zoom and rotate
        controls.current = createControls(camera.current, renderer.current.domElement)
    }, [])

    //useEffect to create 3d objects for each day of a week when data is not null
    useEffect(() => {
        console.log('contributions:', contributions)
        if(contributions !== null && contributions !== undefined) {
            setScene(contributions)
        }
        // eslint-disable-next-line
    }, [contributions])

    const resizeRendererToDisplaySize = (targetCanvas) => {
        const width = targetCanvas.clientWidth
        const height = targetCanvas.clientHeight
        //check if current canvas width and height are same as required parent aspect, if not resize to stop distortion
        const needResize = targetCanvas.width !== width || targetCanvas.height !== height

        if(needResize) {
            renderer.current.setSize(width, height, false)
        }

        //return result so camera aspect can be reset alongside canvas for correct view ratios
        return needResize
    }

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
            const canvas = renderer.current.domElement

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
    
            //update canvas aspect to stop strectching when screen size changes, if the canvas aspect needs changing too
            if(resizeRendererToDisplaySize(canvas)) {
                camera.current.aspect = canvas.clientWidth / canvas.clientHeight
                camera.current.updateProjectionMatrix()
            }

            renderer.current.render( scene, camera.current )
        }

        animate()
    }

    //TODO: format text into correct date format and label

    //ref set to allow to mount 3D scene in a component and not to root
    return (
        <Fragment>
            <div className='details-text d-flex flex-column position-absolute w-100'>
                { (totalContributions !== null && totalContributions !== undefined) &&(
                    <Fragment>
                        { totalContributions } contributions
                        <span>( { dateSpan } )</span>
                    </Fragment>)
                }
            </div>
            <div ref={ ref => (mount = ref) }></div>
        </Fragment>
    )
}

//for now just return first week of contributions, so not to break processing
function mapStateToProps({ gitData }) {
    if(!isEmptyObject(gitData)) {
        const startDate = new Date(gitData.weeks[0].contributionDays[0].date).toLocaleDateString('en-GB')
        const endDate = new Date(gitData.weeks[gitData.weeks.length - 1].contributionDays[gitData.weeks[gitData.weeks.length - 1].contributionDays.length - 1].date).toLocaleDateString('en-GB')
        console.log('dates: ', endDate)

        return {
            contributions: gitData.weeks,
            totalContributions: gitData.totalContributions,
            dateSpan: `${startDate} - ${endDate}`
        }
    } else {
        return gitData
    }
}

export default connect(mapStateToProps)(DataView)