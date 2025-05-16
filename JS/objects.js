import { DrawAndAnimate, Boundary, MapChanger } from "./classes.js"
import { AllMatrix } from "./matrixPrep.js"
import { canvas } from "../index.js"

const offset = {
    x: -900,
    y: 0
}

const GameMap = new DrawAndAnimate({
    position: {
        x: offset.x,
        y: offset.y
    },
    imageSrc: '../Maps/FinalMap.png',
    frames: {
        max: 1
    },
    tiles: 1
})

const Player = new DrawAndAnimate({
    position: {
        x: canvas.width / 2 - (48 / 2 * 1.5),
        y: canvas.height / 2 - (68 / 2 * 1.5)
    },
    imageSrc: '../Frames/Player/playerDown.png',
    frames: {
        max: 4,
        width: 48
    },
    moving: true,
    tiles: 1,
    // debug: true,
    scale: 1.5
})

async function makeTreeArray(matrices) {
    const temp = []
    const key = `AllTrees`
    const matrix = matrices.get(key)
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 420) {

                temp.push(new DrawAndAnimate({
                    position: {
                        x: j * 128 - 128 * 3 / 2 + 128 / 2 + offset.x,
                        y: i * 128 - 128 * 3 / 2 + 128 / 2 + offset.y
                    },
                    imageSrc: '../Frames/Tree.png',
                    frames: {
                        max: 4
                    },
                    moving: true,
                    // debug: true
                }))
            }
        }
    }
    // console.log("temp " + temp);

    return temp
}

async function makeSheepArray(matrices) {
    // console.log(matrices)
    const temp = []
    const matrix = matrices.get('Sheeps')
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 516) {
                // console.log("Sheep found at " + i + " " + j);

                temp.push(new DrawAndAnimate({
                    position: {
                        x: j * 128 + offset.x,
                        y: i * 128 + offset.y
                    },
                    imageSrc: '../Frames/Sheep.png',
                    frames: {
                        max: 8
                    },
                    tiles: 2,
                    moving: true,
                    // debug: true
                }))
            }
            else if (matrix[i][j] === 2147484165) {
                temp.push(new DrawAndAnimate({
                    position: {
                        x: j * 128 + offset.x,
                        y: i * 128 + offset.y
                    },
                    imageSrc: '../Frames/SheepInverted.png',
                    frames: {
                        max: 8
                    },
                    tiles: 2,
                    moving: true,
                }))
            }
        }
    }
    // console.log("temp " + temp);

    return temp
}
async function makeWEffectArray(matrices, dir) {
    const temp = []
    const matrix = matrices.get(`WaterEffect${dir}`)
    // console.log(matrices)

    const shift = {
        x: 0,
        y: 0
    }

    switch (dir) {
        case "Left":
            shift.x += 128
            break;
        case "Right":
            shift.x -= 128
            break;
        case "Top":
            shift.y += 128
            break;
        case "Bottom":
            shift.y -= 128
            break;

        default:
            break;
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 169 || matrix[i][j] === 192 || matrix[i][j] === 167 || matrix[i][j] === 144) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new DrawAndAnimate({
                    position: {
                        x: j * 128 - 128 * 3 / 2 + 128 / 2 + offset.x + shift.x,
                        y: i * 128 - 128 * 3 / 2 + 128 / 2 + offset.y + shift.y
                    },
                    imageSrc: `../Frames/WEffect${dir}.png`,
                    frames: {
                        max: 8
                    },
                    tiles: 3,
                    moving: true,
                    // debug: true
                }))
            }
        }
    }
    // console.log("temp " + temp);

    return temp
}

async function makeCollisionArray(matrices) {
    console.log(matrices);

    const temp = []
    const matrix = matrices.get(`Collisions`)
    // console.log(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 801) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new Boundary({
                    position: {
                        x: j * 128 + offset.x,
                        y: i * 128 + offset.y
                    },
                }))
            }
        }
    }
    // console.log("temp " + temp);
    return temp
}


async function makeMapChangerArray(matrices) {
    console.log(matrices);

    const temp = []
    const matrix = matrices.get(`MapChanger`)
    // console.log(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 168) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new MapChanger({
                    position: {
                        x: j * 128 + offset.x,
                        y: i * 128 + offset.y,
                    },
                }))
            }
        }
    }
    // console.log("temp " + temp);

    return temp

}

