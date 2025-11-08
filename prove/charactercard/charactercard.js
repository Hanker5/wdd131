const attackedButton = document.querySelector("#attackedButton");
const lvlUpButton = document.querySelector("#lvlUpButton");
const healthLabel = document.querySelector("#healthLabel");
const lvlLabel = document.querySelector("#lvlLabel");

const character = {
    health: 100,
    lvl: 5,
    attacked: function(){
        this.health -= 5;
        if (this.health == 0){
            alert("Character Died");
        }
    },
    levelUp: function(){
        this.lvl += 1;
    }
}

attackedButton.addEventListener("click", function(){
    character.attacked();
    healthLabel.innerHTML = `
        <strong>Health:</strong> ${character.health}
    `
});

lvlUpButton.addEventListener("click", function(){
    character.levelUp();
    lvlLabel.innerHTML = `
        <strong>Level:</strong> ${character.lvl}
    `
});