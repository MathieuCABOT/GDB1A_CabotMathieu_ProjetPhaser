class niveau1 extends Phaser.Scene {
  constructor() {
    //super("niveau1");
    super({key: 'niveau1' });
  }
    

//===================================================================================================================
//chargement des assets utilisé dans la scene
preload () {
    //____________________________________________________________________________________________
    this.load.image('grass','assets/décors/grass.png');
    //____________________________________________________________________________________________
    this.load.spritesheet('dude', 'assets/items&assets/joueur_player.png', { frameWidth: 60, frameHeight: 68 });
    //____________________________________________________________________________________________
    this.load.image('door1', 'assets/door/door1.png');
    this.load.image('door2', 'assets/door/door2.png');
    this.load.image('door3', 'assets/door/door3.png');
    //____________________________________________________________________________________________
    this.load.image('bullet', 'assets/items&assets/bullet.png');
    this.load.image('cible', 'assets/ennemis/cible.png');
    //____________________________________________________________________________________________
    this.load.image('potion','assets/items&assets/potion.png');
    //____________________________________________________________________________________________
    this.load.image('3vie', 'assets/overlay/coeur.png');
    this.load.image('2vie', 'assets/overlay/coeur.png');
    this.load.image('1vie', 'assets/overlay/coeur.png');
    //____________________________________________________________________________________________
    this.load.image('mur_up', 'assets/décors/murs/murs_haut.png');
    this.load.image('mur_down', 'assets/décors/murs/murs_bas.png');
    this.load.image('mur_left', 'assets/décors/murs/murs_gauche.png');
    this.load.image('mur_right', 'assets/décors/murs/murs_droite.png');
    this.load.image('coin_down_right', 'assets/décors/coins_de_murs/coin_bas_droite.png');
    this.load.image('coin_down_left', 'assets/décors/coins_de_murs/coin_bas_gauche.png');
    this.load.image('coin_up_right', 'assets/décors/coins_de_murs/coin_haut_droite.png');
    this.load.image('coin_up_left', 'assets/décors/coins_de_murs/coin_haut_gauche.png');
    //____________________________________________________________________________________________
    this.load.image('arbre', 'assets/décors/arbre.png');
    this.load.image('road', 'assets/décors/chemin/road.png');
    this.load.image('pop-up','assets/messages/pop-up.png');
    //____________________________________________________________________________________________
    this.load.image('key','assets/items&assets/clé.png');
    this.load.image('keyOverlay1','assets/items&assets/clé.png');
    this.load.image('keyOverlay2','assets/items&assets/clé.png');
    //____________________________________________________________________________________________
}


//===================================================================================================================
//le design de niveau et incorporation du joueur

create () {

   //____________________________________________________________________________________________
    //le background   

    this.add.image(1000,500,'grass');
    //this.add.image(1000,500,'road');

    //____________________________________________________________________________________________
    //création de platformes  avec leurs emplacements

    platforms = this.physics.add.staticGroup();

    	platforms.create(1000, 30, 'mur_up');
    	platforms.create(1000, 76, 'mur_up');
    	platforms.create(1000, 122, 'mur_up');
    	platforms.create(1000, 168, 'mur_up');
    	platforms.create(1000, 214, 'mur_up');
    	platforms.create(1000, 260, 'mur_up');

    	platforms.create(1000, 970, 'mur_down');
    	platforms.create(1000, 924, 'mur_down');
    	platforms.create(1000, 878, 'mur_down');
    	platforms.create(1000, 832, 'mur_down');
    	platforms.create(1000, 786, 'mur_down');
    	platforms.create(1000, 740, 'mur_down');

    	platforms.create(30, 500, 'mur_left');
    	platforms.create(1970, 500, 'mur_right');

    	platforms.create(39, 40, 'coin_up_left');
    	platforms.create(1961, 38, 'coin_up_right');

    	platforms.create(40, 961, 'coin_down_left');
    	platforms.create(1961, 960, 'coin_down_right');


    //------------------------------------------------------------------
    //le spawn de la potion

    potion = this.physics.add.staticGroup();

        potion.create(1000, 600, 'potion');
//____________________________________________________________________________________
//les key
key = this.physics.add.staticGroup();

        key.create(120, 400, 'key');


    //____________________________________________________________________________________________
    // les portes

    door1 = this.add.sprite(1950, 500,'door2'); 

  //____________________________________________________________________________________________
    // les carractèristique du player
    player = this.physics.add.sprite(1900, 500, 'dude');
    player.setCollideWorldBounds(true);
    player.direction = 'right';
    this.physics.add.collider(player, platforms);



    //____________________________________________________________________________________________
    //les balles  
    groupeBullets = this.physics.add.group();


//--------------------------------------------------------------------------------------------------------------------------------------------------------
// aniamtion du player

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 5 }),
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 1 } ],
        frameRate: 12,
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 6, end: 8 }),
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });


//____________________________________________________________________________________________
        //mise en place de ces colisions pour les potions

        this.physics.add.collider(potion,platforms);
        this.physics.add.overlap(player,potion,collectpotion,null,this);

    //____________________________________________________________________________________________
    //dit au code que l'on regarde le clavier

    cursors = this.input.keyboard.createCursorKeys();
    boutonFeu = this.input.keyboard.addKey('A');

    //=============================================================
    //scroling

    this.physics.world.setBounds(0, 0, 2000, 1000);
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, 2000, 1000);

    //=============================================================

