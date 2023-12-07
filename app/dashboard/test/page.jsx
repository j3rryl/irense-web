"use client"
import React from 'react'
import usePusher from '../../utils/usePusher'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';

const Page = () => {
    usePusher()
  return (
    <>
        <div>Page</div>
        <ToastContainer/>
    </>
  )
}

export default Page