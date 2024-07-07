import React, { useState,useEffect } from 'react';
import { Link ,useParams} from 'react-router-dom';

import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

// name  donarname itemname description quantity  landmark address city address pincode mobile 

const UpdateRoomOwner = () => {
  const { id } = useParams(); // Use useParams to get route parameters

  //const id = match.params.id;
  //const [donationData, setDonationData] = useState({});
  
  const [editedRoom, setEditedRoom] = useState({
    name: '',
    type: '',
    price: '',
    vacancy: '',  
  });
  
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/room/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedRoom({
            name: data.name  ,
            type: data.type ,         
            price: data.price ,
            vacancy: data.vacancy , 
          });
        }else {
          console.error('Error fetching Room data:', response.statusText);
        } 
      } catch (error) {
        console.error('Error fetching Room data:', error.message);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRoom({
      ...editedRoom,
      [name]: value,
    });
  };

  const handleUpdateRoom  = async (e) =>  {
    e.preventDefault();
    try {

      

      const response = await fetch(`http://localhost:4000/api/v1/room/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        //  'x-auth-token': token,
        },
        body: JSON.stringify(editedRoom),
      });

      if (response.ok) {
        console.log('Room details updated successfully!');
        alert('Room details updated successfully!')
        // Add any additional logic you need after a successful update
        window.location.href = "/manage_room_owner";

      } else {
        console.error('Not updating Room details:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating Room details:', error.message);
    }
  };

  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'#020310'}}><img src={imgSmall} alt=""/> <Title /> </div>
        
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
        </div>  

{/* tabindex="-1" */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap"  id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
      <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>

      <div className="offcanvas-body">
        <div className="sidenav-profile">
          <div className="user-profile"><img src={imgBg} alt=""/></div>
          <div className="user-info">
            <h6 className="user-name mb-1">PG Location and Hostel Booking Management System </h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/owner_home"><i className="lni lni-home"></i>Home</Link></li>
          <li><Logout /></li>  
          </ul>
      </div>
    </div>
      </div>
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>Update Room details</h6>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-3">
          <div className="card user-data-card">
            <div className="card-body">
              <form onSubmit={handleUpdateRoom}>
              
             
              <div className="mb-3">
                  <div className="title mb-2"><span>Name:</span></div>
                  <input className="form-control"
                    name="name" id="name"
                    value={editedRoom.name}
                    onChange={handleInputChange}    type="text"  />
                </div>

                <div className="mb-3">
                  <div className="title mb-2"><span>Room Type:</span></div>
                  <input className="form-control" name="type" id="type"
                    value={editedRoom.type}
                    onChange={handleInputChange}   type="text"/>
                </div> 

                <div className="mb-3">
                  <div className="title mb-2"><span>Price:</span></div>
                  <input className="form-control" name="price" id="price"
                    value={editedRoom.price}
                    onChange={handleInputChange}  type="text"/>
                </div>
                <div className="mb-3">
                  <div className="title mb-2"><span>Vacancy:</span></div>
                  <input className="form-control" name="vacancy" id="vacancy"
                    value={editedRoom.vacancy}
                    onChange={handleInputChange}  type="text" />
                </div>
                <button  className="btn btn-success w-100"  type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
        {/* Form Scrip End
        */}



        </div>
      </div>
    </div>
            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/owner_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default UpdateRoomOwner