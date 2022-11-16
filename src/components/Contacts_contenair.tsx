import React from 'react';
import { useState } from 'react';
import { MarkerType } from '../types/types';
import Contacts from './Contacts';

type PropsContacts_contenair = {
    markersData: MarkerType[],
    openPopUp: Function
}

const Contacts_contenair = ({ markersData, openPopUp }: PropsContacts_contenair) => {
    const [isOpen, setIsOpen] = useState(false);



    return (
        <div className='bg-[#f1f1f1] grow mx-[5vw] my-[10vh] rounded-3xl relative shadow-contacts_shadow'>
            <div className="text-center rounded-lg h-[10%] w-full overflow-hidden flex justify-center items-center text-2xl mb-10">
                <h1 >My contacts</h1>
            </div>
            <div className='flex flex-col gap-4 items-center'>
                {markersData.map((value:MarkerType) => {
                    return (<Contacts name={value.name} type={value.type} openPopUp={openPopUp}/>)
                })}
            </div>
            
            <div className="absolute flex justify-center items-center bottom-0 rounded-lg overflow-hidden h-[10%] w-full">
                <button className='h-10 w-40 bg-button px-[15px] rounded-[12px] font-bold transition-all hover:bg-button_hover hover:shadow-btn_shadow text-[#f3ffcf]'>Add a contact</button>
            </div>
        </div>
    );
};

export default Contacts_contenair;