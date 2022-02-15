import React from 'react';
import YouTube from 'react-youtube';
const tmPose = window.tmPose;
let model, webcam, ctx, labelContainer, maxPredictions;
var status = "stand"

var startTime = 0;
var endTime = 0;
var point = 0;
class YouTubeVideo extends React.Component {
  constructor(props) {
    super(props);
    console.warn(props);
    this.state = {
      count:0,
    };

  }
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    };

  return (
        <div>
          <YouTube videoId={this.props.youTubeId} opts={opts} onPlay={this._onReady} onPause = {this.stopVideo} />
          <button type="button" onClick={() =>{this.init();}}>Start</button>
            <div><canvas style={{visibility: "hidden"}} id="canvas"></canvas></div> 
            <div id="label-container"></div> 
        </div>);
  }
  

  _onReady(event) {
    console.log(this.state.count);
    event.target.playVideo(); 
    startTime = new Date().getTime();
  }
  stopVideo(event) {
    event.target.stopVideo();
    endTime = new Date().getTime();
    console.log((endTime - startTime)/1000);
    console.log(this.state.count);
    point = (this.state.count/10)*((endTime - startTime)/1000);
    console.log(point);
  }

        async init() {
          // eslint-disable-next-line no-useless-concat
          const modelURL ="./"+ this.props.youTubeId +  "/model.json";
          // eslint-disable-next-line no-useless-concat
          const metadataURL = "./"+this.props.youTubeId  + "/metadata.json";

          model = await tmPose.load(modelURL, metadataURL);
          maxPredictions = model.getTotalClasses();
  
          const size = 200;
          const flip = true; 
          webcam = new tmPose.Webcam(size, size, flip); 
          await webcam.setup(); 
          await webcam.play();
          window.requestAnimationFrame(loop);
  

          const canvas = document.getElementById("canvas");
          canvas.width = size; canvas.height = size;
          ctx = canvas.getContext("2d");
          labelContainer = document.getElementById("label-container");
          for (let i = 0; i < maxPredictions; i++) { 
              labelContainer.appendChild(document.createElement("div"));
          }
      }
}
async function loop(timestamp) {
  webcam.update(); 
  await predict();
  window.requestAnimationFrame(loop);
}
async function predict() {
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  const prediction = await model.predict(posenetOutput);
  if(prediction[0].probability.toFixed(2) >= 1.00){
      status = "lunge"
  } else if(prediction[1].probability.toFixed(2) >= 1.00){
      if(status === "lunge"){
        this.state.count++;
        console.log(this.state.count);
      }
      status = "stand"
  } 
  for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
          prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
  }

  drawPose(pose);
}

function drawPose(pose) {
  if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      if (pose) {
          const minPartConfidence = 0.5;
          tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
          tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
  }
}
export default YouTubeVideo;