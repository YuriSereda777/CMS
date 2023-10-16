import React from 'react'

const Footer = () => {
  const icons = [
    {icon: 'fab fa-facebook-square fa-fw', url: '#'},
    {icon: 'fab fa-google-plus-g fa-fw', url: '#'},
    {icon: 'fab fa-twitter fa-fw', url: '#'},
  ];

  return (
    <footer className='pb-4'>
      <div className="container">
        <div className="row text-center">
          <div className="col-12">
            <p className='text-muted'>© 2023 CMS All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer