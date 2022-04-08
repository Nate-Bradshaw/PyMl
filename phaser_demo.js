var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
}

function create ()
{
    let xPlacement = 400;
    //let yPlacement = 300;
    let i = 0

    while(i < 10){
        this.add.image(xPlacement, 300, `sky`)
        xPlacement = xPlacement + 400;
        //print("x placement is at", xPlacement);
        i++; 
    }

    /*
    for(let i = 0; i > 10; i++){
        this.add.image(xPlacement, 300, `sky`)
        xPlacement = xPlacement + 400;
        print("x placement is at", xPlacement);
    } //i think i just cant write these to save my life today
    */

    //this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 10000,
        scale: { start: 10, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}