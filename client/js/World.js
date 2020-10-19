var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let setup = () => {
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0;

    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;

    createFloor();
}

let cameraController = () => {
    let rotationSpeed = 0.05;
    let walkSpeed = 0.1;

    if (isKeyDown("w")) {
        camera.position.addScaledVector(camera.getWorldDirection(), walkSpeed);
    }

    if (isKeyDown("s")) {
        camera.position.addScaledVector(camera.getWorldDirection(), -walkSpeed);
    }

    if (isKeyDown("a")) {
        camera.rotation.y += rotationSpeed;
    }

    if (isKeyDown("d")) {
        camera.rotation.y -= rotationSpeed;
    }
}

let isKeyDown = (() => {
    let state = {};
    window.addEventListener('keyup', (e) => state[e.key] = false);
    window.addEventListener('keydown', (e) => state[e.key] = true);
    return (key) => state.hasOwnProperty(key) && state[key] || false;
})();

var animate = function () {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    cameraController();
};

let createFloor = () => {
    for (let i = 0; i < 50; i++) {
        for (let k = 0; k < 50; k++) {
            var geometry = new THREE.BoxGeometry();
            let coblestoneTex = new THREE.TextureLoader().load( './client/textures/coblestone.jpeg' );
            var coblestoneMat = new THREE.MeshBasicMaterial( { map: coblestoneTex } );
            var cube = new THREE.Mesh(geometry, coblestoneMat);

            cube.position.x += i;
            cube.position.y = -1;
            cube.position.z += k;

            scene.add(cube);
        }
    }
}
setup();
animate();

