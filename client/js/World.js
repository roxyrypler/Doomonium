var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

let setup = () => {
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0;

    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;

    cube.position.x = 0;
    cube.position.y = 0;
    cube.position.z = -10;
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
setup();
animate();

