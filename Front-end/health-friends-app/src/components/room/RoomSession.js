import React, { useState, useEffect, Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogActions, DialogTitle, DialogContent, DialogContentText, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import axios from 'axios';
import { post } from 'axios';
import { BASE_URL } from 'common/Properties.js';
import RTC from 'components/room/RTC/RTCHelper.js';
import { OpenVidu } from 'openvidu-browser';
import UserVideoComponent from './RTC/UserVideoComponent';

class RoomSession extends Component {
  constructor(props) {
    super(props);
    this.userInfo = JSON.parse(localStorage.getItem('user'))['userInfo'];
    this.state = {
      sessionInfo: undefined,
      myUserName: this.userInfo['nickname'],
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
    };

    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
  }

  componentDidMount() {
    getSessionInfo(this.props.roomId, this.userInfo, (res) => {
      this.state.sessionInfo = res;
      console.log(this.state.sessionInfo);
      if (this.state.sessionInfo === undefined || this.state.sessionInfo['closeTime'] !== null) {
        alert("방이 존재하지 않습니다.");
        leave(this.props);
      } else {
        this.connectSession();
      }
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream
      });
    }
  }

  leaveSession() {
    const session = this.state.session;

    if (session) {
      session.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      sessionInfo: undefined,
      session: undefined,
      subscribers: [],
      myUserName: undefined,
      mainStreamManager: undefined,
      publisher: undefined
    });
    leave(this.props);
  }

  connectSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var session = this.state.session;

        session.on('streamCreated', (event) => {
          var subscriber = session.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          this.setState({
            subscribers: subscribers,
          });
        });

        session.on('streamDestroyed', (event) => {
          this.deleteSubscriber(event.stream.streamManager);
        });


        session.on('exception', (exception) => {
          console.warn(exception);
        });

        session
          .connect(
            this.state.sessionInfo.token,
            { clientData: this.state.myUserName },
          )
          .then(async () => {
            var devices = await this.OV.getDevices();
            console.log(devices);
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            console.log("#", videoDevices);
            let publisher = this.OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: '640x480', // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });
            console.log("#####");
            // --- 6) Publish your stream ---

            session.publish(publisher);

            // Set the main video in the page to display our webcam and store our Publisher
            this.setState({
              currentVideoDevice: videoDevices[0],
              mainStreamManager: publisher,
              publisher: publisher,
            });
          })
          .catch((error) => {
            console.log('There was an error connecting to the session:', error.code, error.message);
          });
      }
    );
  }

  render() {
    return (
      <>
        <Button size="large" color="primary" variant='outlined' style={{ fontSize: '15px' }} onClick={() => {
          this.leaveSession();
        }}> 나가기 </Button>
        {this.state.session !== undefined ? (
          <div id="session">
            <div id="video-container" className="col-md-6">
              {this.state.publisher !== undefined ? (
                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                  <UserVideoComponent
                    streamManager={this.state.publisher} />
                </div>
              ) : null}
              {this.state.subscribers.map((sub, i) => (
                <div key={i} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </>
    );
  };
}

function leave(props) {
  props.setRoomId(null);
}


function getSessionInfo(id, userInfo, callback) {
  axios.post(BASE_URL + 'rtc/get-token',
    {
      id: id,
      nickname: userInfo["nickname"],
    }
  )
    .then((res) => { callback(res['data']['data']); })
    .catch((err) => {
      callback(undefined);
    })
}

export default RoomSession;