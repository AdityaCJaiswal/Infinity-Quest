import { mapTileDimension } from "./config.js";
const ElementsMap = new Map()

// JSON Data Import
async function fetchData() {
    const res = await fetch('../Data/FinalMap.json');
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json(); // Await the parsed JSON
    return data.layers; // Return the `layers` array directly
}

function makeMatrixMap(layer) {
    const ElementsMap = new Map()
    layer.forEach((layer1) => {
        let matrix = []
        if (layer1.type === "group") {
            layer1.layers.forEach((layer2) => {
                if (layer2.type === "group") {
                    layer2.layers.forEach((layer3) => {
                        for (let i = 0; i < layer3.data.length; i += layer3.width) {
                            matrix.push(layer3.data.slice(i, i + layer3.width))
                        }
                        ElementsMap.set(`${layer3.name}`, matrix);
                        matrix = []
                    })
                } else {
                    for (let i = 0; i < layer2.data.length; i += layer2.width) {
                        matrix.push(layer2.data.slice(i, i + layer2.width))
                    }
                    ElementsMap.set(`${layer2.name}`, matrix)
                    matrix = []
                }
            })
        } else {
            for (let i = 0; i < layer1.data.length; i += layer1.width) {
                matrix.push(layer1.data.slice(i, i + layer1.width))
            }
            ElementsMap.set(`${layer1.name}`, matrix)
            matrix = []
        }
    })

    return ElementsMap;
}

// fetchData().then(async (layers) => {
//     await makeMatrixMap(layers);
// })

async function initializeMap() {
    try {
        const layers = await fetchData();
        const ElementsMap = makeMatrixMap(layers);
        return ElementsMap;
    } catch (error) {
        console.error("Error initializing the map:", error);
    }
}

// Initialize and export the map data
const AllMatrix = initializeMap();
console.log("AllMatrix:", AllMatrix);
console.log("AllMatrix size:", AllMatrix.size);


export { AllMatrix };