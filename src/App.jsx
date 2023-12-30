import { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'

import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logOut } from './Store/authSlice.js'

function App() {

  const [loader, setLoader] = useState(true)


  const dispatch = useDispatch()

  useEffect(() => {

    authService.getCurrentUser().then((userData) => {

      // console.log(userData)

      if (userData) {

        dispatch(login({ userData }))
        setLoader(false)
      }
      else {
        dispatch(logOut())
        setLoader(false)
      }
    })
    // .finally(() =>

    // )

  }, [])

  return (

    <>

      <main>
        <Header />

        {

          !loader ? <Outlet /> : <div className='loadercomponent'> <span id="loader"></span></div>


        }
        <Footer />

      </main>
    </>

  )

}

export default App
