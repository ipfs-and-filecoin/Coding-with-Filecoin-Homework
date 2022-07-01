import { Alert,Button,Spinner } from "react-bootstrap";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { useEffect,useState } from "react";
import axios from 'axios';

export const ShowFiles = () => {  

    const [ lastDate,setLastDate ] = useState("");
    const [ listData,setListData ] = useState([]);
    const [ isLoad,setIsLoad ]     = useState(false);

    const getFilesList = async (date) => {
        const userEmail     = sessionStorage.getItem('user_email');
        const maxResults    = 5;
        let list            = [];
        let before          = "";
        let token           = "";

        setIsLoad(true);

        if(userEmail == 'jesse@qq.com') {
            token = process.env.REACT_APP_WEB3STORAGE_API_TOKEN;
        } else {
            token = sessionStorage.getItem('api_token');
        }

        const client        = new Web3Storage({ token: token });

        if(!date) {
            const d = new Date();
            before  = d.toISOString();
        } else {
            before = date;
        }

        for await (const upload of client.list({ before, maxResults })) {
            list.push(upload);
        }

        if(list.length <= 0) {
            setIsLoad(false);
            alert('No More Data');
            return;
        }

        setLastDate(list[list.length-1].created);

        if(listData.length > 0) {
            list = listData.concat(list);
        }

        setListData(list);
        setIsLoad(false);
    }

    const onGoBack = () => {
        window.location.reload();
    }

    const deleteFile = async (cid) => {
        const userEmail     = sessionStorage.getItem('user_email');
        let token           = '';
        
        if(userEmail == 'jesse@qq.com') {
            token = process.env.REACT_APP_WEB3STORAGE_API_TOKEN;
        } else {
            token = sessionStorage.getItem('api_token');
        }

        axios.delete(
            "https://api-staging.web3.storage/pins/"+cid,
            {
                headers: {
                    "Accept": "*/*",
                    "Authorization": "Bearer " + token
                }
            }
        ).then((res) => {
            if(res.response.status === 200) {
                alert("Delete success !");
                getFilesList("");
            } else {
                alert("Delete fail !");
                return;
            }
        }).catch((err) => {
            console.log(err);
            if(err.response.status === 401) {
                alert("Request API Pinning Access !");
                return;
            }
        });
    }

    useEffect(() => {
        getFilesList("");
    },[])

    return (
        <div>
            <Button variant='success' onClick={onGoBack}>
                Go Back
            </Button>
            <Alert variant='light'> 
                Show Files List
            </Alert>
            <ul> 
                {listData.map(function(data, index) {
                    return <li key={index}><a href={"https://" + data.cid + ".ipfs.dweb.link" } target="_blank" rel="noreferrer">{data.cid}</a>  <a className='btn-delete' onClick={()=>{deleteFile(data.cid)}} rel="noreferrer">Delete</a></li>
                })}
            </ul>
            {isLoad ?
                <div>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div> : null
            }
            <Button className="btn-getMore" variant="white" type="button" onClick={()=>{getFilesList(lastDate)}}>Get More</Button>
        </div>
    )
}