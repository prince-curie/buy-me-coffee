import React, { useState, useContext, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import web3ModalContext from "../context/web3ModalContext";
import { getProvider, initializeContract } from "../helpers";


export default function Messages({ walletConnect, isNewDonation, setIsNewDonation, showNotification }) {
  const web3ModalRef = useContext(web3ModalContext)
  const [incomingMessages, setIncomingMessages] = useState({names: [], messages: []})
  
  const getMessages = async() => {
    try {
      const web3ModalInstance = await web3ModalRef.current.connect()
  
      const provider = getProvider(web3ModalInstance)
  
      const contract = initializeContract(provider)
  
      const noOfMessages = (await contract.getMemosCount()).toNumber()
  
      const length = 10;
      
      let memos = incomingMessages;
  
      if(noOfMessages > 0) {
        memos = await contract.getMemos(noOfMessages, length)
      } 
      setIncomingMessages({names: memos.name, messages: memos.message})
    } catch (error) {
      showNotification('error', 'Sorry, we encountered an error.')
    }
  }

  useEffect(() => {
    if(walletConnect) {
      getMessages()
    }
    setIsNewDonation(false)
  }, [isNewDonation])

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {incomingMessages.messages.map((message, index) => {
        return <>
          <ListItem alignItems="flex-start" key={index}>
            <ListItemText
              primary={message}
              secondary={
                <>
                  from: {incomingMessages.names[index]}
                </>
              }
            />
          </ListItem>
          <Divider />
        </>
      })}
    </List>
  ) 
}