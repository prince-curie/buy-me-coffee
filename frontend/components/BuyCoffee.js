import { useContext, useState } from "react";
import { getProvider, getSigner, initializeContract } from "../helpers";
import { Button, TextField, Typography } from "@mui/material";
import { Coffee } from "@mui/icons-material";
import web3ModalContext from "../context/web3ModalContext";
import { ethers } from "ethers";

export default function BuyCoffee({ showNotification, setIsNewDonation}) {
    const [metadata, setMetadata] = useState({name: '', message: ''});
    
    const web3ModalRef = useContext(web3ModalContext)

    const buy = async(price, event) => {
        event.preventDefault()

        try {
            const amount = ethers.utils.parseEther(price)
            const web3ModalInstance = await web3ModalRef.current.connect()
        
            const provider = getProvider(web3ModalInstance)
        
            const signer = getSigner(provider)
        
            const contract = initializeContract(signer);
        
            const tx = await contract.buyCoffee(metadata.name, metadata.message, {value: amount});
        
            await tx.wait()

            setIsNewDonation(true)

            showNotification('success', 'Thanks for buying me a coffee');
            
            setMetadata({name: '', message: ''})
        } catch (error) {
            showNotification('error', 'Error encountered');
        }
    }

    return (
        <>
            <form style={{display:'flex', flexDirection:'column', width:'100%'}}>
                <Typography variant='h6' component="div" style={{ margin: '1rem auto' }}>
                    Buy me coffee   
                </Typography>
                
                <TextField 
                    label="Name" 
                    variant="filled" 
                    value={metadata.name}
                    onChange={(e) => setMetadata(metadata => ({
                            ...metadata,
                            name: e.target.value
                        }))
                    }
                    style={{ width:'100%', margin: '1rem auto'}}
                />

                <TextField
                    label="Message" 
                    name="message" 
                    variant="filled"
                    rows={2}
                    cols={60} 
                    value={metadata.message}
                    onChange={(e) => setMetadata(metadata => ({
                            ...metadata,
                            message: e.target.value
                        }))
                    }
                    multiline
                    style={{ width:'100%', margin: '1rem auto'}}
                />

                <Button style={{ width:'100%', margin: '1rem auto'}} 
                    color='primary' 
                    variant="contained" 
                    type="submit" 
                    onClick={(e) => buy("0.001", e)}
                >
                    Buy <Coffee /> for 0.001 eth
                </Button>
                <Button style={{ width:'100%', margin: '1rem auto'}} 
                    color='primary' 
                    variant="contained" 
                    type="submit" 
                    onClick={(e) => buy("0.002", e)}
                >
                    Buy <Coffee /> <Coffee /> for 0.002 eth
                </Button>
                <Button style={{ width:'100%', margin: '1rem auto'}} 
                    color='primary' 
                    variant="contained" 
                    type="submit" 
                    onClick={(e) => buy("0.003", e)}
                >
                    Buy <Coffee /> <Coffee /> <Coffee /> for 0.003 eth
                </Button>
            </form>
        </>
    );
}
