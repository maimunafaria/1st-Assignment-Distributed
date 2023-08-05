import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "../../Axios/axios";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import MyNavbar from '../../components/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Notification = () => {
    const [notificationInformation, setNotificationInformation] = useState([]);
    const email = localStorage.getItem('email');
    useEffect(() => {

    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
          Authorization: 'Bearer ' + token,
      }
  }
      Axios.get('/notification/getNotification',config)
        .then((response) => {
          if (Array.isArray(response.data.response)) { 
            setNotificationInformation(response.data.response); }
  
        })
  
    }, []);
    const handleRemoveNotification=async(index)=>{
      const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        }
    }
        const notification = notificationInformation[index];
        const id = notification._id;
        console.log(id);
        Axios.put('/notification/approve', { id:id },config).then((response)=>{
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


    return (
        <>
          
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
                <td><b>{user.postEmail}</b> gave the post <b>{user.posts} <img src={`${user.image}`} alt=" " style={{maxHeight:"60px", maxWidth:"60px"}}/>
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
  

</>
);

}

export default Notification;