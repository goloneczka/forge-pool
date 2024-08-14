import React, { useState } from 'react';
import ForgeReconciler, { Modal, ModalTitle, ModalBody, ModalHeader, ModalFooter, Button, Text, UserGroup, User  } from '@forge/react';

const UsersVoteModal = ({isOpenModal, closeModal, modalData}) => {
  
  return (
    <>
      {isOpenModal ? (
        <Modal >
          <ModalHeader>
            <ModalTitle>Vouters for {modalData.question} </ModalTitle>
          </ModalHeader>
          <ModalBody>
            {modalData?.userIds.map((it, i) => {
              return (<React.Fragment key={i} >
                <User accountId={it}></User>
              </React.Fragment>)
            })}
          </ModalBody>
          <ModalFooter>
            <Button appearance="subtle" onClick={() => closeModal()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal >
      ) : (<> </>)
      }
    </>
  );
};

export default UsersVoteModal;