async function makeForestObserverArray(matrices) {
    console.log(matrices);

    const temp = []
    const matrix = matrices.get(`ForestObserver`)
    // console.log(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 802) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new Boundary({
                    position: {
                        x: j * 128 + offset.x,
                        y: i * 128 + offset.y
                    },
                }))
            }
        }
    }
    // console.log("temp " + temp);

    return temp

}
async function makeLayerCollision1Array(matrices) {
    console.log(matrices);

    const temp = []
    const matrix = matrices.get(`LayerCollisions1`)
    // console.log(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 801) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new Boundary({
                    position: {
                        x: j * 128 + offset.x,
                        y: i * 128 + offset.y
                    },
                }))
            }
        }
    }
    // console.log("temp " + temp);

    return temp

}
async function makeLayerCollision2Array(matrices) {
    console.log(matrices);

    const temp = []
    const matrix = matrices.get(`LayerCollisions2`)
    // console.log(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 801) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new Boundary({
                    position: {
                        x: j * 128 + offset.x,
                        y: i * 128 + offset.y
                    },
                }))
            }
        }
    }
    // console.log("temp " + temp);

    return temp

}
async function makeLayerObserver0Array(matrices) {
    console.log(matrices);

    const temp = []
    const matrix = matrices.get(`LayerObserver0`)
    // console.log(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 802) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new Boundary({
                    position: {
                        x: j * 128 + offset.x,
                        y: i * 128 + offset.y
                    },
                }))
            }
        }
    }
    // console.log("temp " + temp);

    return temp

}
async function makeLayerObserver1Array(matrices) {
    console.log(matrices);

    const temp = []
    const matrix = matrices.get(`LayerObserver1`)
    // console.log(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 802) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new Boundary({
                    position: {
                        x: j * 128 + offset.x,
                        y: i * 128 + offset.y
                    },
                }))
            }
        }
    }
    // console.log("temp " + temp);

    return temp

}
async function makeLayerObserver2Array(matrices) {
    console.log(matrices);

    const temp = []
    const matrix = matrices.get(`LayerObserver2`)
    // console.log(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 802) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new Boundary({
                    position: {
                        x: j * 128 + offset.x,
                        y: i * 128 + offset.y
                    },
                }))
            }
        }
    }
    // console.log("temp " + temp);

    return temp

}
async function makeLayerObserver3Array(matrices) {
    console.log(matrices);

    const temp = []
    const matrix = matrices.get(`LayerObserver3`)
    // console.log(matrix);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 802) {
                // console.log(`makeWEffect${dir}Array found at ` + i + " " + j);

                temp.push(new Boundary({
                    position: {
                        x: j * 128 + offset.x,
                        y: i * 128 + offset.y
                    },
                }))
            }
        }
    }
    // console.log("temp " + temp);

    return temp

}


const Trees = AllMatrix.then(async (matrices) => {
    const treeArray = await makeTreeArray(matrices);
    // console.log(treeArray);
    return treeArray;
});

const Sheeps = AllMatrix.then(async (matrices) => {
    const sheepArray = await makeSheepArray(matrices);
    // console.log("sheep " + sheepArray);
    return sheepArray;
})

const WEffect = AllMatrix.then(async (matrices) => {
    const WEffectLeftArray = await makeWEffectArray(matrices, 'Left');
    const WEffectRightArray = await makeWEffectArray(matrices, 'Right');
    const WEffectTopArray = await makeWEffectArray(matrices, 'Top');
    const WEffectBottomArray = await makeWEffectArray(matrices, 'Bottom');
    return [...WEffectLeftArray, ...WEffectRightArray, ...WEffectTopArray, ...WEffectBottomArray]
})

const Collision = AllMatrix.then(async (matrices) => {
    const CollisionArray = await makeCollisionArray(matrices)
    return CollisionArray
})

const MapChangerObserver = AllMatrix.then(async (matrices) => {
    console.log(matrices);
    const MapChangerArray = await makeMapChangerArray(matrices)
    return MapChangerArray
})

const ForestObserver = AllMatrix.then(async (matrices) => {
    const ForestObserverArray = await makeForestObserverArray(matrices)
    return ForestObserverArray
})
const LayerCollision1 = AllMatrix.then(async (matrices) => {
    const LayerCollisionArray1 = await makeLayerCollision1Array(matrices)
    return LayerCollisionArray1
})
const LayerCollision2 = AllMatrix.then(async (matrices) => {
    const LayerCollisionArray2 = await makeLayerCollision2Array(matrices)
    return LayerCollisionArray2
})
const LayerObserver0 = AllMatrix.then(async (matrices) => {
    const LayerObserverArray0 = await makeLayerObserver0Array(matrices)
    return LayerObserverArray0
})
const LayerObserver1 = AllMatrix.then(async (matrices) => {
    const LayerObserverArray1 = await makeLayerObserver1Array(matrices)
    return LayerObserverArray1
})
const LayerObserver2 = AllMatrix.then(async (matrices) => {
    const LayerObserverArray2 = await makeLayerObserver2Array(matrices)
    return LayerObserverArray2
})
const LayerObserver3 = AllMatrix.then(async (matrices) => {
    const LayerObserverArray3 = await makeLayerObserver3Array(matrices)
    return LayerObserverArray3
})

export { GameMap, Player, Trees, Sheeps, WEffect, Collision, MapChangerObserver, offset, ForestObserver, LayerObserver0, LayerObserver1, LayerObserver2, LayerObserver3, LayerCollision1, LayerCollision2 };