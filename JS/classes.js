import { c } from '../index.js';



class Boundary {
    static width = 128;
    static height = 128;
    constructor({ position }) {
        this.position = { x: position.x, y: position.y };
        this.width = 128;
        this.height = 128;
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.5)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
class MapChanger extends Boundary {
    static effect = document.querySelector(".effect")
    constructor({ position }) {
        super({ position })
    }

    changeMap(frame, newMapFunction) {
        window.cancelAnimationFrame(frame)
        gsap.to("#effect", ({
            opacity: 1,
            repeat: 3,
            yoyo: true,
            duration: 0.4,
            onComplete() {
                gsap.to("#effect", ({
                    opacity: 1,
                    repeat: 3,
                    duration: 0.2,
                    onComplete() {
                        newMapFunction()
                        gsap.to("#effect", ({
                            opacity: 0,
                            duration: 0.6,
                        }))
                    }
                }))
            }
        }))
    }
}

class DrawAndAnimate {
    constructor({ position, imageSrc, frames = { max: 1, width: 128 }, tiles = 3, moving, scale = 1, debug = false, opacity = 1, random = false, duration = 10 }) {
        this.position = position;
        this.imageSrc = imageSrc;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        // this.frames.val = parseInt(Math.random() * this.frames.max);
        this.frames.val = 0;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max * this.scale;
            this.height = this.image.height * this.scale;
        };
        this.moving = moving;
        this.frameHTiles = tiles;
        this.debug = debug
        this.opacity = opacity
        this.random = random
        this.duration = duration
    }

    draw() {

        this.image.onload
        if (this.imageSrc === '../Frames/Tree.png') { // Check if it's a tree image
            c.save(); // Save the current canvas state

            // Set opacity for tree images only
            c.globalAlpha = this.opacity;
            c.drawImage(
                this.image,
                this.frames.val * this.frameHTiles * (this.frames.width || 128),
                0,
                this.image.width / this.frames.max,
                this.image.height,
                this.position.x,
                this.position.y,
                // * multiply by scale in both the below lines to scale the image 
                this.image.width / this.frames.max * this.scale,
                this.image.height * this.scale
            );
            // c.globalAlpha = 1.0; // Reset opacity to default after drawing the tree
            c.restore(); // Restore the saved state to prevent affecting other objects

        } else {
            c.drawImage(
                this.image,
                this.frames.val * this.frameHTiles * (this.frames.width || 128),
                0,
                this.image.width / this.frames.max,
                this.image.height,
                this.position.x,
                this.position.y,
                // * multiply by scale in both the below lines to scale the image 
                this.image.width / this.frames.max * this.scale,
                this.image.height * this.scale
            );
        }

        if (this.imageSrc === "../Frames/Planets/GasGaint.png") {
            console.log("Frame : " + this.frames.val);
            console.log(this.frameHTiles);


        }




        // console.log("Frames width " + this.frames.width);


        if (this.debug && this.frameHTiles === 3) {
            c.fillStyle = 'rgba(0, 0, 0, 0.1)';
            c.fillRect(this.position.x, this.position.y, this.width / this.frameHTiles, this.height / this.frameHTiles);
            c.fillStyle = 'rgba(0, 0, 0, 0.3)';
            c.fillRect(this.position.x + 128, this.position.y, this.width / this.frameHTiles, this.height / this.frameHTiles);
            c.fillStyle = 'rgba(0, 0, 0, 0.1)';
            c.fillRect(this.position.x + 256, this.position.y, this.width / this.frameHTiles, this.height / this.frameHTiles);
            c.fillStyle = 'rgba(0, 0, 0, 0.3)';
            c.fillRect(this.position.x, this.position.y + 128, this.width / this.frameHTiles, this.height / this.frameHTiles);
            c.fillStyle = 'rgba(0, 0, 0, 0.5)';
            c.fillRect(this.position.x + 128, this.position.y + 128, this.width / this.frameHTiles, this.height / this.frameHTiles);
            c.fillStyle = 'rgba(0, 0, 0, 0.3)';
            c.fillRect(this.position.x + 256, this.position.y + 128, this.width / this.frameHTiles, this.height / this.frameHTiles);
            c.fillStyle = 'rgba(0, 0, 0, 0.1)';
            c.fillRect(this.position.x, this.position.y + 256, this.width / this.frameHTiles, this.height / this.frameHTiles);
            c.fillStyle = 'rgba(0, 0, 0, 0.3)';
            c.fillRect(this.position.x + 128, this.position.y + 256, this.width / this.frameHTiles, this.height / this.frameHTiles);
            c.fillStyle = 'rgba(0, 0, 0, 0.1)';
            c.fillRect(this.position.x + 256, this.position.y + 256, this.width / this.frameHTiles, this.height / this.frameHTiles);
        } else if (this.debug && this.frameHTiles === 2) {
            c.fillStyle = 'rgba(0, 0, 0, 0.1)';
            c.fillRect(this.position.x, this.position.y, this.width / this.frameHTiles, this.height / this.frameHTiles);
            c.fillStyle = 'rgba(0, 0, 0, 0.3)';
            c.fillRect(this.position.x + 128, this.position.y, this.width / this.frameHTiles, this.height / this.frameHTiles);
            c.fillRect(this.position.x, this.position.y + 128, this.width / this.frameHTiles, this.height / this.frameHTiles);
            c.fillStyle = 'rgba(0, 0, 0, 0.5)';
            c.fillRect(this.position.x + 128, this.position.y + 128, this.width / this.frameHTiles, this.height / this.frameHTiles);
        } else if (this.debug && this.frameHTiles === 1) {
            c.fillStyle = 'rgba(0, 0, 0, 0.1)';
            c.fillRect(this.position.x, this.position.y, this.width / this.frameHTiles, this.height / this.frameHTiles);
        }

        // console.log(this.random);

        // if (this.random) {
        //     if (Math.random() < 0.01) return
        // }

        if (this.moving) return

        if (!this.frames.val) {
            if (this.random) {
                if (Math.random() > 0.2) {
                    return
                }
            }
        }



        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % this.duration === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else {
                this.frames.val = 0
            }
        }
    }
}



