import React from "react";
import './Sidebar.css';
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink 
                    to='/add' 
                    className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}>
                    <img src={assets.add_icon} alt="Add" />
                    <p>Add Items</p>
                </NavLink>

                <NavLink 
                    to='/list' 
                    className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}>
                    <img src={assets.check} alt="List" />
                    <p>List Items</p>
                </NavLink>

                <NavLink 
                    to='/orders' 
                    className={({ isActive }) => isActive ? "sidebar-option active" : "sidebar-option"}>
                    <img src={assets.favourite} alt="Orders" />                    
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
