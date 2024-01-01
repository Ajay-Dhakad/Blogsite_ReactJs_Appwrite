import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {

  return (

   <section>  

    <div className="socials">
      <img src="https://www.freeiconspng.com/thumbs/github-icon/github-icon-9.png" alt="Github" className="github" />
      <img src="https://static.vecteezy.com/system/resources/previews/018/930/587/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png" alt="LinkedIn" className="linkedin" />
    </div>
   
    <div className="footertext">© 2024 ThoughtCloud</div>
    <hr />
    
   </section>
  )
}

export default Footer;
