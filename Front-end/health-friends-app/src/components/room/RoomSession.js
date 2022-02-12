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
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faDoorOpen, faFileExport, faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, } from "@fortawesome/free-solid-svg-icons";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import './RoomSession.css';

const GoTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: theme.palette.common.white,
    backgroundColor: '#99A799',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

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
      this.setState({
        sessionInfo: res
      })

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
      <div className="container-fluid">
        {this.state.session !== undefined ? (
          <div id="session">
            <div id="video-container" style={{display: 'flex', flexDirection:'column'}} >
              <div className="row align-items-start " style={{marginTop:'1rem', marginLeft:0, marginRight:0, marginBottom:0}}>
                <div className="col-md-5 p-0 d-flex justify-content-center">
                  <Card sx={{ minWidth: 250, width: {sm: 500 ,md:700}, height: {sm:350, md:525}, border:'none' }}>
                    <CardMedia
                        component="iframe"
                        alt="green iguana"
                        // height="450"
                        sx={{width: {sm: 500, md: 700}, height: {sm: 250, md: 525}}}
                        src="https://www.youtube.com/embed/QpSAMoEm0fc?start=36"
                    />
                      {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/QpSAMoEm0fc?start=36" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
                    {/* <CardContent>
                      <Typography variant="h5" >
                        유투브 영상 들어갈 곳
                      </Typography>
                    </CardContent> */}
                  </Card>
                </div>
                <div className="col-md-2"> 여기에 카운트 
                </div>
                {this.state.publisher !== undefined ? (
                  // <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                  // <div className="stream-container col-md-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                  <div className="col-md-5 d-flex justify-content-center" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                    <Card variant="outlined" sx={{ minWidth: 250, width: {sm: 500 ,md:700}, height: {sm:350, md:525} }}>
                      {/* <div style={{height:'400px'}}> */}
                      <UserVideoComponent streamManager={this.state.publisher}  />
                      {/* </div> */}
                      {/* <CardContent>
                        <Typography variant="h5" >
                          본인 여기에 카운트 들어갈까?
                        </Typography>
                      </CardContent> */}
                    </Card>
                  </div>
                ) : null}
              </div>
              {/* <div className="d-flex flex-wrap" style={{display: 'flex', flexDirection:'row'}} > */}
              <div className="d-flex flex-wrap">
                {this.state.subscribers.map((sub, i) => (
                  <div key={i} className="stream-container col-md-3 col-xs-6" style={{display: 'flex', flexDirection:'row'}}  onClick={() => this.handleMainVideoStream(sub)}>
                  {/* //  <div key={i} className="stream-container d-flex"  onClick={() => this.handleMainVideoStream(sub)}> */}
                    {/* <Card sx={{ minWidth:300, width:400, minHeight:200, height: 350 }}> */}
                    <Card sx={{ width: {sm: 250 ,md:300}, height: {sm:200, md:250} }}>
                      <CardContent>
                        <Typography variant="h5" >
                          다른 유저들 카운트
                        </Typography>
                      </CardContent>
                      <UserVideoComponent style={{}} streamManager={sub} />
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
        <div style={{backgroundColor:'#D3E4CD', height:'10rem'}} className="row align-items-center justify-content-center">
            <Box sx={{width: 600 }}>
            <Button style={{backgroundColor:'white', marginRight:'1rem'}}>
              <FontAwesomeIcon icon={faMicrophone} size="3x" /> &nbsp; 음소거
            </Button>
            <Button style={{backgroundColor:'white', marginRight:'1rem'}}>
              <FontAwesomeIcon icon={faMicrophoneSlash} size="3x" />&nbsp; 음소거 해제
            </Button>
            <Button style={{backgroundColor:'white', marginRight:'1rem'}}>
              <FontAwesomeIcon icon={faVideo} size="3x" /> &nbsp;비디오 중지
            </Button>
            <Button style={{backgroundColor:'white', marginRight:'1rem'}}>
              <FontAwesomeIcon icon={faVideoSlash} size="3x" /> &nbsp;비디오 시작
            </Button>
            <GoTooltip title="채팅"  placement="top" style={{color:'red'}}>
              <Button style={{backgroundColor:'white', marginRight:'1rem'}}>
                <FontAwesomeIcon icon={faComments} size="3x" />
              </Button>
            </GoTooltip>
            <GoTooltip title="나가기"  placement="top">
              <Button size="large" style={{ backgroundColor:'white', marginRight:'1rem' }} onClick={() => {this.leaveSession();}}>
                <FontAwesomeIcon icon={faDoorOpen} size="3x" /> 
              </Button>
            </GoTooltip>
            {/* <Button size="large" style={{ backgroundColor:'white', marginRight:'1rem' }} onClick={() => {this.leaveSession();}}>
            <FontAwesomeIcon icon={faFileExport} size="3x" />
            </Button> */}
            {/* <Button size="large" color="primary" variant='outlined' style={{ fontSize: '15px' }} onClick={() => {
              this.leaveSession();
            }}> 나가기 </Button> */}
          </Box>
        </div>
        {/* <Button size="large" color="primary" variant='outlined' style={{ fontSize: '15px' }} onClick={() => {
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
        ) : null} */}
      </div>
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