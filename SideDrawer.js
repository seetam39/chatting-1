import { Avatar, Box, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Tooltip, useToast } from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Input,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
// import React , {usestate} from 'react';
import { Button } from "@chakra-ui/button";
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState } from 'react';
import axios from "axios";
// import ChatLoading from "../ChatLoading";
import UserListItem from '../UserAvatar/UserListItem';


const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  // const [loading, setloading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const {user , setSelectedChat , chats, setChats} = ChatState();
  const history = useHistory();
  const { isOpen , onOpen , onClose } = useDisclosure()
  const toast = useToast();


  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

const handleSearch= async ()=>{
  if (!search) {
    toast({
      title: "Please Enter something in search",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
    return;
  }


  try {
    // setloading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/api/user?search=${search}`, config);

    // setLoading(false);
    setSearchResult(data);
    } catch (error){
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

const accessChat =async (userId)=>{
  try{
    setLoadingChat(true)

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };


    const {data} = await axios.post('/api/chat' ,{userId} , config);

    if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

    setSelectedChat(data);
    setLoadingChat(false);
    onClose();
  }catch(error){
    toast({
      title: "Error fetching the chat",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });

  }

  }

  return (
    <>
    <Box id="drawer-box">
    <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <p>
              Search User
            </p>
          </Button>
        </Tooltip>

        <h3>Chat-App</h3>
        <div>
          <Menu>
            <MenuButton>
            <i class="fa-solid fa-bell"></i>
            </MenuButton>
            <MenuButton as={Button} rightIcon={<i class="fa-solid fa-caret-down"></i>}>
              <Avatar size="sm" name={user.name} src={user.pic}></Avatar>

            </MenuButton>
            <MenuList>
             <ProfileModel user={user}>

              <MenuItem>My Profile</MenuItem>
             </ProfileModel>


              <MenuDivider/>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>

          </Menu>
        </div>
    </Box>


    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay/>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
        <DrawerBody>
          <Box className='flex pb-4'>
          <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button 
              onClick={handleSearch}
              >Go</Button>

          </Box>
          {
          // loading?
          //  <ChatLoading /> 
          //  : 
          (
            searchResult?.map((user)=>(
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}/>
            ))
                )
                 } 

        {loadingChat && <Spinner ml="auto" d="flex" />}

        </DrawerBody>
        </DrawerContent>


    </Drawer>
    </>
  );
}

export default SideDrawer;
