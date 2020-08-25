var canvas = document.getElementById("canvas"),
    originalImage = null,
    greyImage = null,
    redImage = null,
    rainbowImage = null;

function loadImage() {
    var file = document.getElementById("file");
    greyImage = new SimpleImage(file);
    redImage = new SimpleImage(file);
    rainbowImage = new SimpleImage(file);
    originalImage.drawTo(canvas);
}

function greyFilter () {
    for (var pixel of greyImage.values()) {
        var originalPixel = originalImage.getPixel(pixel.getX(), pixel.getY());
        greyImage.setPixel(pixel.getX(), pixel.getY(), originalPixel);
    }

    for (var pixel of greyImage.values()) {
        var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(average);
        pixel.setGreen(average);
        pixel.setBlue(average);
    }
    greyImage.drawTo(canvas);
}

function makeItGrey() {
    if (greyImage != null) {
        greyFilter();
    }
}

function printOriginalImage(image) {
    image.drawTo(canvas);
}

function makeItRed() {
    for(var pixel of redImage.values()) {
        var originalPixel = originalImage.getPixel(pixel.getX(), pixel.getY());
        redImage.setPixel(pixel.getX(), pixel.getY(), originalPixel)
    }

    for (var pixel of redImage.values()) {
        var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if(average < 128) {
            pixel.setRed(average * 2 - 255);
            pixel.setBlue(average * 2 - 255);
        } else {
            pixel.setRed(255);
            pixel.setGreen(average * 2 - 255);
            pixel.setBlue(average * 2 - 255);
        }
    }
    redImage.drawTo(canvas);
}

function resetImage() {
    var context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
    printOriginalImage(originalImage);
}