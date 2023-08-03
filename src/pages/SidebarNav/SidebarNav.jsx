import React from 'react'
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import "./styles.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
// import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Outlet } from 'react-router-dom';

export default function SidebarNav() {
    return (
        <>
            <div style={{ display: "flex", height: "100vh" }}>
                <Sidebar className="app" backgroundColor='black'>
                    <Link to={"/"} className='mailtrail'>
                        <h2>MailTrail</h2>
                    </Link>
                    <Menu menuItemStyles={{
                        button: {
                            '&:hover': {
                                backgroundColor: 'rgb(140, 133, 133)',
                            },
                        },
                    }}>
                        {/* <Link to={"/"} className="menu-item">
                            <MenuItem className="menu1">
                                <h2>MailTrail</h2>
                            </MenuItem>
                        </Link> */}
                        <Link to={"/"} className="menu-item">
                            <MenuItem icon={<DashboardIcon />}>
                                Dashboard
                            </MenuItem>
                        </Link>
                        <Link to={"/create"} className="menu-item">
                            <MenuItem icon={<AddIcon />}>
                                Create
                            </MenuItem>
                        </Link>
                        {/* <MenuItem icon={<LogoutIcon />}> Logout </MenuItem>  */}
                    </Menu>
                </Sidebar>
            </div>
            <Outlet />
        </>
    );
}