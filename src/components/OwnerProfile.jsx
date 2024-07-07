import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';

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

const OwnerProfile = () => {
    

  const navigate = useNavigate();

const EditProfile = (id) => {
  navigate("/edit_owner_profile/" + id);
}

  const [filteredData, setOwnerData] = useState([]);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/owner/');
        const data = await response.json();
        // Assuming 'email' is the key in cookies
        const owneremail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)owneremail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
         // Filter location data based on donaremail
         const filteredOwner = data.filter((owner) => owner.email === owneremail);
        if (response.status === 200) {
          setOwnerData(filteredOwner);
        } else {
          console.error('Error fetching donar data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching donar data:', error.message);
      }
    };

    fetchOwnerData();
  }, []);

  

  // Format time
  const timeOptions = { hour: '2-digit', minute: '2-digit' };


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
            <h6 className="user-name mb-1">Event Marriage Hall Booking System</h6>
         
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
            <h6>My Profile</h6>
			
          </div>
        

            <div className="row" style={{marginTop:10}}>
                {filteredData.map((owner) => (
              <div key={owner._id} className="col-12 col-md-6">                                        
        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                      <a className="product-title d-block"  >Name:  <b> {owner.name} </b></a>
                      <a className="product-title d-block"  >Email:  <b> {owner.email} </b></a>
                      <a className="product-title d-block"  >Mobile: {owner.phone}  </a>                      
                      <a className="product-title d-block"  >City: {owner.city}  </a>
                    </div>
                  </div>   
                  

              <a className="btn btn-danger" onClick={() => EditProfile(owner.id)}>Edit Profile</a> 

              </div>


              ))}
              
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
</div>
  )
}

export default OwnerProfile