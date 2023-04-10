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
            serverPath.toString() + "img/MainCharacter/player_walk.png",
        hpAboveHead:
            serverPath.toString() + "img/HealthBar/hpAboveHeadPlayer.png"

    },
    mapFolder:
        serverPath.toString() + "img/Map/",
    loadingScreen:
        serverPath.toString() + "img/MainScreen/Background/1.png",
    enemies:
        serverPath.toString() + "img/Enemies/",
    death:
        serverPath.toString() + "img/Enemies/death.png",
    hpAboveHeadEnemy:
        serverPath.toString() + "img/HealthBar/hpAboveHeadEnemy.png",
    statistics:
    {
        overlay:
            serverPath.toString() + "img/HealthBar/statisticsOverlay.png",
        corner:
            serverPath.toString() + "img/HealthBar/corner.png",
        hp:
            serverPath.toString() + "img/HealthBar/statisticsHealth.png",
        exp:
            serverPath.toString() + "img/HealthBar/statisticsExp.png",
        button:
            serverPath.toString() + "img/HealthBar/button_increase.png"
    },
    skills:
    {
        magicOrb:
            serverPath.toString() + "img/Skills/1.png",
        swordVortex:
            serverPath.toString() + "img/Skills/2.png",
        arrow:
            serverPath.toString() + "img/Skills/5.png",
        bird:
            serverPath.toString() + "img/Skills/6.png",
        dragon:
            serverPath.toString() + "img/Skills/7.png"
    }
};