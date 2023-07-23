import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import MyNavbar from '../../components/Navbar';
import { useParams} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Notification = () => {

    const { email } = useParams();
    const imageBaseUrl = 'http://localhost:9000/distributed';
    const [notificationInformation, setNotificationInformation] = useState([]);
    useEffect(() => {
      Axios.get('http://localhost:3002/api/notification/getNotification')
        .then((response) => {
          if (Array.isArray(response.data.response)) { 
            setNotificationInformation(response.data.response); }
  
        })
  
    }, []);
    const handleRemoveNotification=async(index)=>{
      
        const notification = notificationInformation[index];
        const id = notification._id;
        console.log(id);
        Axios.put('http://localhost:3002/api/notification/approve', { id:id }).then((response)=>{
          if (response.status === 200) {
            const updatedNotificationInformation = [...notificationInformation];
            updatedNotificationInformation.splice(index, 1);
            setNotificationInformation(updatedNotificationInformation);
        }
        else {
          throw new Error('Error');
      }
        })
       
    
  }

    const [authState, setAuthState] = useState(false);
    const authenticate = (email) => {
      Axios.get("http://localhost:3002/api/auth/", {
        headers: {
          accessToken: localStorage.getItem("accessToken")
  
        }
      }).then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
            console.log(response.data.email);
          if (response.data.email == email) {
            setAuthState(true);
          }
        }
      });
    }
  
    useEffect(() => {
      authenticate(email);
    }, []);

    return (
        <>
          {
            authState && (<div>
        <MyNavbar/>
        <div style={{ marginTop: '150px', height: '400px', overflowY: 'auto' }}>
  <table className="table table-bordered text-center" style={{ width: '80%', margin: 'auto' }}>
    <thead className="bg-primary text-white">
      <tr>
        <th>Notification</th>
        <th>Remove</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(notificationInformation) &&
        notificationInformation.map((user, index) =>
        {
            return email !== user.postEmail && email === user.email && !user.ifChecked ? (
              <tr key={index}>
                <td><b>{user.postEmail}</b> gave the post <b>{user.posts} <img src={`${imageBaseUrl}/${user.image}`} alt=" " style={{maxHeight:"60px", maxWidth:"60px"}}/>
                </b></td>

                <td>
                  <button className="btn btn-success" onClick={() => handleRemoveNotification(index)}>
                    <i className="fas fa-check"></i>
                  </button>
                </td>
              </tr>
            ) : null;
          }
        )}
    </tbody>
  </table>
</div>
    </div>
    )
}
</>
);

}

export default Notification;