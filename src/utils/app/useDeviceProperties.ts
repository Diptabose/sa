"use client"
import { useEffect, useState } from "react"

const useDeviceProperties = () => {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        window.addEventListener('resize', handleWindowSizeChange);
        window.addEventListener('orientationchange', handleWindowSizeChange);
        window.addEventListener('load', handleWindowSizeChange);
        window.addEventListener('reload', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
            window.removeEventListener('orientationchange', handleWindowSizeChange);
            window.removeEventListener('load', handleWindowSizeChange);
            window.removeEventListener('reload', handleWindowSizeChange);
        }
    }, []);
    const isMobileDevice = (width < 576 ? true : false);
    const isTabletDevice = (width >= 576 && width < 992 ? true : false);
    return { width: width, height: height, isMobileDevice: isMobileDevice, isTabletDevice: isTabletDevice };
}


export default useDeviceProperties
