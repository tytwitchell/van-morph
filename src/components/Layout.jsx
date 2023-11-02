import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
    return (
      <>
        {/* <div className="background-img"></div> */}
        <div className="page-wrapper">
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
      </>
    );
}