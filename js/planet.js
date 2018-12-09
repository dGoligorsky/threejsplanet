const renderer = new THREE.WebGLRenderer({
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000, 1)

const sectionTag = document.querySelector("section")
sectionTag.appendChild(renderer.domElement)

const scene = new THREE.Scene()

// add some lighting
const ambientLight = new THREE.AmbientLight(0x777777)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 1, 0)
pointLight.position.set(500, 500, -2000)
scene.add(pointLight)

const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 5000)
camera.position.z = -3000

// make a THREE.js loader
const loader = new THREE.TextureLoader()


// make the planet
const makePlanet = function(){
    const texture = loader.load("assets/wilson-skin.png")
    const geometry = new THREE.SphereGeometry( 800, 128, 128 )
    const material = new THREE.MeshLambertMaterial({
        // color: 0x2727e6,
        map: texture
    })
    const mesh = new THREE.Mesh( geometry, material )
    scene.add( mesh )
    return mesh
}

// make a single ring
const makeRing = function(width, color) {
    const geometry = new THREE.TorusGeometry(width, 5, 16, 100)
    const material = new THREE.MeshBasicMaterial({
        color: color
    })
    const mesh = new THREE.Mesh(geometry, material)
    // use .geometry to rotate relative to the world, not the original geometry
    mesh.geometry.rotateX(Math.PI / 2)
    mesh.geometry.rotateZ(Math.PI / 10)
    scene.add(mesh)
    return mesh
}

const earth = makePlanet()
const ring1 = makeRing(1100, 0xff4141)
const ring2 = makeRing(1200, 0xffffff)
const ring3 = makeRing(1300, 0xffdb00)

const animate = function() {
    camera.lookAt(scene.position)

    earth.rotateY(0.01)

    ring1.geometry.rotateY(0.004)
    ring2.geometry.rotateY(-0.002)
    ring3.geometry.rotateY(-0.003)

    renderer.render(scene, camera)

    requestAnimationFrame(animate)
}

animate()


window.addEventListener("resize", function() {
    camera.aspect = window.innerWidth / this.window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
})

// document.addEventListener("scroll", function() {
//     const scrollPosition = window.pageYOffset

//     earth.rotation.set(0, scrollPosition * 0.01, 0)
// })