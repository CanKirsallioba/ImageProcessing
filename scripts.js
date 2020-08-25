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

function makeItRainbow() {

    for(var pixel of rainbowImage.values()) {
        var originalPixel = originalImage.getPixel(pixel.getX(), pixel.getY());
        rainbowImage.setPixel(pixel.getX(), pixel.getY(), originalPixel)
    }
    
    for(var pixel of rainbowImage.values()) {
        var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;

        //red
        if(pixel.getY() <= rainbowImage.getHeight() * (1/7)) {
            if(average < 128) {
                pixel.setRed(2 * average);
                pixel.setGreen(0);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(average * 2 - 255);
                pixel.setBlue(average * 2 - 255);
            }
        }

        //orange
        if(pixel.getY() > rainbowImage.getHeight() * (1/7) && pixel.getY() <= rainbowImage.getHeight() * (2/7)) {
            if(average < 128) {
                pixel.setRed(2 * average);
                pixel.setGreen(0.8 * average);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(1.2 * average - 51);
                pixel.setBlue(average * 2 - 255);
            }
        }

        //yellow
        if(pixel.getY() > rainbowImage.getHeight() * (2/7) && pixel.getY() <= rainbowImage.getHeight() * (3/7)) {
            if(average < 128) {
                pixel.setRed(2 * average);
                pixel.setGreen(2 * average);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(255);
                pixel.setBlue(average * 2 - 255);
            }
        }

        //green
        if(pixel.getY() > rainbowImage.getHeight() * (3/7) && pixel.getY() <= rainbowImage.getHeight() * (4/7)) {
            if(average < 128) {
                pixel.setRed(0);
                pixel.setGreen(2 * average);
                pixel.setBlue(0);
            } else {
                pixel.setRed(average * 2 - 255);
                pixel.setGreen(255);
                pixel.setBlue(average * 2 - 255);
            }
        }

        //blue
        if(pixel.getY() > rainbowImage.getHeight() * (4/7) && pixel.getY() <= rainbowImage.getHeight() * (5/7)) {
            if(average < 128) {
                pixel.setRed(0);
                pixel.setGreen(0);
                pixel.setBlue(2 * average);
            } else {
                pixel.setRed(average * 2 - 255);
                pixel.setGreen(average * 2 - 255);
                pixel.setBlue(255);
            }
        }

        //indigo
        if(pixel.getY() > rainbowImage.getHeight() * (5/7) && pixel.getY() <= rainbowImage.getHeight() * (6/7)) {
            if(average < 128) {
                pixel.setRed(0.8 * average);
                pixel.setGreen(0);
                pixel.setBlue(2 * average);
            } else {
                pixel.setRed(1.2 * average - 51);
                pixel.setGreen(average * 2 - 255);
                pixel.setBlue(255);
            }
        }

        //violet
        if(pixel.getY() > rainbowImage.getHeight() * (6/7) && pixel.getY() <= rainbowImage.getHeight() * (7/7)) {
            if(average < 128) {
                pixel.setRed(1.6 * average);
                pixel.setGreen(0);
                pixel.setBlue(1.6 * average);
            } else {
                pixel.setRed(0.4 * average + 153);
                pixel.setGreen(average * 2 - 255);
                pixel.setBlue(0.4 * average + 153);
            }
        }

    }
    rainbowImage.drawTo(canvas);
}


function resetImage() {
    var context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
    printOriginalImage(originalImage);
}