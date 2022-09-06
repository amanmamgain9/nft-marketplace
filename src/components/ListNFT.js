import { erc20_rw } from "../constants/erc20_rw"
import { ethers } from "ethers";
import { useState } from "react";
import getGlipWallet from '../constants/croakWallet';

const NFTItem = (props) => {
    
    const [inputValue, setInputValue] = useState('');
    
    const transferNFT = async (inputValue) => {
        console.log(erc20_rw)
        const tx = await erc20_rw.populateTransaction['transfer'](
            inputValue,
            ethers.utils.parseUnits("1"));
        let glipWallet = await getGlipWallet();
        console.log('glipWallet', glipWallet);
        let signer = await glipWallet.getSigner();
        let signedTransaction = await signer.signTransaction(tx);
        console.log('tx bitches', signedTransaction);
    }
    
    return (
        <li>
          <div style={{display:'flex', justifyContent: 'space-around'}}>
            <div>{props.object.id}</div>
            <div>{props.object.name}</div>
            <div>{props.object.supply}</div>
            <div>
              <input type="text"
                     id="lname"
                     name="lname"
                     value={inputValue}
                     onChange={evt => setInputValue(
                         evt.target.value)}
              >
              </input>
            </div>
            <div>
              <button onClick={()=>transferNFT(inputValue)}>
                Transfer Yo
              </button>
            </div>
          </div>
        </li>
    );
}


const ListNFTComponent = (props) => {
    
    return (
        <div style={{color: 'white'}}>
          <ul>
            {Object.keys(props.nftList).map(function(key){
                let object = props.nftList[key]
                console.log('object', object);
                return (
                    <NFTItem object={object} key={key} />
                );
            })}
          </ul>
        </div>
    );    
}

export default ListNFTComponent;
