import './App.css';

import { useState,useEffect } from "react";
import { FileUploader } from './components/FileUploader';
import { Success } from './components/Success';
import { Error } from './components/Error';
import { Sending } from './components/Sending';
import { ShowFiles } from './components/ShowFiles';
import { Login } from './components/Login';

import { Button, Container, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './assets/dwetransfer-logo.png';
import Background from './assets/background.jpg';

function App() {
  const [cids,setCids]              = useState([]);
  const [ipfsError,setIpfsError]    = useState(false);
  const [sending, setSendingState]  = useState(false);
  const [isShowList,setIsShowList]  = useState(false);
  const [isLogin,setIsLogin]        = useState(false);

  const checkLogin = () => {
    const userEmail     = sessionStorage.getItem('user_email');
    
    if(userEmail) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    setIpfsError(false);
    setSendingState(false);
    setIsShowList(false);
    setCids([]);
  }

  const Logout = () => {
    sessionStorage.removeItem('api_token');
    sessionStorage.removeItem('user_email');
    window.location.reload();
  } 

  useEffect(() => {
    checkLogin()
  },[])

  return (
    <div className="App" style={{ backgroundImage: `url(${Background})` }}>
      <Container className="p-3">
          <Card style={{ width: '25rem', minHeight: '35rem'}}>
            <Card.Img variant="top" src={Logo} />
            <Card.Body>
              <Card.Title>
                WeTransfer in the Web 3.0 
              </Card.Title>
              <div>
                { isLogin ?
                  <div>
                    { (cids.length === 0) && (sending === false) && (!isShowList) ? <FileUploader setCids={setCids} setIpfsError={setIpfsError} setSendingState={setSendingState} /> :null }
                    { (cids.length !== 0) && (!isShowList) ? <Success cids={cids} setCids={setCids} setSendingState={setSendingState} /> : null }
                    { sending && !isShowList ? <Sending setSendingState={setSendingState}/> : null }
                    { ipfsError && !isShowList ? <Error setIpfsError={setIpfsError} setSendingState={setSendingState}/> : null }
                    { isShowList ? <ShowFiles /> : <Button className="btn-showList" variant="white" type="button" onClick={()=>{setIsShowList(true)}}>See Send List</Button> }
                  </div> : <Login setIsLogin={setIsLogin} />
                }
              </div>
              <div>
                { isLogin ? <Button className='btn-logout' variant="white" type="button" onClick={Logout}>Logout</Button> : null}
              </div>
            </Card.Body>
          </Card>
      </Container>
    </div>
  );
}

export default App;
