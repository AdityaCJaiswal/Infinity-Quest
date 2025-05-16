
import { canvas } from "../index.js"
import { AllMatrix } from "./matrixPrep.js";
import { DrawAndAnimate, Boundary } from "./classes.js";

const offset1 = {
    x: 950,
    y: -2100
}

const SpaceMaze = new DrawAndAnimate({
    position: {
        x: offset1.x,
        y: offset1.y
    },
    imageSrc: '../Maps/Maze.png',
    frames: {
        max: 1
    }
})

const Planet1 = new DrawAndAnimate({
    position: {
        x: 2 * 128,
        y: 2 * 128
    },
    imageSrc: '../Frames/Planets/Earth.png',
    frames: {
        max: 50,
        width: 300
    },
    tiles: 1
    // scale:
})

const Planet2 = new DrawAndAnimate({
    position: {
        x: 2 * 128,
        y: 34 * 128
    },
    imageSrc: '../Frames/Planets/Hot Planet.png',
    frames: {
        max: 50,
        width: 300
    },
    tiles: 1
    // scale:
})
const Planet3 = new DrawAndAnimate({
    position: {
        x: 12 * 128,
        y: 37 * 128
    },
    imageSrc: '../Frames/Planets/IcePlanet.png',
    frames: {
        max: 50,
        width: 300
    },
    tiles: 1
    // scale:
})
const Planet4 = new DrawAndAnimate({
    position: {
        x: 13 * 128,
        y: 23 * 128
    },
    imageSrc: '../Frames/Planets/LavaWorld.png',
    frames: {
        max: 50,
        width: 300
    },
    tiles: 1
    // scale:
})
const Planet5 = new DrawAndAnimate({
    position: {
        x: 24 * 128,
        y: 35 * 128
    },
    imageSrc: '../Frames/Planets/TerrainWet.png',
    frames: {
        max: 50,
        width: 300
    },
    tiles: 1
    // scale:
})
const Planet6 = new DrawAndAnimate({
    position: {
        x: 30 * 128,
        y: 22 * 128
    },
    imageSrc: '../Frames/Planets/Earth.png',
    frames: {
        max: 50,
        width: 300
    },
    tiles: 1
    // scale:
})
const Planet7 = new DrawAndAnimate({
    position: {
        x: 21 * 128,
        y: 10 * 128
    },
    imageSrc: '../Frames/Planets/IcePlanet.png',
    frames: {
        max: 50,
        width: 300
    },
    tiles: 1
    // scale:
})

const Moon1 = new DrawAndAnimate({
    position: {
        x: 7 * 128,
        y: 10 * 128
    },
    imageSrc: '../Frames/Planets/Moon.png',
    frames: {
        max: 50,
        width: 200
    },
    tiles: 1,
    scale: 0.5
})
const Moon2 = new DrawAndAnimate({
    position: {
        x: 29 * 128,
        y: 5 * 128
    },
    imageSrc: '../Frames/Planets/Moon.png',
    frames: {
        max: 50,
        width: 200
    },
    tiles: 1,
    scale: 0.5
})

const GasGaint = new DrawAndAnimate({
    position: {
        x: 0 * 128,
        y: 21 * 128
    },
    imageSrc: '../Frames/Planets/GasGaint.png',
    frames: {
        max: 40,
        width: 400
    },
    tiles: 1,
    scale: 1
})



async function makeSpaceCollisionArray(matrices) {
    console.log(matrices);

    const temp = []
    const matrix = matrices.get(`SpaceCollision`)
    // console.log(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 137) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new Boundary({
                    position: {
                        x: j * 128 + offset1.x,
                        y: i * 128 + offset1.y
                    },
                }))
            }
        }
    }
    // console.log("temp " + temp);
    return temp
}

async function makeShootingStarArray(matrices) {
    console.log(matrices);

    const temp = []
    const matrix = matrices.get(`SpaceCollision`)
    // console.log(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 137) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new DrawAndAnimate({
                    position: {
                        x: j * 128 + offset1.x,
                        y: i * 128 + offset1.y
                    },
                    imageSrc: '../Frames/ShootingStar.png',
                    frames: {
                        max: 10
                    },
                    // random: true,
                    duration: 50,
                    scale: 1
                }))
            }
        }
    }
    // console.log("temp " + temp);
    return temp
}


const SpaceCollision = AllMatrix.then(async (matrices) => {
    const SpaceCollisionArray = await makeSpaceCollisionArray(matrices)
    return SpaceCollisionArray
})
const ShootingStar = AllMatrix.then(async (matrices) => {
    const ShootingStarArray = await makeShootingStarArray(matrices)
    return ShootingStarArray
})

const Planets = [Planet1, Planet2, Planet3, Planet4, Planet5, Planet6, Planet7, Moon1, Moon2, GasGaint]


export { SpaceMaze, SpaceCollision, ShootingStar, Planets }
// export { SpaceMaze, Earth, Moon, GasGaint }