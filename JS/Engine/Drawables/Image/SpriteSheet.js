class SpriteSheet extends Sprite {
    constructor(x, y, path, row, col, frames) {
        super(x, y, path)

        this.frames = frames;

        this.row = row;
        this.col = col;
    
        this.cellWidth  = 0;
        this.cellHeight = 0;

        this.cellWidthRender  = 0;
        this.cellHeightRender = 0;
    }

    setSprite(spriteSheet) {
        this.path  = spriteSheet.path; 
        this.image = spriteSheet.image;

        this.width  = spriteSheet.width;
        this.height = spriteSheet.height;

        this.cellWidth  = spriteSheet.cellWidth;
        this.cellHeight = spriteSheet.cellHeight;

        this.cellWidthRender  = spriteSheet.cellWidthRender;
        this.cellHeightRender = spriteSheet.cellHeightRender;
    }

    copy() {
        let spriteSheet = new SpriteSheet(0, 0, "", 0, 0, 0);

        spriteSheet.col  = this.col;
        spriteSheet.row  = this.row;

        spriteSheet.path  = this.path; 
        spriteSheet.image = this.image;

        spriteSheet.width  = this.width;
        spriteSheet.height = this.height;

        spriteSheet.cellWidth  = this.cellWidth;
        spriteSheet.cellHeight = this.cellHeight;

        spriteSheet.cellWidthRender  = this.cellWidthRender;
        spriteSheet.cellHeightRender = this.cellHeightRender;
        
        spriteSheet.frames = this.frames;

        return spriteSheet;
    }

    setCellSizeRender(width, height) {
        this.cellWidthRender  = width;
        this.cellHeightRender = height;
    }

    setCellSize(width, height) {
        this.cellWidth  = width;
        this.cellHeight = height;
    }

    scale(k) {
        this.width  *= k;
        this.height *= k;
        
        this.cellWidthRender  *= k;
        this.cellHeightRender *= k;
    }

    load(callback = () => {}) {
        this.image.src = this.path;

        this.image.onload = () => {
            this.setSize(this.image.width, this.image.height);
            this.setCellSize(this.width / this.col, this.height / this.row);
            this.setCellSizeRender(this.cellWidth, this.cellHeight);

            callback();
        };
    }
}