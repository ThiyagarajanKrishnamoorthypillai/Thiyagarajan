import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
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
import imgMech from "./img/mechanic.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const BookingUser = ({ room }) => {
    const navigate = useNavigate();

    const userBooking = (room) => {
        // Ensure room is defined before accessing its properties
        if (!room) return;

        // Store the room.date in cookies
        document.cookie = `roomVacancy=${room.vacancy}; path=/`;
        document.cookie = `roomType=${room.type}; path=/`;
        document.cookie = `roomPrice=${room.price}; path=/`;
        document.cookie = `hostelEmail=${room.owneremail}; path=/`;
        // Navigate to the "/post_booking_user" route
        navigate("/post_booking_user");
    };

  const [cookies] = useCookies(['name']);
  const [roomData, setRoomData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRoomData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/room/`);
            if (response.status === 200) {
                setRoomData(response.data);
            } else {
                console.error('Error fetching Room data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching Room data:', error.message);
        }
    };

    fetchRoomData();
}, []);

// Filter data based on the search term and cookies name
const filteredData = roomData.filter((room) => {
    const isMatch = Object.values(room).some((field) =>
        field.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Additional condition to filter based on "Available" status
    //const isAvailable = room.status.toLowerCase() === 'available';

    // Check if the name from cookies matches the room owner's name
    const isRoomNameMatch = room.name.toLowerCase() === cookies.name.toLowerCase();

    return isMatch && isRoomNameMatch ;
});



  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  return (
    <div>
      <div>
        {/* Header Area */}
        <div className="header-area" id="headerArea">
          <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{ color: '#020310' }}>
              <img src={imgSmall} alt="" /> <Title />
            </div>
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
  
        {/* Offcanvas Area */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
          <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          <div className="offcanvas-body">
            <div className="sidenav-profile">
              <div className="user-profile"><img src={imgBg} alt="" /></div>
              <div className="user-info">
                <h6 className="user-name mb-1">PG Location and Hostel Booking Management System</h6>
              </div>
            </div>
            <ul className="sidenav-nav ps-0">
              <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
              <li><Logout /></li>
            </ul>
          </div>
        </div>
      </div>
  
      {/* Page Content Area */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Search Room's Availability</h6>
            </div>
            <div className="row g-3">
              <div className="top-search-form">
                <form>
                  <input className="form-control" type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>
  
            <div className="row" style={{ marginTop: 10 }}>
              {filteredData.map((room) => (
                room.vacancy > 0 && (
                  <div key={room._id} className="col-12 col-md-6">
                    <div className="card product-card" style={{ marginBottom: 10 }}>
                      <div className="card-body">

                      <td>
  {/* Display the room image */}
  {room.image && (
    <a href={`http://localhost:4000/${room.image}`} target="_blank" rel="noopener noreferrer" className="product-title d-block">

      <img src={`http://localhost:4000/${room.image}`} alt="room Image" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
    </a>
  )}
</td><br></br>

                        <a className="product-title d-block">Hostel Name : <b style={{ color: "green" }}>{room.name}</b></a>
                        <a className="product-title d-block">Room Type : <b style={{ color: "darkblue" }}>{room.type}</b></a>
                        <a className="product-title d-block">Room Amount : <b style={{ color: "purple" }}>{room.price}</b></a>
                        <a className="product-title d-block" style={{ color: "purple" }}><strong>No. Of Vacancy : {room.vacancy}</strong></a>
                      </div>
                    </div>
                    <a className="btn btn-success" onClick={() => userBooking(room)}>Book Now</a>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
  
        {/* Footer Navigation Area */}
        <div className="footer-nav-area" id="footerNav">
          <div className="container h-100 px-0">
            <div className="suha-footer-nav h-100">
              <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                <li className="active"> <Link to="/user_home"><i className="lni lni-home"></i>Home </Link> </li>
                <li><Logout /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default BookingUser