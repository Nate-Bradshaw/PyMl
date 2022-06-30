var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0.8
            },
            enableSleep: true,
            debug: true
        }
    },
    scene: {
        //preload: preload,
        create: create
    }
};

var Engine = this.matter.engine,
    //Render = Matter.Render,
    World = this.matter.World,
    Bodies = this.matter.bodies;

var engine;

function create ()
{
    this.matter.world.setBounds(0, 0, 800, 600, 32, true, true, false, true);
    engine = Engine.create;
}