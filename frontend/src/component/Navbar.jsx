import React from 'react'

const Navbar = () => {
    let data=localStorage.getItem("userid")
    const handlelogout=()=>{
        if(data){
       localStorage.removeItem("userid")
       window.location.href="/signin"
        }
        else
        {
            window.location.href="/signup"
        }
       
    }
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    {/* <a class="navbar-brand" href="#">Navbar</a> */}
    <button
      class="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="/">Customisation </a>
        <a class="nav-link"  onClick={handlelogout}>{data?"SignOut":"SignUp"}</a>
     {!data  &&   <a class="nav-link" href="/signin">Signin</a>}
    
       
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar