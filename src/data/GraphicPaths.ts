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
    shadow:
        serverPath.toString() + "img/Shadow/bg.png",
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
    skillSelect:
    {
        background:
            serverPath.toString() + "img/SkillSelect/bg.png",
        overlay:
            serverPath.toString() + "img/SkillSelect/overlay.png",
        bar:
            serverPath.toString() + "img/SkillSelect/bar.png",
        button:
            serverPath.toString() + "img/SkillSelect/button.png"
    },
    mapSelect:
    {
        background:
            serverPath.toString() + "img/MapSelect/background.png"
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
            serverPath.toString() + "img/Skills/7.png",
        fire:
            serverPath.toString() + "img/Skills/8.png",
        sunBurn:
            serverPath.toString() + "img/Skills/9.png",
        ice:
            serverPath.toString() + "img/Skills/10.png",
        poison:
            serverPath.toString() + "img/Skills/11.png"
    }
};