import { GameMap, Player, Trees, Sheeps, WEffect, Collision, MapChangerObserver, ForestObserver, LayerObserver0, LayerObserver1, LayerObserver2, LayerObserver3, LayerCollision1, LayerCollision2 } from './objects.js';
// import { GameMap, Player, Trees, Sheeps, WEffect, Collision } from './objects.js';
import { SpaceMaze, SpaceCollision, ShootingStar, Planets } from './spaceObjects.js'
// import { SpaceMaze, Earth, Moon, GasGaint } from './SpaceObjects.js'
import { NPCS } from './npcs.js';
import { c, canvas } from '../index.js'
const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
};


function rectangularCollision(rect1, rect2) {

    c.fillStyle = 'rgba(255, 0, 0, 1)'


    return (
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width &&
        rect1.position.y + rect1.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height &&
        areaOverlap(rect1, rect2) > 25
    );

    c.fillStyle = 'rgba(255, 0, 0, 1)'
    c.fillRect(
        rect1.position.x,
        rect1.position.y,
        rect1.width,
        rect1.height
    )
    c.fillStyle = 'rgba(0, 0, 255, 1)'
    c.fillRect(
        rect1.position.x,
        rect1.position.y,
        rect1.width,
        rect1.height
    )
}

function areaOverlap(rect1, rect2) {
    // Find overlap in the x-direction
    let xOverlap = Math.max(0,
        Math.min(rect1.position.x + rect1.width, rect2.position.x + rect2.width) -
        Math.max(rect1.position.x, rect2.position.x)
    );

    // Find overlap in the y-direction
    let yOverlap = Math.max(0,
        Math.min(rect1.position.y + rect1.height, rect2.position.y + rect2.height) -
        Math.max(rect1.position.y, rect2.position.y)
    );

    // Compute overlapping area
    return xOverlap * yOverlap;
}


function interaction(rect1, rect2, offset1 = { x: 0, y: 0 }, offset2 = { x: 0, y: 0 }) {
    // console.log("rect1 w " + rect1.width)
    // console.log("rect1 h " + rect1.height)
    // console.log("rect2 w " + rect2.width);
    // console.log("rect2 h " + rect2.height);
    c.fillStyle = 'yellow'
    c.fillRect(rect1.position.x, rect1.position.y, rect1.width, rect1.height)
    c.fillRect(rect2.position.x, rect2.position.y, rect2.width * 2 + offset1.x, rect2.height * 2 + offset1.y)
    console.log(rect1.position.x + " " + rect1.position.y + " " + rect2.position.x + " " + rect2.position.y);
    // if () {

    // }
    return (
        rect1.position.x + rect1.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.width * 2 &&
        rect1.position.y + rect1.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.height * 2
    );
}



