import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../component/miscellinious/SideDrawer";
import MyChats from "../component/MyChats";
import ChatBox from "../component/ChatBox";

const Chat=()=>{
  const { user } = ChatState();





  return (
    <>
    <div style={{width:"100%"}}>
    {user && <SideDrawer/>}
      <Box id="box-chat">
    
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </Box>


    </div>
    </>
  );
}

export default Chat;
