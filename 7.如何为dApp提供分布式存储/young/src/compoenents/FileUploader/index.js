import {useState} from 'react';
import { Button, Card, Form } from "react-bootstrap";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'


export const FileUploader = ({setCids, setIpfsError, setSendingState}) => {
    
    const [files, setFile] = useState([]); 

    const onInputChange = (event) => {
        setFile(event.target.files) 
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_API_TOKEN });

        console.log(process.env.REACT_APP_WEB3STORAGE_API_TOKEN)

        try {
            setSendingState(true);
            const rootCid = await client.put(files);
            console.log("Successfully sent to IPFS");
            console.log("https://" + rootCid + ".ipfs.dweb.link");
            setCids([rootCid]);
        } catch {
            setIpfsError(true);
            console.log("Failed to send to IPFS");
            setSendingState(false);
        }

    }

    return (
        <div>
            <Form method="post" action="#" id="#"  onSubmit={onSubmit}>
                <Form.Group className="mb-3 form-group files">
                    <input type="file"
                        onChange={onInputChange}
                        className="form-control"
                        multiple/>
                </Form.Group>

                <Button variant="dark" type="submit">
                    Send via IPFS
                </Button>
            </Form>
        </div>
    )
}