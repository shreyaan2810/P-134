Status = "";
alarm = "";
objects = [];

function preload(){
    alarm = loadSound("animal_bgm.mp3");
}

function setup(){
    canvas = createCanvas(400, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 350);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 400, 350);

    if(Status != "")
    {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);


            if(objects[i].label == "person")
          {
            document.getElementById("found").innerHTML = "Baby Found";
            alarm.stop();
          }
          else
          {
            document.getElementById("found").innerHTML = "Baby not found";
            alarm.play();
          }
         

          if(objects.length == 0)
          {
          document.getElementById("found").innerHTML = "Baby not found"; 
          alarm.play();
          }
        }
     }
  }