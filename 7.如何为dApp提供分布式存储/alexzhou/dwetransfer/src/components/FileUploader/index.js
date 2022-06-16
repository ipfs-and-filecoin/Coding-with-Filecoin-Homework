import { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import { SendEmail } from '../SendEmail';

export const FileUploader = ({setCids, setIpfsError, setSendingState}) => {
    
    const [files, setFile] = useState([]);
    const [mailTo, setMailTo] = useState([]);
    const [mailFrom, setMailFrom] = useState([]);

    const onFileInputChange = (event) => {
        setFile(event.target.files);
    }

    const onMailToInputChange = (event) => {
        setMailTo(event.target.value);
    }

    const onMailFromInputChange = (event) => {
        setMailFrom(event.target.value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();

        // check email
        if (! (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(mailTo))) {
            alert("mailTo is invalid e-mail address");
            return false;
        }

        // check email
        if (! (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(mailFrom))) {
            alert("mailFrom is invalid e-mail address");
            return false;
        }

        SendEmail({ from:mailFrom, to:mailTo, link:"lnk" });
        return false;

        const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_API_TOKEN });

        try {
            setSendingState(true);
            const rootCid = await client.put(files);
            console.log("Successfully sent to IPFS");
            console.log("https://" + rootCid + ".ipfs.dweb.link");
            setCids([rootCid]);

            // send email
            SendEmail({ from:mailFrom, to:mailTo, link:"https://" + rootCid + ".ipfs.dweb.link" });
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
                    <input type="text" className="form-control" onChange={onMailToInputChange} placeholder="email to" />
                    <input type="text" className="form-control" onChange={onMailFromInputChange} placeholder="mail from" />
                    <input type="file" className="form-control" onChange={onFileInputChange} multiple />
                </Form.Group>

                <Button variant="dark" type="submit">
                    Send via IPFS
                </Button>
            </Form>
        </div>
    )
}