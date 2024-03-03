// import { background } from '@chakra-ui/react';
import { Button } from "@chakra-ui/button";
import React ,{useState} from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {


  const  [ email, setEmail] = useState();
  const  [ password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history =useHistory();
 
  // const postDetails=(pics)=>{};

  const submitHandler=async ()=>{
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };


  return (
    <div>
      <form>
  

  <div className="mb-3">
    <label forhtml="exampleInputname1" className="form-label">email address</label>
    <input type="email" className="form-control" id="exampleInputname1" aria-describedby="nameHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <div id="nameHelp" className="form-text">We'll never share your name with anyone else.</div>
  </div>


  <div className="mb-3">
    <label forhtml="exampleInputPassword2" className="form-label">Password</label>
    <div className='flex'>
    <input type="password" className="form-control" id="exampleInputPassword2" value={password} onChange={(e)=>setPassword(e.target.value)} ></input>
    <button >see</button>
    </div>
  </div>

 
  <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>

</form>
    </div>
  );
}

export default Login;
