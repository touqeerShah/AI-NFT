"use client"; // this is a client component

import styles from '../styles/header.module.css'
import { ellipseAddress } from '../../lib/utilities'



export default function Header(props:any) {



  return (
  <><div className={styles.header}>
  <a href="#default" className={styles.logo}>TK-AI-NFT</a>
  <div className= {styles.header_right}>
    {props?.web3Provider ? (
          <button className= {styles.active} type="button" onClick={props.disconnect}>
            Disconnect
          </button>
        ) : (
          <button className= {styles.active} type="button" onClick={props.connect}>
            Connect
          </button>
        )}
    <>  {props?.address && (
        

            <button className= {styles.button_6} type="button" onClick={props.connect}>
            {/* Network:
            {props?.chainData?.name}  */}
                       {ellipseAddress(props.address)}

          </button>
        )}</>
        
  </div>
</div>
</>
  );
}
