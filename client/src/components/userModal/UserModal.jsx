import { useState } from "react";
import "./UserModal.css";
import { Modal, ModalHeader, ModalBody, ModalButton, SIZE, ModalFooter } from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button"
import { LayersManager } from 'baseui/layer';

const contactString = (user) => {
    const dialCode = user?.phoneNumber[0].dialCode + " ";
    const phone = user?.phoneNumber[0].phone;
    if (dialCode && phone) return dialCode + phone;
    return "--";
}
const UserModal = ({ isOpen, setIsOpen, modalUser }) => {
    const PF = "http://localhost:5000/images/";
    return <LayersManager zIndex={500}>
         <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        closeable
        animate
    >
        <ModalHeader>User Profile</ModalHeader>

        <ModalBody>
            <div className="userModalWrapper">
                <div className="userImageNameWrapper">
                    <div className="userImage">
                        <img src={modalUser?.profilePic?PF+modalUser?.profilePic:PF+'DAIICT_LOGO.png'} className="modalUserImage"/>
                    </div>
                    <div className="userInfoWrapper">
                        <div className="userNameBatchContainer">
                            <div className="modalUserNameContainer">
                                <span className="label"><b>Username</b></span>
                                <span className="modalUserName">{modalUser?.username}</span>
                            </div>
                            <div className="modalUserBatchContainer">
                                <span className="label"><b>Batch</b></span>
                                <span className="modalUserBatch">{modalUser?.batch?modalUser.batch:"--"}</span>
                            </div>
                            
                        </div>
                        <div className="modalUserContactInfo">
                            <div className="modalUserEmailContainer">
                                <span className="label"><b>Email</b></span>
                                <span className="modalUserEmail">{modalUser?.email}</span>
                            </div>
                            <div className="modalUserPhoneContainer">
                                <span className="label"><b>Phone</b></span>
                                <span className="modalUserPhone">{modalUser?.phoneNumber[0]?contactString(modalUser):"--"}</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </ModalBody>

        <ModalFooter>
            <ModalButton kind={ButtonKind.tertiary} onClick={()=>setIsOpen(false)}>
            Close
            </ModalButton>
      </ModalFooter>

    </Modal>
     </LayersManager>
    
}

export default UserModal;