import {useState} from 'react';
import { Button, Alert , Form } from "react-bootstrap";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import axios from 'axios';

export const FileUploader = ({setCids, setIpfsError, setSendingState}) => {
    
    const [files,setFiles]   = useState([]);
    const [email,setEmail]   = useState("");
    
    const onInputChange = async (event) => {
        let fileArr = event.target.files;

        if(!fileArr || fileArr.length <= 0) return;

        for (var i = 0 ; i < fileArr.length ; i++) {
            let isExist = await checkFile(fileArr[i]);

            if(isExist) continue;

            files.push(fileArr[i]);

            // 显示已选择的文件
            let node     = document.createElement("li");
            let textNode = document.createTextNode(fileArr[i].name);
            node.appendChild(textNode);
            document.getElementById("filesList").appendChild(node);
        }

        document.getElementById("fl0").style.display = 'block';

        setFiles(files);
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        if(!email) {
            alert('Please input email.');
            return;
        }

        if(files.length <= 0) {
            alert('Please select files.');
            return;
        }

        const userEmail     = sessionStorage.getItem('user_email');
        let token           = '';
        
        if(userEmail == 'jesse@qq.com') {
            token = process.env.REACT_APP_WEB3STORAGE_API_TOKEN;
        } else {
            token = sessionStorage.getItem('api_token');
        }
        
        const client = new Web3Storage({ token: token });

        try {
            setSendingState(true);
            const rootCid = await client.put(files);
            const link    = "https://" + rootCid + ".ipfs.dweb.link";
            console.log("Successfully sent to IPFS");
            console.log(link);
            sendEmail(email,link);
            setCids([rootCid]);
        } catch(e) {
            setIpfsError(true);
            console.log("Failed to send file to web3.storage");
            console.log(e);
            setSendingState(false);
        }

    }

    //发邮件
    const sendEmail = (email,link) => {
        let data = {
            email:email,
            link:link
        };

        axios.post("https://book.pharmasolution.com.cn/web3/sendEmail",data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => {
            if(res.data.code === 0) {
                
                return;
            } else {
                
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    // 重新选择
    const onReset = () => {
        window.location.reload();
    }


    // 检测文件是否重复
    const checkFile = async (file) => {
        if(files.length <= 0) return false;

        for (let i = 0; i < files.length; i++) {
            if(file.name === files[i].name) {
                return true;
            }
        }

        return false;
    }

    const setEmailData = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div>
            <Form method="post" action="#" id="#"  onSubmit={onSubmit}>
                <input type='text' onChange={setEmailData} className="ipt" placeholder="Please input email." />

                <Form.Group className="mb-3 form-group files inputFile">
                    <input type="file"
                        onChange={onInputChange}
                        className="form-control"
                        multiple/>
                </Form.Group>

                <div id='fl0'>
                    <Alert variant='light'> 
                        Selected Files List
                    </Alert>
                    <ul id="filesList"> 
                    </ul>
                </div>

                <div className="btnGroup">
                    <Button variant="dark" type="submit">
                        Send via IPFS
                    </Button>
                    <Button className="btn-reset" variant="white" type="button" onClick={onReset}>
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    )
}