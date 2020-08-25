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