import { glipWalletSDK } from 'glip-wallet-sdk/wallet';
let initializedGlipWallet = false;

const getGlipWallet = async () => {
    if(initializedGlipWallet) {
        return initializedGlipWallet;
    }
    await glipWalletSDK.init({
        chain:'polygon',
        authNetwork: 'cyan',
        clientIdentifier: '63020e1ef81e3742a278846a'
    });
    return glipWalletSDK;
};


export default getGlipWallet;
