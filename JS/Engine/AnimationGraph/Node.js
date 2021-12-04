class Node {
    constructor(name) {
        this.name = name;

        this.childs  = [];
        this.parents = [];
    }

    addChild(node, conditions) {
        this.childs.push({
            node : node,
            conditions : conditions
        });
    }

    addParent(node, conditions) {
        this.parents.push({
            node : node,
            conditions : conditions
        });
    }
}