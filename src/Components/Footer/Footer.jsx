import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {

  return (

   <section> 
    
    <ul>

    <li>

<Link   to='/'> Home </Link>

    </li>
    <li>

<Link to='/' >About</Link>

    </li>
    <li>

<Link to='/' >Contact</Link>

    </li>
    <li>

<Link to='/' >Blogs</Link>

    </li>

    </ul>
     </section>
  )
}

export default Footer;
