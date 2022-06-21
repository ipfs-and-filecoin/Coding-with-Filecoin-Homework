import { Button } from "react-bootstrap";
import {useState} from 'react';
import axios from 'axios';

export const Register  = ({setGoSignup,setIsLogin}) => {     

    const [email,setEmail]       = useState("");
    const [password,setPassword] = useState("");
    const [apitoken,setApiToken] = useState("");

    const onSignUp = () => {
        if(!email) {
            alert('Please input email.');
            return;
        }

        if(!password) {
            alert('Please input password.');
            return;
        }

        if(!apitoken) {
            alert('Please input Web3storage API Token.');
            return;
        }

        let data = {
            email:email,
            password:password,
            api_token:apitoken
        }

        axios.post("https://book.pharmasolution.com.cn/web3/signup",data,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            if(res.data.code === 0) {
                alert('Signup successful!');
                setIsLogin(true);
                sessionStorage.setItem('api_token',res.data.data['api_token']);
                sessionStorage.setItem('user_email',res.data.data['email']);
                return;
            } else {
                alert('Signup fail!');
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

    const setApiTokenData = (e) => {
        setApiToken(e.target.value);
    }

    const goReg = () => {
        setGoSignup(false);
    }

    return (
        <div>
            <br />
                
            <div className="ipt-group">
                <input type='text' onChange={setEmailData} className="ipt" placeholder="Please input email." />
            </div>

            <div className="ipt-group">
                <input type='password' onChange={setPasswordData} className="ipt" placeholder="Please input password." />
            </div>

            <div className="ipt-group">
                <input type='text' onChange={setApiTokenData} className="ipt" placeholder="Please input Web3storage API Token." />
            </div>

            <Button className="btn-login" variant='success' onClick={onSignUp} >
                Sign Up
            </Button>

            <Button className="btn-s" variant='white' onClick={goReg} >
                Already have an account, go to sign in
            </Button>
        </div>
    )
}