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
        id: 2, level: 1, hp: 2, damage: 1, exp: 2, scale: 1.5, speed: 3.5, space: 30,
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
        id: 3, level: 2, hp: 5, damage: 5, exp: 2, scale: 2, speed: 2, space: 30,
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
        id: 4, level: 2, hp: 10, damage: 10, exp: 2, scale: 1, speed: 2.5, space: 30,
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
        id: 5, level: 3, hp: 15, damage: 15, exp: 3, scale: 2, speed: 3, space: 30,
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
        id: 6, level: 3, hp: 20, damage: 20, exp: 3, scale: 2, speed: 1, space: 40,
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
        id: 7, level: 4, hp: 25, damage: 25, exp: 4, scale: 1, speed: 3, space: 100,
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
        id: 8, level: 4, hp: 30, damage: 30, exp: 4, scale: 2, speed: 2, space: 40,
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
    },
    {
        id: 9, level: 5, hp: 35, damage: 35, exp: 5, scale: 2, speed: 3, space: 40,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "9_attack.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1200, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            },  
            walk:
            {
                path: graphicPath.enemies + "9_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1200, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 10, level: 5, hp: 40, damage: 40, exp: 5, scale: 2, speed: 2, space: 40,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "10_attack.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1200, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            },  
            walk:
            {
                path: graphicPath.enemies + "10_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1200, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 11, level: 6, hp: 45, damage: 45, exp: 6, scale: 2, speed: 3, space: 40,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "11_attack.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1200, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            },  
            walk:
            {
                path: graphicPath.enemies + "11_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1200, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 12, level: 6, hp: 50, damage: 50, exp: 6, scale: 2, speed: 4, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "12_attack.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1200, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            },  
            walk:
            {
                path: graphicPath.enemies + "12_walk.png",
                framesHorizontal: 4, framesVertical: 1, graphicWidth: 600, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 3}
            }  
        },
    },
    {
        id: 13, level: 7, hp: 55, damage: 55, exp: 7, scale: 2, speed: 5, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "13_attack.png",
                framesHorizontal: 4, framesVertical: 1, graphicWidth: 540, graphicHeight: 135, speed: 80,
                right:{frameStart: 0, frameEnd: 3}
            },  
            walk:
            {
                path: graphicPath.enemies + "13_walk.png",
                framesHorizontal: 6, framesVertical: 1, graphicWidth: 810, graphicHeight: 135, speed: 80,
                right:{frameStart: 0, frameEnd: 5}
            }  
        },
    },
    {
        id: 14, level: 7, hp: 60, damage: 60, exp: 7, scale: 2, speed: 2, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "14_attack.png",
                framesHorizontal: 4, framesVertical: 1, graphicWidth: 600, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 3}
            },  
            walk:
            {
                path: graphicPath.enemies + "14_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1200, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 15, level: 8, hp: 65, damage: 65, exp: 8, scale: 1, speed: 3, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "15_attack.png",
                framesHorizontal: 4, framesVertical: 1, graphicWidth: 736, graphicHeight: 137, speed: 80,
                right:{frameStart: 0, frameEnd: 3}
            },  
            walk:
            {
                path: graphicPath.enemies + "15_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1472, graphicHeight: 137, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 16, level: 8, hp: 70, damage: 70, exp: 8, scale: 1, speed: 4, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "16_attack.png",
                framesHorizontal: 6, framesVertical: 1, graphicWidth: 930, graphicHeight: 155, speed: 80,
                right:{frameStart: 0, frameEnd: 5}
            },  
            walk:
            {
                path: graphicPath.enemies + "16_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1240, graphicHeight: 155, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 17, level: 9, hp: 75, damage: 75, exp: 9, scale: 2, speed: 5, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "17_attack.png",
                framesHorizontal: 4, framesVertical: 1, graphicWidth: 800, graphicHeight: 200, speed: 80,
                right:{frameStart: 0, frameEnd: 3}
            },  
            walk:
            {
                path: graphicPath.enemies + "17_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1600, graphicHeight: 200, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 18, level: 9, hp: 80, damage: 80, exp: 9, scale: 2, speed: 6, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "18_all.png",
                framesHorizontal: 8, framesVertical: 5, graphicWidth: 384, graphicHeight: 240, speed: 80,
                left:{frameStart: 16, frameEnd: 23}
            },  
            walk:
            {
                path: graphicPath.enemies + "18_all.png",
                framesHorizontal: 8, framesVertical: 5, graphicWidth: 384, graphicHeight: 240, speed: 80,
                left:{frameStart: 8, frameEnd: 15}
            }  
        },
    },
    {
        id: 19, level: 10, hp: 85, damage: 85, exp: 10, scale: 2, speed: 4, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "19_attack.png",
                framesHorizontal: 6, framesVertical: 1, graphicWidth: 600, graphicHeight: 100, speed: 80,
                right:{frameStart: 0, frameEnd: 5}
            },  
            walk:
            {
                path: graphicPath.enemies + "19_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 800, graphicHeight: 100, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 20, level: 10, hp: 90, damage: 90, exp: 10, scale: 2, speed: 5, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "20_attack.png",
                framesHorizontal: 5, framesVertical: 1, graphicWidth: 750, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 4}
            },  
            walk:
            {
                path: graphicPath.enemies + "20_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1200, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 21, level: 11, hp: 95, damage: 95, exp: 11, scale: 2, speed: 6, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "21_attack.png",
                framesHorizontal: 6, framesVertical: 1, graphicWidth: 840, graphicHeight: 140, speed: 80,
                right:{frameStart: 0, frameEnd: 5}
            },  
            walk:
            {
                path: graphicPath.enemies + "21_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1120, graphicHeight: 140, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 22, level: 11, hp: 100, damage: 100, exp: 11, scale: 2, speed: 7, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "22_attack.png",
                framesHorizontal: 7, framesVertical: 1, graphicWidth: 1260, graphicHeight: 180, speed: 80,
                right:{frameStart: 0, frameEnd: 6}
            },  
            walk:
            {
                path: graphicPath.enemies + "22_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1440, graphicHeight: 180, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 26, level: 12, hp: 100, damage: 100, exp: 12, scale: 2, speed: 7, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "26_attack.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 2000, graphicHeight: 250, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            },  
            walk:
            {
                path: graphicPath.enemies + "26_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 2000, graphicHeight: 250, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    },
    {
        id: 27, level: 12, hp: 20, damage: 300, exp: 12, scale: 2, speed: 9, space: 80,
        graphics:
        {
            attack:
            {
                path: graphicPath.enemies + "27_attack.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1200, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd:7}
            },  
            walk:
            {
                path: graphicPath.enemies + "27_walk.png",
                framesHorizontal: 8, framesVertical: 1, graphicWidth: 1200, graphicHeight: 150, speed: 80,
                right:{frameStart: 0, frameEnd: 7}
            }  
        },
    }
];