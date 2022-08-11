import React from 'react';
import './CSS/Home.css';
import bgVid from "./assets/Infinity_IDO.mp4";

function Home() {

  return (

    <><video autoPlay muted loop id="IDOBG">
      <source src={bgVid} type="video/mp4" />
    </video>
      <div className='home'>
        <div className="homeMID">
          INFINITY<br/> ECOSYSTEM<br/>
          <hr/>
          IDO IFO Staking
        </div>
      </div>
    </>
  )
}

export default Home
