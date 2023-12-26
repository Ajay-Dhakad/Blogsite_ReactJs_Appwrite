import React from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

function Homepage() {

    const user = useSelector(state => state.auth.status)
    // console.log(user)
  return (
    <div className='homepage'>  
      
      <div class="main">
  <h1>Thought Cloud <div class="roller">
    <span id="rolltext">Post What Ever<br/>
    You Like 💗<br/>
    You Think 🤔<br/>
    { 
    
    (user) ? 'Share It Now!' : 'Join us Now !'

    }
    </span>
    </div>
    </h1>
    
  </div>

<div>
  
  <Link to={user ? '/allposts' : '/login'}>
  <div>
    <button class="btn btn--light">
      <span class="btn__inner">
        <span class="btn__slide"></span>
        <span className="btn__content">{ user ? 'Explore' : "Login / JoinUs!" }</span>
      </span>
    </button>
  </div>
  </Link>
</div>


  
      
    </div>
  )
}

export default Homepage
