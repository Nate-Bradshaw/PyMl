class Example extends Phaser.Scene
{
    create ()
    {
        this.matter.world.setBounds();
        //  First, we'll create a few static bodies
        const body1 = this.matter.add.rectangle(250, 50, 200, 32, { isStatic: true });
    
        this.matter.add.polygon(600, 100, 3, 40, { isStatic: true });
        this.matter.add.polygon(100, 500, 8, 50, { isStatic: true });
        this.matter.add.rectangle(750, 200, 16, 180, { isStatic: true });

        //  Now a body that shows off internal edges + convex hulls
        //  Now a body that shows off internal edges + convex hulls this didnt work, dont need it anyway :)
        //const star = '50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38';

        //this.matter.add.fromVertices(700, 500, star.split(' ').map(d => parseInt(d)), { restitution: 0.5 }, true);
    
        //  Some different joint types
        const body2 = this.matter.add.circle(150, 250, 16);
        const body3 = this.matter.add.circle(400, 450, 16);
        const body4 = this.matter.add.circle(500, 50, 16);

        //  A spring, because length > 0 and stiffness < 0.9
        this.matter.add.spring(body1, body2, 140, 0.001);

        this.matter.add.spring(body2, body3, 140, 0.001);

        //  A joint, because length > 0 and stiffness > 0.1
        this.matter.add.worldConstraint(body3, 140, 1, { pointA: { x: 400, y: 250 }});


        //  A pin, because length = 0 and stiffness > 0.1
        this.matter.add.worldConstraint(body4, 0, 1, { pointA: { x: 500, y: 50 }});

        /*
        let collTest = this.matter.add.polygon(200, 200, 5, 40, { restitution: 0.5 });
        let cat1 = this.matter.world.nextCategory();
    
        collTest.setCollisionCategory(cat1)
        let cat2 = this.matter.world.nextCategory();
    
        collTest.setCollidesWith([ cat1, cat2 ]); //if no work move to bottom?
        // blockA.setCollidesWith(cat1);
        */


        let tempBody2 = this.matter.add.polygon(200, 200, 5, 40, { restitution: 0.5 });
        let tempBody1 = this.matter.add.polygon(200, 200, 5, 40, { restitution: 0.5 });

        //tempBody1.setCollisionCategory(cat2)
        //tempBody2.setCollisionCategory(cat2)
        //  Finally some random dynamic bodies
        for (let i = 0; i < 12; i++)
        {
            let x = Phaser.Math.Between(100, 700);
            let y = Phaser.Math.Between(100, 500);
    
            if (Math.random() < 0.5)
            {
                let sides = Phaser.Math.Between(3, 14);
                let radius = Phaser.Math.Between(8, 50);

                this.matter.add.polygon(x, y, sides, radius, { restitution: 0.5 });
                tempBody2 = this.matter.add.polygon(x, y, sides, radius, { restitution: 0.5 });
            }
            else
            {
                let width = Phaser.Math.Between(16, 128);
                let height = Phaser.Math.Between(8, 64);

                this.matter.add.rectangle(x, y, width, height, { restitution: 0.5 });
                tempBody2 = this.matter.add.rectangle(x, y, width, height, { restitution: 0.5 });
            }
            //tempBody2.setCollisionCategory(cat2)

            this.matter.add.spring(tempBody1, tempBody2, 100, 0.9);
            tempBody1 = tempBody2;

        }

        this.matter.add.mouseSpring(); //alows mouse interaction
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            enableSleeping: true,
     
        }
    },
    scene: Example
};

let game = new Phaser.Game(config);