import { erc20_rw } from "../constants/erc20_rw"
import { ethers } from "ethers";
import { useState } from "react";

const ListNFTComponent = (props) => {

    const [inputValue, setInputValue] = useState('');
    
    const transferNFT = async () => {
        console.log(erc20_rw)
        const tx = await erc20_rw.populateTransaction['transfer'](
            "0x6203A4a2c3c58bEA165b72012303Dbd8FF938B1b",
            ethers.utils.parseUnits("1.23"));
        console.log('tx bitches', tx);
    }
    
    return (
        <div style={{color: 'white'}}>
            <ul>
                {props.nftList.map(function(object, i){
                    return (
                        <li key={i}>
                            <div style={{display:'flex', justifyContent: 'space-around'}}>
                                <div>{object.token.id}</div>
                                <div>{object.token.name}</div>
                                <div>{object.token.supply}</div>
                                <div>
                                    <input type="text"
                                           id="lname"
                                           name="lname"
                                           value={inputValue}
                                           onChange={
                                           evt => setInputValue(
                                               evt.target.value)}
                                    >
                                    </input>
                                </div>
                                <div>
                                    <button onClick={()=>transferNFT(inputValue)}>Transfer Yo</button>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}
export default ListNFTComponent;
