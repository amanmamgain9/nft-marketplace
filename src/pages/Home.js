import react, { useEffect } from "react";
import Hero from "../components/Hero";
import "../styles/Home.css";
import CardList from "../components/CardList";
import { hotDropsData } from "../constants/MockupData";
import { croakWallet } from 'croak-wallet-sdk/wallet';


const Home = () => {
    
    useEffect(()=>{
        (async()=>{
            let gg = await croakWallet.init({
                chain:'polygon',
                authNetwork: 'testnet',
                clientIdentifier: '62335548760f50d618bc7b35'
            }
            );
            let isConnected = await croakWallet.isConnected();
            console.log('isConnected', isConnected);
            try{
                let userInfo = await croakWallet.getUserInfo();
            }
            catch(e){
                console.log(e);
            }
            croakWallet.showConnectModal();
        })();
    },[])

    return (
        <>
          <div id="home">
            <Hero list={hotDropsData} />
            <p id="card-list-header-text"> Hot Drops </p>
            <div id="list-container">
              <CardList list={hotDropsData} />
            </div>
          </div>
        </>
    );
};

export default Home;
