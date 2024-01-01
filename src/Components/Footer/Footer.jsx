import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {

  return (

   <section>  

    <div className="socials">
      <Link to='https://github.com/Ajay-Dhakad/'>
      <img src="https://www.freeiconspng.com/thumbs/github-icon/github-icon-9.png" alt="Github" className="github" />
      </Link>
      <Link to='https://linkedin.com/in/ajay-dhakad-01126324b'>
      <img src="https://static.vecteezy.com/system/resources/previews/018/930/587/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png" alt="LinkedIn" className="linkedin" />
      </Link>
    </div>
  
    <div className="footertext">© 2024 ThoughtCloud</div>
    <hr />
    
   </section>
  )
}

export default Footer;
