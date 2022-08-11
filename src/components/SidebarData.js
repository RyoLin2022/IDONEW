import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Mechanism',
        path: '/mechanism',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'IDO',
        path: '/IDO',
        icon: <FaIcons.FaCartPlus />,
        cName: 'nav-text'
    },
    {
        title: 'Staking',
        path: '/staking',
        icon: <FaIcons.FaCoins />,
        cName: 'nav-text'
    },
    {
        title: 'LP Staking',
        path: '/lpstaking',
        icon: <FaIcons.FaCoins />,
        cName: 'nav-text'
    },
    {
        title: 'Community',
        path: '/community',
        icon: <FaIcons.FaPersonBooth />,
        cName: 'nav-text'
    },
    {
        title: 'Support',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'nav-text'
    },
    {
        title: 'Roast',
        path: '/roast',
        icon: <FaIcons.FaFire />,
        cName: 'nav-text'
    },
]
