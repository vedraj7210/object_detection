img=""
object=[];
Status=""
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdectector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:detecting objects";
}
function preload(){
    img=loadImage("dog_cat.jpg");
}
function draw(){
    image(video,0,0,380,380);
    if(Status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectdectector.detect(video,gotResults);
     for(i=0; i < object.length; i++ ) {
    percent=floor(object[i].confidence * 100);
    document.getElementById("status").innerHTML="Object detected"
    document.getElementById("number_of_object").innerHTML="Number of object detected :"+object.length;


    fill(r,g,b);
    text(object[i].label + " " + percent + "%",object[i].x +15 , object[i].y + 15);
    noFill();
    stroke(r,g,b);
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
   
    }
}
      
}
function modelLoaded(){
    console.log("Model Loaded");
    Status=true;
}
function gotResults(error,results){
if(error){
    console.log(error);

}
else{
    console.log(results);
    object=results;
}
}