class CollisionEngine extends System {
    static collisionMask;

    constructor() {
        super();

        this.collisionMask = [
            [1]
        ];

        this.maskNameIndex = {
            "default" : 0
        }
    }

    isIn(a, b) {
        let transformA = a.getComponent(Transform);
        let transformB = b.getComponent(Transform);

        let colliderA = a.getComponent(Collider);
        let colliderB = b.getComponent(Collider);
        
        return transformA.position.x + colliderA.width  / 2 > transformB.position.x - colliderB.width  / 2 &&
               transformA.position.x - colliderA.width  / 2 < transformB.position.x + colliderB.width  / 2 &&
               transformA.position.y + colliderA.height / 2 > transformB.position.y - colliderB.height / 2 &&
               transformA.position.y - colliderA.height / 2 < transformB.position.y + colliderB.height / 2 
    }

    getMask(name1, name2) {
        console.assert(this.maskNameIndex[name1] != undefined, `No mask with name : ${name1}`);
        console.assert(this.maskNameIndex[name2] != undefined, `No mask with name : ${name2}`);

        let i = this.maskNameIndex[name1];
        let j = this.maskNameIndex[name2];

        return this.collisionMask[i][j];
    }

    ignoreAll(name) {
        console.assert(this.maskNameIndex[name] != undefined, `No mask with name : ${name}`);

        let i = this.maskNameIndex[name];

        for (let j = 0; j < this.collisionMask[i].length; j++) {
            this.collisionMask[i][j] = 0;
            this.collisionMask[j][i] = 0;
        }
    }

    ignoreAllExcept(name, names) {
        console.assert(this.maskNameIndex[name] != undefined, `No mask with name : ${name}`);

        this.ignoreAll(name);

        let i = this.maskNameIndex[name];
        let length = this.collisionMask[i].length

        for (let maskName of names) {
            for (let j = 0; j < length; j++) {
                if (this.maskNameIndex[maskName] == j) {
                    this.collisionMask[i][j] = 1;
                    this.collisionMask[j][i] = 1;
                }
            }
        }
    }

    ignoreCollision(name1, name2) {
        console.assert(this.maskNameIndex[name1] != undefined, `No mask with name : ${name1}`);
        console.assert(this.maskNameIndex[name2] != undefined, `No mask with name : ${name2}`);
        
        let i = this.maskNameIndex[name1];
        let j = this.maskNameIndex[name2];

        this.collisionMask[i][j] = 0;
        this.collisionMask[j][i] = 0;
    }

    addCollisionMask(name) {
        console.assert(this.maskNameIndex[name] == undefined, `There is already a mask with name : ${name}`);

        let index  = this.collisionMask.length;
        let length = this.collisionMask[0].length

        this.collisionMask.push([]);
        this.maskNameIndex[name] = length;

        for (let i = 0; i < length; i++) {
            this.collisionMask[index].push(1);
        }

        for (let mask of this.collisionMask) {
            mask.push(1);
        }
    }

    resolveCollision(a, b) {
        let transformA = a.getComponent(Transform);
        let transformB = b.getComponent(Transform);
        let colliderA  = a.getComponent(Collider);
        let colliderB  = b.getComponent(Collider);

        let bodyA = a.getComponent(RigidBody);

        let delta       = Vector2.sub(transformA.position, transformB.position);
        let penetration = new Vector2();

        penetration.x = (colliderA.width  + colliderB.width)  / 2 - Math.abs(delta.x);
        penetration.y = (colliderA.height + colliderB.height) / 2 - Math.abs(delta.y);

        if (penetration.y < penetration.x) {
            bodyA.velocity.y = 0;
            bodyA.acceleration.y = 0;

            if (delta.y < 0) {
                transformA.position.y += penetration.y;
            } else {
                transformA.position.y -= penetration.y;
            }
        } else {
            if (delta.x < 0) {
                transformA.position.x += penetration.x;
            } else {
                transformA.position.x -= penetration.x;
            }
        }
    }

    collisionResponse(a, b) {
        let bodyA = a.getComponent(RigidBody);
        let bodyB = b.getComponent(RigidBody);

        if (bodyA.velocity.length() > 0) {
            this.resolveCollision(a, b);
        }

        if (bodyB.velocity.length() > 0) {
            this.resolveCollision(b, a);
        }
    }
    
    setFriction(a) {
        let rigidBodyA = a.getComponent(RigidBody);
        
        let velocity = rigidBodyA.velocity.x * -rigidBodyA.material.friction;

        rigidBodyA.velocity.add(new Vector2(velocity, 0));
    }

    onCollision(a, b) {        
        a.onCollision(b.getComponent(Collider));
    }

    systemUpdate(entity) {        
        if (entity.getComponent(RigidBody).type != RigidBody.STATIC) {
            for (let b of this.entities) {
                if (entity != b) { 
                    if (this.getMask(entity.getComponent(Collider).getCollisionMask(), b.getComponent(Collider).getCollisionMask()) == 1) {
                        if (this.isIn(entity, b)) {    
                            this.collisionResponse(entity, b);
                            this.setFriction(entity);
                            this.onCollision(entity, b);
                        }
                    } else {
                        if (this.isIn(entity, b)) {
                            this.onCollision(entity, b);
                        }
                    }
                }
            }
        }
    }
}