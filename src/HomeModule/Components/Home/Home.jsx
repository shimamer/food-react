import React from 'react'
import Header from '../../../SharedModule/Components/Header/Header'
import header from '../../../assets/images/eating vegan food-rafiki.png'
import './Home.css'
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>

      <Header>
        <div className="header p-4">
          <div className="row align-items-center text-white">
            <div className="col-md-9">
              <h3>Welcome Upskilling! </h3>
              <p>This is a welcoming screen for the entry of the application , you can now see the options</p>

            </div>
            <div className="col-md-3">
              <img className='w-100' src={header} alt="" />
            </div>
          </div>
        </div>
      </Header>

      <div className="home-content p-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h4>Fill the <span>Recipes</span> !</h4>
            <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
          </div>
          <div className="col-md-6 text-end">
            <button className='btn btn-success me-1'>
              <Link to={"/dashboard/recipes"} className='text-decoration-none text-white'>Fill Recipes  <FaArrowRight /></Link>
            </button>


          </div>
        </div>
      </div>

    </>
  )
}

export default Home