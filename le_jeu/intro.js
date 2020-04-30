class intro extends Phaser.Scene {
  constructor() {
    super({key: 'intro' });
  }


preload () {

	this.load.image('intro_fond','assets/décors/logo.png');

}

create () {


this.add.image(640,360,'intro_fond').setScale(1.2);
cursors = this.input.keyboard.createCursorKeys();

}

update () {


	if (Phaser.Input.Keyboard.JustDown(cursors.space)){
		this.scene.start("LeHUB");

	} 
		

}

}