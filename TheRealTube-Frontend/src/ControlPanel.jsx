import React, { useState,useRef } from "react";
import   {Navigate, useNavigate }  from 'react-router-dom';
import Navbar from "./components/navbar";
import "./ControlPanel.css";
import AdminPanel from "./components/adminPanel";


export default function ControlPanel(){


  return (
    <div>
      <Navbar></Navbar>
      <div className="control-panel">
      <AdminPanel/>
      </div>
    </div>
  );
}