async function init() {

    // Resolve Trees before using it
    const treeData = await Trees;
    const sheepData = await Sheeps;
    const wEffect = await WEffect;
    const collision = await Collision;
    const mapChanger = await MapChangerObserver;
    const forestObserver = await ForestObserver
    const spaceCollision = await SpaceCollision
    const shootingStar = await ShootingStar

    const layerObserver0 = await LayerObserver0
    const layerObserver1 = await LayerObserver1
    const layerObserver2 = await LayerObserver2
    const layerObserver3 = await LayerObserver3

    const layerCollision1 = await LayerCollision1
    const layerCollision2 = await LayerCollision2



    // console.log("collision" + collision);
    // console.log("mapChanger" + mapChanger);
    // console.log("forestObserver" + forestObserver);
    // console.log("wEffect" + wEffect);

    console.log("layerObserver0 initialized:", layerObserver0);
    console.log("layerObserver1 initialized:", layerObserver1);
    console.log("layerObserver2 initialized:", layerObserver2);
    console.log("layerObserver3 initialized:", layerObserver3);

    console.log("layerCollision1 initialized:", layerCollision1);
    console.log("layerCollision2 initialized:", layerCollision2);

    // console.log(collision);

    const fadeSpeed = 0.02; // Adjust for slower or faster fading

    const Boundary = []
    const NpcInteraction = []
    /// console.log(treeData); // Check if Trees resolved correctly
    // console.log(sheepData); // Check if Trees resolved correctly

    const movables = [GameMap, ...treeData, ...sheepData, ...wEffect, ...collision, ...NPCS, ...mapChanger, ...forestObserver, ...layerCollision1, ...layerCollision2, ...layerObserver0, ...layerObserver1, ...layerObserver2, ...layerObserver3];
    // const movables = [GameMap, ...treeData, ...sheepData, ...wEffect, ...collision, ...NPCS];
    let allLayerCollisions = [...collision]
    // let Collision
    // const MazeMovables = [SpaceMaze, Earth, Moon, GasGaint]
    function animate() {
        const frame = window.requestAnimationFrame(animate);
        GameMap.draw();
        console.log(GameMap.position);


        // // Draw all trees
        treeData.forEach(tree => {
            tree.draw();
        });

        sheepData.forEach(sheep => {
            sheep.draw();
        })

        wEffect.forEach(directions => {
            // console.log(directions.position);

            directions.draw()
        })

        allLayerCollisions.forEach((collision) => {
            collision.draw()
        })

        mapChanger.forEach((changer) => {
            changer.draw()
        })

        forestObserver.forEach((observer) => {
            observer.draw()
        })





        Player.draw()
        // c.fillRect(Player.position.x, Player.position.y, Player.width, Player.height)

        NPCS.forEach(npc => {
            npc.draw()
            // c.fillRect(npc.position.x, npc.position.y, npc.width, npc.height)
        })

        for (let i = 0; i < NPCS.length; i++) {
            console.log(`log: ${i} :` + NPCS[i]);

            if (rectangularCollision(NPCS[i], Player)) {
                if (areaOverlap(NPCS[i], Player) > 5000) {

                    // console.log(areaOverlap(NPCS[0], Player))
                    // console.log('overlap');
                    if (!NPCS[i].isTalking) {
                        NPCS[i].isTalking = true
                        NPCS[i].isDoneTalking = NPCS[i].talk()
                    }

                } else {
                    NPCS[i].stopTalking()
                    NPCS[i].isTalking = false
                }
            }
        }



        if (rectangularCollision(mapChanger[0], Player)) {
            if (areaOverlap(mapChanger[0], Player) > 5000) {

                console.log(areaOverlap(mapChanger[0], Player))
                console.log('overlap');
                mapChanger[0].changeMap(frame, spaceMaze)
            }
        }




        for (let i = 0; i < layerObserver1.length; i++) {
            if (rectangularCollision(layerObserver1[i], Player)) {
                allLayerCollisions = [...collision, ...layerCollision1];
                break;
            }
        }
        for (let i = 0; i < layerObserver2.length; i++) {
            if (rectangularCollision(layerObserver2[i], Player)) {
                allLayerCollisions = [...collision, ...layerCollision2];
                break;
            }
        }








        let flag = 1

        for (let i = 0; i < forestObserver.length; i++) {
            const obs = forestObserver[i];
            if (rectangularCollision(Player, obs)) {
                if (areaOverlap(obs, Player) > 50) {
                    console.log('collision');
                    treeData.forEach(tree => {
                        if (tree.opacity > 0.1) {
                            tree.opacity -= fadeSpeed;
                            if (tree.opacity < 0.1) tree.opacity = 0.1; // Clamp to 0.1
                        }
                    });
                    flag = 0;
                }
                break;
            } else {
                flag = 1;
            }
        }



        if (flag) {
            treeData.forEach(tree => {
                if (tree.opacity < 1) {
                    tree.opacity += fadeSpeed;
                    if (tree.opacity > 1) tree.opacity = 1; // Clamp to 1
                }
            });
        }

        // console.log(gsap);


        let move = true
        if (keys.w.pressed) {

            // for (let i = 0; i < allLayerCollisions.length; i++) {
            //     const boundary = allLayerCollisions[i];
            //     if (rectangularCollision(
            //         Player,
            //         {
            //             ...boundary,
            //             position: {
            //                 x: boundary.position.x,
            //                 y: boundary.position.y + 6
            //             }
            //         }
            //     )) {
            //         console.log('collision');
            //         move = false
            //         break
            //     }
            // }
            if (move) {
                movables.forEach(movable => {
                    movable.position.y += 20;
                });
            }
        }

        if (keys.s.pressed) {
            // for (let i = 0; i < allLayerCollisions.length; i++) {
            //     const boundary = allLayerCollisions[i];
            //     if (rectangularCollision(
            //         Player,
            //         {
            //             ...boundary,
            //             position: {
            //                 x: boundary.position.x,
            //                 y: boundary.position.y - 6
            //             }
            //         }
            //     )) {
            //         console.log('collision');
            //         move = false
            //         break
            //     }
            // }
            if (move) {
                movables.forEach(movable => {
                    movable.position.y -= 20;
                });
            }
        }
        if (keys.d.pressed) {

            // for (let i = 0; i < allLayerCollisions.length; i++) {
            //     const boundary = allLayerCollisions[i];
            //     if (rectangularCollision(
            //         Player,
            //         {
            //             ...boundary,
            //             position: {
            //                 x: boundary.position.x - 6,
            //                 y: boundary.position.y
            //             }
            //         }
            //     )) {
            //         console.log('collision');
            //         move = false
            //         break
            //     }
            // }
            if (move) {
                movables.forEach(movable => {
                    movable.position.x -= 20;
                });
            }
        }
        if (keys.a.pressed) {

            // for (let i = 0; i < allLayerCollisions.length; i++) {
            //     const boundary = allLayerCollisions[i];
            //     if (rectangularCollision(
            //         Player,
            //         {
            //             ...boundary,
            //             position: {
            //                 x: boundary.position.x + 6,
            //                 y: boundary.position.y
            //             }
            //         }
            //     )) {
            //         console.log('collision');
            //         move = false
            //         break
            //     }
            // }
            if (move) {
                movables.forEach(movable => {
                    movable.position.x += 20;
                });
            }
        }
    }

    GameMap.image.onload = (() => {
        animate();
    })



    const MazeMovables = [SpaceMaze, ...spaceCollision, ...shootingStar, ...Planets]
    function spaceMaze() {
        window.requestAnimationFrame(spaceMaze)
        // // console.log("in maze 1y");
        c.fillStyle = "black"
        c.fillRect(0, 0, SpaceMaze.width, SpaceMaze.height)
        c.fillStyle = "Red"
        c.fillRect(0, 0, 20, 20)
        // SpaceMaze.draw()
        // console.log(spaceCollision);



        shootingStar.forEach((star) => {
            star.draw()
        })

        Planets.forEach((planet) => {
            planet.draw()
        })


        Player.draw()

        let move = true
        if (keys.w.pressed) {

            // for (let i = 0; i < spaceCollision.length; i++) {
            //     const boundary = spaceCollision[i];
            //     if (rectangularCollision(
            //         Player,
            //         {
            //             ...boundary,
            //             position: {
            //                 x: boundary.position.x,
            //                 y: boundary.position.y + 6
            //             }
            //         }
            //     )) {
            //         console.log('collision');
            //         move = false
            //         break
            //     }
            // }
            if (move) {
                MazeMovables.forEach(movable => {
                    movable.position.y += 6;
                });
            }
        }

        if (keys.s.pressed) {
            // for (let i = 0; i < spaceCollision.length; i++) {
            //     const boundary = spaceCollision[i];
            //     if (rectangularCollision(
            //         Player,
            //         {
            //             ...boundary,
            //             position: {
            //                 x: boundary.position.x,
            //                 y: boundary.position.y - 6
            //             }
            //         }
            //     )) {
            //         console.log('collision');
            //         move = false
            //         break
            //     }
            // }
            if (move) {
                MazeMovables.forEach(movable => {
                    movable.position.y -= 6;
                });
            }
        }

        if (keys.d.pressed) {

            // for (let i = 0; i < spaceCollision.length; i++) {
            //     const boundary = spaceCollision[i];
            //     if (rectangularCollision(
            //         Player,
            //         {
            //             ...boundary,
            //             position: {
            //                 x: boundary.position.x - 6,
            //                 y: boundary.position.y
            //             }
            //         }
            //     )) {
            //         console.log('collision');
            //         move = false
            //         break
            //     }
            // }
            if (move) {
                MazeMovables.forEach(movable => {
                    movable.position.x -= 6;
                });
            }
        }

        if (keys.a.pressed) {

            // for (let i = 0; i < spaceCollision.length; i++) {
            //     const boundary = spaceCollision[i];
            //     if (rectangularCollision(
            //         Player,
            //         {
            //             ...boundary,
            //             position: {
            //                 x: boundary.position.x + 6,
            //                 y: boundary.position.y
            //             }
            //         }
            //     )) {
            //         console.log('collision');
            //         move = false
            //         break
            //     }
            // }
            if (move) {
                MazeMovables.forEach(movable => {
                    movable.position.x += 6;
                });
            }
        }
    }
    // spaceMaze()

    function Maze2() {
        window.requestAnimationFrame(Maze2)


        c.createRadialGradient(canvas.width, canvas.height,)
        c.draw()
        console.log("in maze 2");
    }
    function Maze3() {
        window.requestAnimationFrame(Maze3)
        console.log("in maze 3");
    }
}

init();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            keys.w.pressed = true
            // playerImage.src = './assets/playerUp.png';
            break;
        case 'a':
        case 'ArrowLeft':
            keys.a.pressed = true
            // playerImage.src = './assets/playerLeft.png';
            break;
        case 's':
        case 'ArrowDown':
            keys.s.pressed = true
            // playerImage.src = './assets/playerDown.png';
            break;
        case 'd':
        case 'ArrowRight':
            keys.d.pressed = true
            // playerImage.src = './assets/playerRight.png';
            break;
        default:
            break;
    }

    // console.log('lastkey : ' + lastKey);

})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
        case 'ArrowUp':
            keys.w.pressed = false
            break;
        case 'a':
        case 'ArrowLeft':
            keys.a.pressed = false
            break;
        case 's':
        case 'ArrowDown':
            keys.s.pressed = false
            break;
        case 'd':
        case 'ArrowRight':
            keys.d.pressed = false
            break;
        default:
            break;
    }
})