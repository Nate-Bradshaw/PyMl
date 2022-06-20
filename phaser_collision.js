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
var blockA; //moving block
var blockB; //center block with no collision
var colToggle = true;

var cat1;
var cat2;
var cat3;

function preload ()
{
    this.load.image('block', 'scotts box as requested.jpg');
}

function create ()
{
    blockA = this.matter.add.image(200, 300, 'block').setBounce(1.5).setFriction(0);
    blockA.setScale(0.15);
    blockA.setVelocityX(25);


    blockB = this.matter.add.image(400, 300, 'block').setStatic(true);
    blockB.setScale(0.15);

    //blockA.setOnCollideWith(blockB.body, onColl(this, "insert other collider"))


    var blockC = this.matter.add.image(750, 300, 'block').setStatic(true); //right block
    blockC.setScale(0.15);
    var blockD = this.matter.add.image(50, 300, 'block').setStatic(true); //left block
    blockD.setScale(0.15);

    cat1 = this.matter.world.nextCategory();
    cat2 = this.matter.world.nextCategory();
    cat3 = this.matter.world.nextCategory();

    //blockA.setCollisionCategory(cat1);
    blockC.setCollisionCategory(cat1);
    blockD.setCollisionCategory(cat1);

    blockB.setCollisionCategory(cat3);

    blockA.setCollidesWith([ cat1, cat2 ]);
    // blockA.setCollidesWith(cat1);

    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

        bodyA.gameObject.setTint(0xff0000);
        bodyB.gameObject.setTint(0x00ff00);
        console.log(bodyA.gameObject3);
        console.log(bodyB.body);
        //console.log("bonk");

    });
}

function update ()
{
    if (Phaser.Input.Keyboard.JustDown(spacebar))
    {
        blockA.setVelocityX(50);


        if(colToggle){
            blockB.setCollisionCategory(cat2);
            colToggle = false;
            //console.log("collides");
        }
        else if(!colToggle){
            blockB.setCollisionCategory(cat3);
            colToggle = true;
            //console.log("nah");
        }
    }
}

function onColl (body1, body2){
    console.log(body1, body2);
}