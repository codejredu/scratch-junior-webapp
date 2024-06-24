class Sprite {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

export function initSprites(canvas) {
    const catImage = new Image();
    catImage.src = 'images/cat.png';  // נצטרך ליצור תמונה זו

    const sprites = [
        new Sprite(100, 100, catImage)
    ];

    catImage.onload = () => {
        sprites.forEach(sprite => sprite.draw(canvas.ctx));
    };

    return sprites;
}
