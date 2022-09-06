import react, { useEffect, useState } from "react";
import Accordion from "../components/base/Accordion";
import AccordionHeader from "../components/base/AccordionHeader";
import Button from "../components/base/Button";
import Card from "../components/base/Card";
import Checkbox from "../components/base/Checkbox";
import Image from "../components/base/Image";
import Select from "../components/base/Select";
import TextInput from "../components/base/TextInput";
import { Colors } from "../constants/Colors";
import {AiOutlineSearch} from 'react-icons/ai';
import Header from "../components/Header";
import { useEthers, useEtherBalance } from "@usedapp/core";
import getGlipWallet from '../constants/croakWallet';
import ListNFTComponent from '../components/ListNFT';


const Create = () => {
    
    const {activateBrowserWallet, account} = useEthers();
    const [userInfo, setUserInfo] = useState();
    const [nftList, setNFTList] = useState([]);
    const [myaddress, setMyAddress] = useState('');
    
    const etherBalance = useEtherBalance(account);

    const fetchUserNFTs = async (walletId) => {
        console.log('fetchedNFTs', walletId);
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'x-api-key': 'test_key.iReoPRncStWhw7pXYaAo'}
        };
        
        let resp = await fetch(`https://be.namasteapis.com/blockchain/v1/wallet-balance/list-wallet-nft-server?walletId=${walletId}&size=50`,
                               options);
        
        let responseJSON = await resp.json();
        return responseJSON;
    }
    
    useEffect(()=>{
        (async()=>{
            let croakWallet = await getGlipWallet();
            let isConnected = await croakWallet.isConnected();
            try{
                let userInfo = await croakWallet.getUserInfo();
                setMyAddress(userInfo.publicAddress);
                let fetchedNFTData = await fetchUserNFTs(
                    userInfo.publicAddress);
                setNFTList(fetchedNFTData.data.contracts);
            }
            catch(e){
                console.log(e);
            }
            if(!isConnected){
                // croakWallet.showConnectModal();
            }
        })();
    },[]);

    const createNFT = async () => {
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'x-api-key': 'test_key.iReoPRncStWhw7pXYaAo',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                metadata: {name: '1'},
                supply: 1,
                company: '63020e1ef81e3742a278846a',
                assetContractId: '630f166ee1192354fb54fe10'
            })
        };
        
        let response = await fetch('https://be.namasteapis.com/blockchain/v1/token-data/create', options);
        const createdNFTData = await response.json();
        console.log('createdNFTData', createdNFTData)
        return createdNFTData;
    };
    
    const airdropNFT = async (tokenDatId) => {
        let croakWallet = await getGlipWallet();
        let userInfo = await croakWallet.getUserInfo();
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'x-api-key': 'test_key.iReoPRncStWhw7pXYaAo',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                destinations: [userInfo.publicAddress],
                amounts: [1],
                company: '63020e1ef81e3742a278846a',
                tokenDataId: tokenDatId
            })
        };
        let resp = await fetch(
            'https://be.namasteapis.com/blockchain/v1/airdrop/token-data',
            options);
        let responseJSON = await resp.json();
        return responseJSON;
    };

    const handleNFTProcess = async () => {
        console.log('handling nft process');
        let nftData = await createNFT();
        console.log('nftData',nftData, nftData.tokenId);
        await airdropNFT(nftData.data.id);
    }
    
    return (
        <>
            <Header />
            <div style={{
                marginTop: '120px'
            }}>
                <span style={{color:"white"}}>
                    Your address is {myaddress}
                </span>
                <div  style={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <button
                        style={{
                            lineHeight: '65px',
                            width: '100%',
                            textAlign: 'center',
                            height: '200px',
                            lineHeight:'200px',
                            cursor:'pointer'
                        }} onClick={()=>{handleNFTProcess();}}>
                        <span>Let's go NFT.</span>
                    </button>
                </div>
            </div>
            <div>
                <ListNFTComponent nftList={nftList} />
            </div>
        </>
    );
};

export default Create;
