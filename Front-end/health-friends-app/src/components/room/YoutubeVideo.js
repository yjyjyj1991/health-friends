import React, { Component } from 'react';
import { ReactDOM } from 'react-dom';
import YouTube from 'react-youtube';
const tmPose = window.tmPose;
let model, webcam, ctx, labelContainer, maxPredictions;
var status = "stand"

var startTime = 0;
var endTime = 0;
var point = 0;
class YouTubeVideo extends Component {
  constructor(props) {
    super(props);
    console.warn(props);
    this.state = {
      player: undefined,
      requestId: undefined,
      count: 0,
      isPlaying: false
    };

    this.onPlay = this.onPlay.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onReady = this.onReady.bind(this);
    this.predict = this.predict.bind(this);
    this.init = this.init.bind(this);
    this.loop = this.loop.bind(this);
  }

  play() {
    if (this.state.player !== undefined) {
      this.state.player.target.playVideo();
      this.init();
    }
  }

  pause() {
    if (this.state.player !== undefined) {
      this.state.player.target.pauseVideo();
    }
  }

  stop() {
    if (this.state.player !== undefined) {
      this.state.player.target.stopVideo();
      this.onStop(this.state.player);
    }
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        //autoplay: 1,
      },
    };


    return (
      <div>
        <YouTube videoId={this.props.youTubeId} opts={opts} onReady={this.onReady} onPlay={this.onPlay} onPause={this.onStop} />
        <div><canvas style={{ visibility: "hidden" }} id="canvas"></canvas></div>
        <div id="label-container"></div>
      </div>);
  }

  onReady(event) {
    console.warn("onReady")
    this.setState({
      player: event
    })
  }

  setCount(count) {
    this.setState({
      count: count
    });

    this.props.setCount(count);
  }

  onPlay(event) {
    console.log("onPlay");
    this.setCount(0);
    this.setState({
      isPlaying: true
    })

    const date = new Date();
    startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  onStop(event) {
    console.log("onStop");
    if (!this.state.isPlaying)
      return;

    webcam.stop();
    this.setState({
      isPlaying: false
    })

    const date = new Date();
    endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const timeDiff = Date.parse(endTime) - Date.parse(startTime);
    const count = this.state.count;
    point = (count / 10) * (timeDiff / 1000);

    const data =
    {
      point: point,
      startTime: startTime,
      endTime: endTime
    }
    this.props.saveHistory(data);
  }

  async init() {
    const modelURL = "./" + this.props.youTubeId + "/model.json";
    const metadataURL = "./" + this.props.youTubeId + "/metadata.json";

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const size = 200;
    const flip = true;
    webcam = new tmPose.Webcam(size, size, flip);
    await webcam.setup();
    await webcam.play();
    const requestId = window.requestAnimationFrame(this.loop);
    this.setState({
      requestId: requestId
    })

    const canvas = document.getElementById("canvas");
    canvas.width = size; canvas.height = size;
    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async loop(timestamp) {
    webcam.update();
    await this.predict();
    if (this.state.isPlaying) {
      window.requestAnimationFrame(this.loop);
    }
  }

  async predict() {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);
    if (prediction[0].probability.toFixed(2) >= 1.00) {
      status = "lunge"
    } else if (prediction[1].probability.toFixed(2) >= 1.00) {
      if (status === "lunge") {
        const count = this.state.count + 1;
        this.setCount(count);
        console.log(count);
      }
      status = "stand"
    }
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    this.drawPose(pose);
  }

  drawPose(pose) {
    if (webcam.canvas) {
      ctx.drawImage(webcam.canvas, 0, 0);
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  }
}

export default YouTubeVideo;