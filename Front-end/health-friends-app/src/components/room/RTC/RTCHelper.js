import { OpenVidu } from 'openvidu-browser';
import { BASE_URL } from 'common/Properties.js';
import axios from 'axios';

export default class RTCHelper {

  create(sessionInfo, callback) {
    console.log(sessionInfo);
    axios.post(
      BASE_URL + 'rtc/session',
      sessionInfo,
      {
        headers: { "Content-Type": `application/json` }
      }
    )
      .then((res) => {
        console.log(res);
        callback(res['data']);
      })
      .catch((err) => {
        console.warn(err);
        callback(err);
      });
  }

  join(userInfo, token) {
    // getToken((token) => {

    // });
  }

  leave(userInfo, token) {

  }
}

function create(sessionInfo, callback) {
  console.log(sessionInfo);
  axios.post(
    BASE_URL + 'rtc/session',
    sessionInfo,
    {
      headers: { "Content-Type": `application/json` }
    }
  )
    .then((res) => {
      console.log(res);
      callback(res);
    })
    .catch((err) => {
      console.warn(err);
      callback(false);
    });
}

// function getToken(callback) {
//   sessionName = $("#sessionName").val(); // Video-call chosen by the user
//   var nickName = $("#nickName").val();
//   httpPostRequest(
//     BASE_URL + 'rtc/get-token',
//     { sessionName: sessionName, userNickName: nickName },
//     'Request of TOKEN gone WRONG:',
//     (response) => {
//       console.log(response)
//       token = response['data']["token"]; // Get token from response
//       console.warn('Request of TOKEN gone WELL (TOKEN:' + token + ')');
//       callback(token); // Continue the join operation
//     }
//   );
// }