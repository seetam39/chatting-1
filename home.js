import React, { useEffect } from 'react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../component/Login';
import Signup from '../component/Signup';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Home() {
  const history = useHistory();

 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats"); 
  }, [history]);





  return (
   <>
   <div className="container-xl">
    <div className='app-body'>
      <div className='top'>
        <h1>Chatting-App</h1>
      </div>
      <div className='bottom'>

      <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb='1em'>
    <Tab width={"300px"}>Login </Tab>
    <Tab width={'300px'}>Sign up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p><Login/></p>
    </TabPanel>
    <TabPanel>
      <p><Signup/></p>
    </TabPanel>
  </TabPanels>
</Tabs>
       
      </div>
    </div>
   </div>
   </>
  );
}

export default Home;
