import * as THREE from 'three'
import Stat from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const w = window.innerWidth
const h = window.innerHeight
const stat = new Stat()
const gui = new dat.GUI()

//Scene
const scene = new THREE.Scene()

//Camera 
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10)
camera.lookAt(0, 0, 0)
camera.position.set(2, 2, 3)

//辅助坐标系
//scene.add(new THREE.AxesHelper(2, 2, 2))

//Text
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('./static/textures/matcaps/8.png')

//Font
const fontLoader = new FontLoader()

fontLoader.load(
    './static/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        // Material
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

        // Text
        const textGeometry = new TextGeometry(
            'I am a student ',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

         //Donuts
       const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64)

     



        for(let i = 0; i < 99; i++)
        {
            const donut = new THREE.Mesh(donutGeometry, material)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }
    }
)






//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(w, h)
document.body.append(renderer.domElement)
document.body.append(stat.dom)

const orbitControls = new OrbitControls(camera, renderer.domElement)


const clock = new THREE.Clock()
tick()
function tick() {
    const time = clock.getElapsedTime()


    requestAnimationFrame(tick)
    renderer.render(scene, camera)
    stat.update()
    orbitControls.update()
}







