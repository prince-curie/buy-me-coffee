import React, {useContext} from 'react'
import { AccountCircle } from '@mui/icons-material';
import { goerliChainId } from '../constants';
import { AppBar, Typography, Button } from '@mui/material'
import { getAddress, getNetwork, getProvider, getSigner, truncateWalletAddress } from '../helpers';
import web3ModalContext from '../context/web3ModalContext';

export default function Header({
  setWalletConnect, 
  setTruncatedWalletAddress, 
  truncatedWalletAddress,
  walletConnect,
  showNotification
}) {

  const web3ModalRef = useContext(web3ModalContext);
  
  const connectWallet = async() => {
    try {
      const web3ModalInstance = await web3ModalRef.current.connect()
      
      setWalletConnect(true);
  
      const provider = getProvider(web3ModalInstance)
  
      const {chainId} = await getNetwork(provider);
  
      if(chainId != goerliChainId) {
        showNotification('error', 'Wrong network! Only rinkeby test network is allowed.')
      }
  
      const signer = getSigner(provider)
  
      const address = await getAddress(signer) 

      setTruncatedWalletAddress(truncateWalletAddress(address, 10));
    } catch (error) {
      console.log(error)
      showNotification('error', 'Sorry, we encountered an error.')
    }
  }
  
  return (
    <AppBar style={{height: '10vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Typography variant='h3' component="div" style={{ margin: '1rem'}}>
        Buy Me Coffee 
      </Typography>
      {
        !walletConnect ? 
        <Button variant='outlined' 
          style={{height:'1.5rem', padding: '0.5rem', margin: 'auto 1rem', color: 'white', borderColor:'white'}} 
          onClick={connectWallet}
        >
          Connect Wallet
        </Button> : 
        <Typography variant='h6' component="p" style={{margin: 'auto 1rem', display: 'inline-flex'}}> 
          <AccountCircle style={{margin: 'auto .5rem'}}/> 
          {truncatedWalletAddress} 
        </Typography> 
      }
    </AppBar>
  )
}