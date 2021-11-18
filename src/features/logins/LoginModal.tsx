import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  UseDisclosureProps,
  Center,
  Text,
} from "@chakra-ui/react";
import { SignupForm } from "./SignupForm";

const loginTypes = {
  login: {
    action: "Log In",
    description: "Hi there, welcome back!",
    components: <></>,
  },
  signup: {
    action: "Sign Up",
    description: "Hi, we're excited for you to join our community!",
    components: <SignupForm />,
  },
};

export interface ILoginProps {
  loginOption: keyof typeof loginTypes;
}

export const LoginModal = ({
  loginOption,
  isOpen,
  onClose,
}: UseDisclosureProps & ILoginProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent as="form">
      <ModalHeader pb={2}>{loginTypes[loginOption].action}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {/* <Center> */}
          <Text color="gray.600" mb={2}>{loginTypes[loginOption].description}</Text>
        {/* </Center> */}
        {loginTypes[loginOption].components}
      </ModalBody>

      <ModalFooter>
        {/* <Button colorScheme="red" variant="outline" mr={3} onClick={onClose}>
          Close
        </Button> */}
        <Button colorScheme="primary" type="submit">{loginTypes[loginOption].action}</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
