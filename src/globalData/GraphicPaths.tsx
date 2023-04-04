const serverPath = "http://localhost:3000/";

export const graphicPath =
{
    player:
    {
        idle:
            serverPath.toString() + "img/MainCharacter/player_idle.png",
        attack:
            serverPath.toString() + "img/MainCharacter/player_attack.png",
        walk:
            serverPath.toString() + "img/MainCharacter/player_walk.png"

    },
    mapFolder:
        serverPath.toString() + "img/Map/"
}