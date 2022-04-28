var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1b1464',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var spacebar;
var blockA;

function preload ()
{
    this.load.image('block', 'box.jpg');
}

function create ()
{
    blockA = this.matter.add.image(200, 300, 'block').setBounce(1.5).setFriction(0);
    blockA.setScale(0.5);
    blockA.setVelocityX(25);
    var blockB = this.matter.add.image(400, 300, 'block');

    var blockC = this.matter.add.image(750, 300, 'block').setStatic(true);
    var blockD = this.matter.add.image(50, 300, 'block').setStatic(true);

    var cat1 = this.matter.world.nextCategory();

    blockA.setCollisionCategory(cat1);
    blockC.setCollisionCategory(cat1);

    var cat2 = this.matter.world.nextCategory();

    blockD.setCollisionCategory(cat2);

    blockA.setCollidesWith([ cat1, cat2 ]);
    // blockA.setCollidesWith(cat1);

    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.matter.world.on('collisionstart', function (event) {

        event.pairs[0].bodyA.gameObject.setTint(0xff0000);
        event.pairs[0].bodyB.gameObject.setTint(0x00ff00);
        console.log("bonk");

    });
}

function update ()
{
    if (spacebar.isDown)
    {
        console.log("space bar pressed");
        blockA.setVelocityX(100);
    }
}