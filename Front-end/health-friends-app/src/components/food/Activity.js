import React from 'react';
// import axios from 'axios'
import CreateActivity from '../food/CreateActivity';

const Activity = () => {
  // const [active, setActive] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get('https://i6d204.p.ssafy.io/api/foodmanagement?'+'date=2022%2F01%2F20&userId=1')
  //     .then(({data})=>{
  //       setActive(data)
  //       console.log(data);})
  //     .catch((Error)=>{
  //       console.log(Error);})
  // },[]);
  
  return (
    <div>
      <CreateActivity/>
      
    </div>
  );
};

export default Activity;