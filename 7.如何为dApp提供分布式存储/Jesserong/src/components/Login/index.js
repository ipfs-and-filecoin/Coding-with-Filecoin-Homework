import { Button } from "react-bootstrap";
import {useState} from 'react';
import {Register} from '../Register';
import axios from 'axios';

export const Login  = ({setIsLogin}) => {     

    const [email,setEmail]       = useState("");
    const [password,setPassword] = useState("");
    const [goSignup,setGoSignup] = useState(false);

    const onLogin = () => {
        if(!email) {
            alert('Please input email.');
            return;
        }

        if(!password) {
            alert('Please input password.');
            return;
        }

        let data = {
            email:email,
            password:password
        }

        axios.post("https://book.pharmasolution.com.cn/web3/signin",data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => {
            if(res.data.code === 0) {
                alert('Signin successful!');
                setIsLogin(true);
                sessionStorage.setItem('api_token',res.data.data['api_token']);
                sessionStorage.setItem('user_email',res.data.data['email']);
                return;
            } else {
                alert('Signin fail!');
                setIsLogin(false);
                return;
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const setEmailData = (e) => {
        setEmail(e.target.value);
    }

    const setPasswordData = (e) => {
        setPassword(e.target.value);
    }

    const goReg = () => {
        setGoSignup(true);
    }

    return (
        <div>
        { goSignup ? <Register setIsLogin={setIsLogin} setGoSignup={setGoSignup}  /> :
            <div>
                <br />
                    
                <div className="ipt-group">
                    <input type='text' onChange={setEmailData} className="ipt" placeholder="Please input email." />
                </div>

                <div className="ipt-group">
                    <input type='password' onChange={setPasswordData} className="ipt" placeholder="Please input password." />
                </div>

                <Button className="btn-login" variant='success' onClick={onLogin} >
                    Login
                </Button>

                <Button className="btn-s" variant='white' onClick={goReg} >
                    No account, go to sign up
                </Button>
            </div>
        }
        </div>
    )
}