//____________________________________________________________________________________________
    //barre de vie

    this.vie3 = this.add.image(100,15,'3vie').setScrollFactor(0);
    this.vie2 = this.add.image(60,15,'2vie').setScrollFactor(0);
    this.vie1 = this.add.image(20,15,'1vie').setScrollFactor(0);


        cibles = this.physics.add.group();

        cibles.create(1600,400,'cible').setScale(1).setBounce(1).setVelocityY(-300);
        cibles.create(1500,350,'cible').setScale(1).setBounce(1).setVelocityY(-300);
        cibles.create(1400,450,'cible').setScale(1).setBounce(1).setVelocityY(-300);
        cibles.create(1200,600,'cible').setScale(1).setBounce(1).setVelocityY(-400);

        cibles.create(600,350,'cible').setScale(1).setBounce(1).setVelocityY(-300);
        cibles.create(650,350,'cible').setScale(1).setBounce(1).setVelocityY(-300);
        cibles.create(900,500,'cible').setScale(1).setBounce(1).setVelocityY(-300);
        cibles.create(850,500,'cible').setScale(1).setBounce(1).setVelocityY(-300);

        cibles.create(350,350,'cible').setScale(1).setBounce(1).setVelocityY(-300);
        cibles.create(350,400,'cible').setScale(1).setBounce(1).setVelocityY(-300);
        cibles.create(350,600,'cible').setScale(1).setBounce(1).setVelocityY(-300);
        cibles.create(350,650,'cible').setScale(1).setBounce(1).setVelocityY(-300);


        //colison des cibles
        this.physics.add.collider(cibles,platforms);
        this.physics.add.collider(player,cibles, hitBomb, null, this);

        cibles.children.iterate(function (cible) {
            cible.pointsVie=Phaser.Math.Between(1, 5);

        });

        this.physics.add.overlap(groupeBullets, cibles, hit, null,this);

    this.popup = this.add.image(650,550,'pop-up').setScale(0.5).setScrollFactor(0);
    this.popup.setVisible(false);

    //____________________________________________________________________________________________
    //overlay clées

    this.keyOverlay1 = this.add.image(20,50,'keyOverlay1').setScrollFactor(0);
    this.keyOverlay2 = this.add.image(50,50,'keyOverlay2').setScrollFactor(0);


    this.physics.add.collider(collectkey1,platforms);
    this.physics.add.collider(collectkey2,platforms);

    this.physics.add.overlap(player,key,collectkey1,null,this);
    this.physics.add.overlap(player,key,collectkey2,null,this);

    this.keyOverlay1.setVisible(false);
    this.keyOverlay2.setVisible(false);

	//____________________________________________________________________________________________
    //overlay clées

        cibles = this.physics.add.group();

        //colison des cibles
        this.physics.add.collider(cibles,platforms);
        this.physics.add.collider(player,cibles, hitBomb, null, this);

        cibles.children.iterate(function (cible) {
        cible.pointsVie=Phaser.Math.Between(1, 5);

        });

        this.physics.add.overlap(groupeBullets, cibles, hit, null,this);

    this.popup = this.add.image(650,550,'pop-up').setScale(0.5).setScrollFactor(0);
    this.popup.setVisible(false);

}

//========================================================================================================================================================
//evenement en cours de jeu
update () {

        //____________________________________________________________________________________________
        //les inputes qui avec le déplacement et l'annimation

        if (cursors.left.isDown)  {

            player.direction = 'left';
            player.setVelocityX(-400);
            player.anims.play('left', true);
        }

        else if (cursors.right.isDown) {

            player.direction = 'right';
            player.setVelocityX(400);
            player.anims.play('right', true);
        }

        if (cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && cursors.down.isUp)  {

            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (cursors.up.isDown) {

            player.direction = 'up';
            player.setVelocityY(-400);
            player.anims.play('up', true);
        }

        else if (cursors.down.isDown) {

            player.direction = 'down';
            player.setVelocityY(400);
            player.anims.play('down', true); 
        }

        else  {

            player.setVelocityY(0);
        }

        //____________________________________________________________________________________________
        //les tires

        if ( Phaser.Input.Keyboard.JustDown(boutonFeu)) {

                var coefDir;

            if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }

                // on crée la balle a coté du joueur
                var bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'bullet');

                // parametres physiques de la balle.
                bullet.setCollideWorldBounds(false);

                //bullet.body.allowGravity =false;
                bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y

        }
        
        //____________________________________________________________________________________________
        // le passage des portes

        if (Phaser.Input.Keyboard.JustDown(cursors.space) && checkOverlap(player, door1)) {
              this.scene.start("LeHUB");

          }
        //____________________________________________________________________________________________
        //PVs

            if(health == 2) {

                this.vie3.setVisible(false);
            }

            if(health == 1) {

                this.vie2.setVisible(false);
            }

            if(health == 0) {

            this.vie1.setVisible(false);  
            player.setTint(0xff0000);
            player.anims.play('turn');
            this.physics.pause();

            }
 		//____________________________________________________________________________________________
       	//les clées


            if(compteurKey == 1) {

                this.keyOverlay1.setVisible(true);
            }

            if(compteurKey == 0) {

                this.keyOverlay2.setVisible(true);
            }
    }


}

