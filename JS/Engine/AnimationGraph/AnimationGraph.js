class AnimationGraph {
    constructor(animationConf) {
        this.entry = new Node("entry");  
        this.anyState = new Node("anyState"); 
        this.var = animationConf.var;
        
        this.nodes = {};
        this.currentNode = null;

        this.#init(animationConf);
    }

    #readBool(bool) {
        return this.var.bool[bool.varName] == bool.equalTo;
    }

    #readNumber(number) {
        if ("gt" in number) {
            return this.var.number[number.varName] > number.gt;
        }

        if ("st" in number) {
            return this.var.number[number.varName] < number.st;
        }
    }

    #readConditions(conditions) {
        let isValid = true;
        let index = 0;

        if (conditions.length == 0) {
            return isValid;
        } else {
            while (isValid && index < conditions.length) {
                switch (conditions[index].type) {
                    case "bool" : 
                        isValid = this.#readBool(conditions[index]);
                        break;
                    case "number" :
                        isValid = this.#readNumber(conditions[index]);
                        break;
                }
                
                index++;
            }
        }
        
        return isValid;
    }

    #crateAllNode(animationConf) {
        for (let name of animationConf.nodes) {
            this.nodes[name] = new Node(name);
        }
    }

    #initNodes(animationConf) {
        for (let name in animationConf.nodesConf) {
            if (name == "entry" || name == "anyState") {
                if (name == "anyState") {
                    for (let child of animationConf.nodesConf[name].childs) {
                        this.anyState.addChild(this.nodes[child.name], child.conditions);
                    }
                } else {
                    for (let child of animationConf.nodesConf[name].childs) {
                        this.entry.addChild(this.nodes[child.name], child.conditions);
                        
                        if(this.#readConditions(child.conditions)) {
                            this.currentNode = this.nodes[child.name];
                        };
                    }
                }
            } else {
                for (let child of animationConf.nodesConf[name].childs) {
                    this.nodes[name].addChild(this.nodes[child.name], child.conditions);
                }

                for (let parent of animationConf.nodesConf[name].parents) {
                    this.nodes[name].addParent(this.nodes[parent.name], parent.conditions);    
                }
            }
        }
    }

    #init(animationConf) {
        this.#crateAllNode(animationConf);
        this.#initNodes(animationConf);
    } 

    #updateChilds() {
        let node = this.currentNode.childs;

        for (let child of node) {
            if (this.#readConditions(child.conditions)) {
                this.currentNode = child.node;
            }        
        }
    }

    #updateParents() {
        let node = this.currentNode.parents;

        for (let parent of node) {
            if (this.#readConditions(parent.conditions)) {
                this.currentNode = parent.node;
            }
        }
    }

    #updateAnyState() {
        for (let child of this.anyState.childs) {
            if (this.#readConditions(child.conditions)) {
                this.currentNode = child.node
            }
        }
    }

    setBool(varName, value) {
        console.assert(this.var.bool[varName] != undefined, `No var with name : ${varName}`)
    
        this.var.bool[varName] = value;
    }

    setNumber(varName, value) {
        console.assert(this.var.number[varName] != undefined, `No var with name : ${varName}`)
    
        this.var.number[varName] = value;
    }

    getNode(nodeName) {
        console.assert(this.nodes[nodeName] != undefined, `no node width name : ${nodeName}`);

        return this.nodes[nodeName];
    }

    getCurrentNode() {
        return this.currentNode;
    }
    
    getCurrentNodeName() {
        return this.currentNode.name;
    }

    update() {
        this.#updateAnyState();
        this.#updateChilds();
        this.#updateParents();
    }  
}