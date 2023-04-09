import "./GraphicPaths";
import { graphicPath } from "./GraphicPaths";
export const enemiesData = [
    {
        id: 1, level: 1, hp: 1, damage: 1, exp: 1, scale: 1, speed: 3, space: 30,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "1_attack.png",
                framesHorizontal: 13, framesVertical: 4, graphicWidth: 832, graphicHeight: 256, speed: 60,
                up:{frameStart: 0, frameEnd: 12},
                left:{frameStart: 13, frameEnd: 25},
                right:{frameStart: 26, frameEnd: 38},
                down:{frameStart: 39, frameEnd: 51}
            },  
            walk:
            {
                path: graphicPath.enemies + "1_walk.png",
                framesHorizontal: 10, framesVertical: 4, graphicWidth: 640, graphicHeight: 256, speed: 60,
                up:{frameStart: 0, frameEnd: 9},
                left:{frameStart: 10, frameEnd: 19},
                right:{frameStart: 20, frameEnd: 29},
                down:{frameStart: 30, frameEnd: 39}
            }  
        },
    },
    {
        id: 2, level: 1, hp: 2, damage: 1, exp: 2, scale: 1, speed: 3, space: 30,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "2_attack.png",
                framesHorizontal: 4, framesVertical: 4, graphicWidth: 256, graphicHeight: 256, speed: 60,
                up:{frameStart: 0, frameEnd: 3},
                left:{frameStart: 4, frameEnd: 7},
                right:{frameStart: 8, frameEnd: 11},
                down:{frameStart: 12, frameEnd: 15}
            },  
            walk:
            {
                path: graphicPath.enemies + "2_walk.png",
                framesHorizontal: 4, framesVertical: 4, graphicWidth: 256, graphicHeight: 256, speed: 60,
                up:{frameStart: 0, frameEnd: 3},
                left:{frameStart: 4, frameEnd: 7},
                right:{frameStart: 8, frameEnd: 11},
                down:{frameStart: 12, frameEnd: 15}
            }  
        },
    },
    {
        id: 3, level: 2, hp: 2, damage: 1, exp: 2, scale: 1, speed: 3, space: 30,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "3_walk.png",
                framesHorizontal: 4, framesVertical: 1, graphicWidth: 384, graphicHeight: 96, speed: 60,
                right:{frameStart: 0, frameEnd: 3}
            },  
            walk:
            {
                path: graphicPath.enemies + "3_walk.png",
                framesHorizontal: 4, framesVertical: 1, graphicWidth: 384, graphicHeight: 96, speed: 60,
                right:{frameStart: 0, frameEnd: 3}
            }  
        },
    },
    {
        id: 4, level: 2, hp: 2, damage: 1, exp: 2, scale: 1, speed: 3, space: 30,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "4_attack.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 880, graphicHeight: 110, speed: 60,
                right:{frameStart: 0, frameEnd: 7}
            },  
            walk:
            {
                path: graphicPath.enemies + "4_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 880, graphicHeight: 110, speed: 60,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 5, level: 3, hp: 1, damage: 1, exp: 1, scale: 2, speed: 3, space: 30,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "5_all.png",
                framesHorizontal: 6, framesVertical: 5, graphicWidth: 384, graphicHeight: 320, speed: 90,
                right:{frameStart: 18, frameEnd: 23}
            },  
            walk:
            {
                path: graphicPath.enemies + "5_all.png",
                framesHorizontal: 6, framesVertical: 5, graphicWidth: 384, graphicHeight: 320, speed: 90,
                right:{frameStart: 6, frameEnd: 11}
            }  
        },
    },
    {
        id: 6, level: 3, hp: 1, damage: 1, exp: 1, scale: 2, speed: 3, space: 30,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "6_all.png",
                framesHorizontal: 8, framesVertical: 9, graphicWidth: 256, graphicHeight: 288, speed: 80,
                right:{frameStart: 64, frameEnd: 71}
            },  
            walk:
            {
                path: graphicPath.enemies + "6_all.png",
                framesHorizontal: 8, framesVertical: 9, graphicWidth: 256, graphicHeight: 288, speed: 80,
                right:{frameStart: 25, frameEnd: 32}
            }  
        },
    },
    {
        id: 7, level: 1, hp: 1, damage: 1, exp: 1, scale: 1, speed: 3, space: 60,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "7_attack.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1848, graphicHeight: 190, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            },  
            walk:
            {
                path: graphicPath.enemies + "7_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1848, graphicHeight: 190, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 8, level: 1, hp: 1, damage: 1, exp: 1, scale: 1, speed: 3, space: 20,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "8_attack.png",
                framesHorizontal: 11, framesVertical: 1, graphicWidth: 1166, graphicHeight: 22, speed: 80,
                right:{frameStart: 0, frameEnd: 10}
            },  
            walk:
            {
                path: graphicPath.enemies + "8_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 848, graphicHeight: 22, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    }
];