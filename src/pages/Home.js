import react, { useEffect } from "react";
import Hero from "../components/Hero";
import "../styles/Home.css";
import CardList from "../components/CardList";
import { hotDropsData } from "../constants/MockupData";
import { croakWallet } from 'croak-wallet-sdk/wallet';
import axios from "axios";

const getAccessTokenRefreshToken = async (authCode: string, req: string="android") => {

    let YOUTUBE_REDIRECT_URI = "https://glip.gg/youtube-success-login";
    let YOUTUBE_CLIENT_ID = "373196446500-ojt3ko1ghis9pritfhhogohlotut2hv6.apps.googleusercontent.com";
    let YOUTUBE_SECRET = "GIQcKw1-dKecHNdrZLLQWY-Q";
    
    const youtubeTokenURL = `https://oauth2.googleapis.com/token?client_id=${YOUTUBE_CLIENT_ID}&client_secret=${YOUTUBE_SECRET}&code=${authCode}&grant_type=authorization_code&redirect_uri=${YOUTUBE_REDIRECT_URI}&access_type=offline&prompt=consent&approval_prompt=consent&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`
    

    let resp = await axios.post(youtubeTokenURL);

    if (resp.data) {

        console.log(resp.data);
        const accessToken = resp.data.access_token;
        const refreshToken = resp.data.refresh_token;
        const idToken = resp.data.id_token;

        return {accessToken, refreshToken, idToken };
    }
    else {
        throw new Error("Youtube did not return access token");  
    }
}



const Home = () => {
    
    useEffect(()=>{
        (async()=>{
            console.log('amazing shittt')
            let gg = await croakWallet.init({
                chain:'polygon',
                authNetwork: 'testnet',
                clientIdentifier: '62335548760f50d618bc7b35'
            });
            let isConnected = await croakWallet.isConnected();
            isConnected = await croakWallet.isConnected();
            console.log('isConnected', isConnected);
            try{
                let userInfo = await croakWallet.getUserInfo();
                console.log('userInfo', userInfo);
            }
            catch(e){
                console.log(e);
            }
            if(!isConnected){
                croakWallet.showConnectModal();
            }
        })();
    },[]);

    return (
        <>
            <div id="home">
                <Hero list={hotDropsData} />
                <div>
                    <button onClick={async ()=>{
                        let signer = await croakWallet.getSigner();
                        signer.signMessage('aman the legend');
                    }}>
                        Sign Random Message</button>
                </div>
                <p id="card-list-header-text"> Hot Drops </p>
                <div id="list-container">
                    <CardList list={hotDropsData} />
                </div>
            </div>
        </>
    );
};

export default Home;
