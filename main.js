img = "";
status = "";
objects = [];

function preload()
{
    alarm = loadSound('sez.mp3');
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!")
    status = true;
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error)
    }
    console.log(results)
    objects = results;
}

function draw()
{
    image(video, 0, 0, 380, 380);
    /*fill("#FF0000");
    text("Dog", 45, 75);
    noFill();
    stroke("#FF0000");
    rect(30, 60, 450, 350);

    fill("#FF0000");
    text("Cat", 320, 120);
    noFill();
    stroke("#FF0000");
    rect(300, 90, 270, 320);*/

    if(status !="")
        {
            r = random(255);
            g = random(255);
            b = random(255);
            objectDetector.detect(video, gotResult);
            for (i = 0; i < objects.length; i++)
                {
                    document.getElementById("status").innerHTML = "Status : Object Detected";
                    document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

                    fill(r,g,b)
                    percent = floor(objects[i].confidence * 100);
                    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                    noFill();
                    stroke(r,g,b);
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                    if(objects[i].label == "person")
                        {
                            document.getElementById("status").innerHTML = "Baby found";
                            alarm.stop()
                        }
                        else
                        {
                            document.getElementById("status").innerHTML = "Baby not found";
                            alarm.play()
                        }
                }
        }
}