// class DrawNPC extends DrawAndAnimate {
//     constructor({ position, imageSrc, frames, tiles, moving, scale, debug, message, isTalking, isDoneTalking }) {
//         super({ position, imageSrc, frames, tiles, moving, scale, debug });
//         this.message = "It's been a long that somebody visits here... I can guide you for the direction. % Another visitor? Let me help you find your way. % It's been a long that somebody visits here... I can guide you for the direction. % Another visitor? Let me help you find your way."
//         this.isTalking = isTalking
//         this.isDoneTalking = false
//         this.timeouts = []
//     }

//     talk() {
//         const footer = document.querySelector(".interaction-footer");
//         // const text = "It's been a long that somebody visits here... I can guide you for the direction. % Another visitor? Let me help you find your way. % It's been a long that somebody visits here... I can guide you for the direction. % Another visitor? Let me help you find your way.";
//         const sections = this.message.split("%");

//         let sectionIndex = 0;

//         function showSection() {
//             if (sectionIndex < sections.length) {
//                 const content = sections[sectionIndex].trim();
//                 let charIndex = 0;
//                 footer.innerHTML = "";

//                 function showLetters() {
//                     if (charIndex < content.length) {
//                         footer.innerHTML += content[charIndex];
//                         charIndex++;
//                         const val = setTimeout(showLetters, 70)
//                         this.timeouts.push(val);
//                         // setTimeout(showLetters, 70);
//                     }
//                     // else {
//                     //     setTimeout(() => {
//                     //         sectionIndex++;
//                     //         showSection();
//                     //     }, 2000);
//                     // }
//                 }

//                 showLetters();
//             }
//         }

//         showSection();
//         return true;
//     }

//     stopTalking() {
//         this.timeouts.forEach(val => clearTimeout(val))
//     }
// }

class DrawNPC extends DrawAndAnimate {
    static footer = document.querySelector(".interaction-footer")
    constructor({ position, imageSrc, frames, tiles, moving, scale, debug, message, isTalking, isDoneTalking }) {
        super({ position, imageSrc, frames, tiles, moving, scale, debug });
        this.message = "It's been a long that somebody visits here... I can guide you for the direction. % Another visitor? Let me help you find your way. % It's been a long that somebody visits here... I can guide you for the direction. % Another visitor? Let me help you find your way."
        this.isTalking = isTalking;
        this.isDoneTalking = false;
        this.timeouts = [];
    }

    talk() {
        // const footer = document.querySelector(".interaction-footer");
        const sections = this.message.split("%");
        DrawNPC.footer.style.display = "block"
        DrawNPC.footer.innerHTML = ""

        let sectionIndex = 0;

        const showSection = () => {
            if (sectionIndex < sections.length) {
                const content = sections[sectionIndex].trim();
                let charIndex = 0;
                DrawNPC.footer.innerHTML = "";

                const showLetters = () => {
                    if (charIndex < content.length) {
                        DrawNPC.footer.innerHTML += content[charIndex];
                        charIndex++;
                        const val = setTimeout(showLetters, 70);
                        this.timeouts.push(val);
                    } else {
                        // Move to the next section after 2 seconds
                        const nextSectionTimeout = setTimeout(() => {
                            sectionIndex++;
                            showSection();
                        }, 2000);
                        this.timeouts.push(nextSectionTimeout);
                    }
                };

                showLetters();
            }
        };

        showSection();
        return true;
    }

    stopTalking() {
        this.timeouts.forEach((val) => clearTimeout(val));
        this.timeouts = []; // Clear the stored timeouts
        // const footer = document.querySelector(".interaction-footer");
        DrawNPC.footer.innerHTML = ""
        DrawNPC.footer.style.display = "none"
    }
}







export { DrawAndAnimate, Boundary, DrawNPC, MapChanger }