var fs =require('fs');

var Canvas = require('canvas'),
    Image = Canvas.Image;

fs.readFile(__dirname + '/test.png', function(error, file) {
    if (error) {
        console.log(error);
        return;
    }

    var copies = createShadowedCopies(file);

    for (var i = 0, l = copies.length; i < l; i++) {
        fs.writeFile('test' + i + '.png', copies[i], function(err) {
            console.log(err || 'success');
        });
    }
});

function createShadowedCopies(originalImg) {
    var parts = 3,
        img, canvas, ctx,
        result = [];

    for (var i = 0; i < parts; i++) {
        for (var j = 0; j < parts; j++) {
            img = new Image;
            img.src = originalImg;

            canvas = new Canvas(img.width, img.height);
            ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, img.width, img.height);
            createShadowedCopy(img, ctx, parts, i, j);

            result.push(canvas.toBuffer());
        }
    }

    return result;
}


function createShadowedCopy(img, ctx, parts, visibleX, visibleY) {
    var rectWidth = Math.ceil(img.width / parts),
        rectHeight = Math.ceil(img.height / parts);

    ctx.fillStyle = 'gray';

    for (var i = 0; i < parts; i++) {
        for (var j = 0; j < parts; j++) {
            if (i === visibleX && j === visibleY)
                continue;

            ctx.fillRect(i * rectWidth, j * rectHeight, rectWidth, rectHeight);
        }
    }
}
