 //window.onload = function() {

//------------------------------------------------------------------
// taille de fenetre de jeu

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: "#f5f5f5",
  parent: "game-container",
  pixelArt: true,

  scene: [intro, LeHUB, niveau1, niveau2, niveau3],

  physics: {
    default: "arcade",

    arcade: {
      gravity: { y: 0 },
      debug: false
    
    }
  }
};

var game = new Phaser.Game(config);


//------------------------------------------------------------------
//déclaration des variables


    var health = 3;
    var maxHealth = 3;

    var player;
    var platforms;
    var cursors;

    var door1;
    var door2;
    var door3;

    var groupeBullets;
    var boutonFeu;
    var cibles;

    var potion;

    var groupeBullets;
    var boutonFeu;
    var cibles;

    var bullet1;
    var bullet2;

    var speed1;
    var speed2;

    var score = 0;

    var compteurKey = 2;
    var key;
   

    var time1;
    var rand;

    var clees;



// autre moyens de dire que l'on commence par la Scenes1
//this.scene.start("niveau1")

//------------------------------------------------------------------
//overlap portes

function checkOverlap(spriteA, spriteB) {
   var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    var result = Phaser.Geom.Rectangle.Intersection(boundsA, boundsB);
    return (result.width !=0 || result.height!=0 )
}

function hit (bullet, cibles) {

        cibles.pointsVie--;

    if (cibles.pointsVie==0) {

            cibles.destroy(); 
    } 

            bullet.destroy();
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------
//quand on prend une potion
function collectpotion(player, potion){

    if (health < maxHealth) {

            potion.disableBody(true,true);

            
            health++;

            if (health == 2) {

                this.vie2.setVisible(true);
            }

            if (health == maxHealth) {

                this.vie3.setVisible(true);
            }
        }
    }

//--------------------------------------------------------------------------------------------------------------------------------------------------------
//quand on prend une clées gauche


function collectkey1(player, key){

            key.disableBody(true,true);
            compteurKey--;

            }

function collectkey2(player, key){

            key.disableBody(true,true);
            compteurKey--;

            }

    
//------------------------------------------------------------------
//quand on touche la cible
function hitBomb(player, cible){

	cible.destroy();
	health--;

	
}

