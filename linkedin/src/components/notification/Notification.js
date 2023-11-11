import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "../../Axios/axios";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import MyNavbar from '../../components/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from "../../components/modal/modal"
const Notification = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const [notificationInformation, setNotificationInformation] = useState([]);
  const email = localStorage.getItem('email');
  useEffect(() => {

    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    }
    Axios.get('/getNotification', config)
      .then((response) => {
        if (Array.isArray(response.data.response)) {
          setNotificationInformation(response.data.response);
        }

      })

  }, []);

  const handleRemoveNotification = async (index) => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      }
    }
    const notification = notificationInformation[index];


    const id = notification._id;
    console.log(id);
    Axios.put('/approve', { id: id }, config).then((response) => {
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
  const [selectedUser, setSelectedUser] = useState(null);
  const showPostDetails = (index) => {
    setSelectedUser(notificationInformation[index]);
    openModal();
  };
  return (
    <>

      <MyNavbar />
      <div style={{ marginTop: '150px', height: '400px', overflowY: 'auto' }}>
        <table className="table table-bordered text-center" style={{ width: '80%', margin: 'auto' }}>
          <thead className="bg-primary text-white">
            <tr>
              <th>Notification</th>
              <th>Show Post</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(notificationInformation) &&
              notificationInformation.map((user, index) => {
                return email !== user.postEmail && email === user.email && !user.ifChecked ? (
                  <tr key={index}>
                    <td>
                      <b>
                        <span onClick={() => openModal(index)}>{user.postEmail}</span> </b>gave the post: {' '}
                        <span onClick={() => openModal(index)}>
                          <i>"{user.posts}"</i> <img src={`${user.image}`} alt="" style={{ maxHeight: "60px", maxWidth: "60px" }} />
                        </span>
                    </td>
                    <td>
                      <button className="btn btn-primary" onClick={() => showPostDetails(index)}>
                        Show Post
                      </button>
                    </td>
                    <td>
                      <button className="btn btn-success" onClick={() => handleRemoveNotification(index)}>
                        <i className="fas fa-check"></i>
                      </button>
                    </td>
                  </tr>
                ) : null;
              })}
          </tbody>
        </table>
        <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedUser ? selectedUser.postEmail : ""}>
          {selectedUser ? (
            <>
              {selectedUser.posts}<br></br>
              <img src={`${selectedUser.image}`} alt="" style={{ maxHeight: "400px", maxWidth: "400px" }} />
            </>
          ) : null}
        </Modal>
      </div>




    </>
  );

}

export default Notification;