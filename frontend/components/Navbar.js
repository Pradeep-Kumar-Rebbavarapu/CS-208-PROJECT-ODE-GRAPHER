// Navbar.js
import React, { useState } from 'react';
import { InputValues } from '@/components/InputValues';
import { Select, SelectComponent } from '@/components/SelectComponent'
const Navbar = () => {
    const [showInputValues, setShowInputValues] = useState(false);

    const toggleInputValues = () => {
        setShowInputValues(!showInputValues);
    }

    return (
        <div>
            <button className="toggle-button text-white z-[10]" onClick={toggleInputValues}>Navbar</button>


            <div className={` !transition-all bg-gray-800  !fade-in-out !h-screen  border-red-500 !left-[-400px]  w-[500px] ${showInputValues ? 'left-[-400px]' : '!left-[0]'}`} style={{ position: 'absolute', zIndex: 1 }}>
                {/* <div className={`navbar-left ${showInputValues ? 'open' : ''} `} style={{ width: '50%',transition: 'all 2s ease' , position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 1000 }}> */}
                {/* Toggle button */}
                <div>
                    <div className="toggle-button text-white z-[10]" style={{ marginLeft: '480px' }} onClick={toggleInputValues}>
                        {/* Include the SVG icon */}
                        <svg style={{ transform: showInputValues ? 'rotate(180deg)' : 'rotate(0deg)' }} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </div>

                </div>


                {/* <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> */}

                <div className='h-full'>

                    {/* Render InputValues component if showInputValues is true */}
                    {/* <div className="navbar-content " style={{ color: 'black'  }}> */}
                    <div className={`navbar-content `} >
                        {!showInputValues && <SelectComponent />}
                    </div>
                    <div className="navbar-content ">
                        {!showInputValues && <InputValues />}
                    </div>
                    {/* Add any additional navbar items here */}
                </div>
            </div>
        </div>
    );
}



export { Navbar };
// export default Navbar;
