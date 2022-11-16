import React, { useState, useRef } from 'react';
import { GrUserWorker } from 'react-icons/gr'
import { BsFillPeopleFill } from 'react-icons/bs'
import { CgCommunity } from 'react-icons/cg'
import { ImCross } from 'react-icons/im'
import PopUpInfo from './PopUpInfo';

type contactsProp = {
    name: string,
    type: string,
    openPopUp: Function
}

const getLogo = (type: string) => {
    switch (type) {
        case 'entreprise': return (<GrUserWorker className='ml-2' />)
        case 'particulier': return (<BsFillPeopleFill className='ml-2' />)
        case 'collectivite': return (<CgCommunity className='ml-2' />)
    }
}



const Contacts = ({ name, type, openPopUp}: contactsProp) => {
    const [isPopUpInfoOpen, setPopUpInfoOpen] = useState(false);
    // const popUp: React.MutableRefObject<any> | null = useRef(null);


    return (
        <div onClick={() => openPopUp(name)} className={`w-[80%] flex h-10 bg-card_bg rounded-lg items-center justify-around cursor-pointer`}>
            {getLogo(type)}
            <h2 className='block grow ml-2'>{name}</h2>
            <ImCross className='mr-2' />
            {/* <div onClick={() => togglePopUpInfo()} ref={popUp} className={`popup fixed top-0 left-0 flex items-center justify-center bg-opacity-70 bg-[#f1f1f1] h-full w-full z-10`}>
                <PopUpInfo />
            </div> */}
        </div>
    );
};

export default Contacts;