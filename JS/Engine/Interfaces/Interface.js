class Interfaces {
    constructor() {
        this.interfaces = this.#getInterfaces();
    }

    #getInterfacesChildrens() {
        let interfaces = document.getElementById("interfaces");
        interfaces.remove();
        return interfaces.children;
    }

    #getInterfaces() {
        let childrens = this.#getInterfacesChildrens();
        let interfaces = {};

        for (let children of childrens) {
            children.style.position = "absolute";
            children.style.top = 0;
            children.style.left = 0;

            interfaces[children.id] = children;
        }

        return interfaces;
    }

    setPosition(id, x, y) {
        let ui = this.interfaces[id];

        ui.style.top = `${y}px`;
        ui.style.left = `${x}px`;
    }

    center(id) {
        let ui = this.interfaces[id];
        let clientRects = ui.getClientRects()[0];
        let position = new Vector2();
        
        position.x = (Settings.windowSize.width  - clientRects.width ) / 2;
        position.y = (Settings.windowSize.height - clientRects.height) / 2;

        this.setPosition(id, position.x, position.y);
    }


    getInterface(id) {
        return this.interfaces[id];
    }

    removeInterface(id) {
        this.interfaces[id].remove();
    } 

    displayInterface(id) {
        document.getElementById("window_container").appendChild(
            this.interfaces[id]
        );
    }
}