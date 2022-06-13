import Head from 'next/head'
import React, {useState, useEffect, useRef} from 'react'
import { ThemeProvider, Grid, createTheme, Container } from '@mui/material'
import { Coffee } from '@mui/icons-material';
import Web3Modal from 'web3modal';
import { network } from '../constants';
import Header from '../components/Header'
import BuyCoffee from '../components/BuyCoffee'
import Messages from '../components/Messages'
import Notification from '../components/Notification'
import {Web3ModalProvider} from '../context/web3ModalContext'


export default function Home() {
  const [walletConnect, setWalletConnect] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
  const [truncatedWalletAddress, setTruncatedWalletAddress] = useState('');
  const [isNewDonation, setIsNewDonation] = useState(false);
  const web3ModalRef = useRef();

  const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#361500',
      },
      secondary: {
        main: '#cc9544',
      }
    },
  })

  const showNotification = (alertType, alertMessage) => {
    setAlertType(alertType)
    setAlertContent(alertMessage)
    setIsSnackBarOpen(true)
  }

  useEffect(() => {
    web3ModalRef.current = new Web3Modal({
      network: network,  
      cacheProvider: true,
      disableInjectedProvider: false,
    })
  }, [])

  return (
    <>
      <Web3ModalProvider value={web3ModalRef}>
        {isSnackBarOpen && <Notification 
          alertType={alertType} 
          alertContent={alertContent} 
          isSnackBarOpen={isSnackBarOpen} 
          setIsSnackBarOpen={setIsSnackBarOpen} 
          setAlertType={setAlertType} 
          setAlertContent={setAlertContent}
        />}
        <Head>
          <title>Buy Me Coffee</title>
          <meta name="description" content="Ensures you buy a creator coffee" />
        </Head>

        <ThemeProvider theme={theme}>
          <Container style={{ margin: 0, padding: 0, width: '100%', }}>
            <Header 
              setWalletConnect={setWalletConnect} 
              setTruncatedWalletAddress={setTruncatedWalletAddress} 
              truncatedWalletAddress={truncatedWalletAddress}
              walletConnect={walletConnect}
              showNotification={showNotification}
            />
            <Container style={{
              height: '80vh', 
              width: '100%'
            }}>
              { walletConnect &&
                <Grid container spacing={5} style={{margin: '7rem 0 0', width: '100%'}}>
                  <Grid item sm={12} md={6} lg={4} xl={4} style={{ width: '100%' }}>
                    <BuyCoffee 
                      showNotification={showNotification} setIsNewDonation={setIsNewDonation}
                    />
                  </Grid>
                  <Grid item sm={12} md={6} lg={8} xl={8} style={{ width: '100%' }}>
                    <Messages 
                      walletConnect={walletConnect} 
                      isNewDonation={isNewDonation} 
                      setIsNewDonation={setIsNewDonation} 
                      showNotification={showNotification}
                    />
                  </Grid>
                </Grid>
              }
            </Container>
          </Container>
        </ThemeProvider>
      </ Web3ModalProvider>
    </>
  )
}
