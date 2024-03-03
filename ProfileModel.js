import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Image
  } from '@chakra-ui/react'
 
import React from 'react';

const ProfileModel=({user , children})=> {

    const{isOpen , onOpen , onClose}=useDisclosure();
  return (
    <>
        {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <Button onClick={onOpen}>Open Modal</Button>
      )}
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <p>  Email: {user.email} </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModel;
