import styled from "styled-components";
import { WalletDialogButton } from '@solana/wallet-adapter-material-ui';
import { useWallet } from "@solana/wallet-adapter-react";
import { shortenAddress } from "../candy-machine";
import '../assets/scss/connectWallet.scss';
const ConnectButton = () => {
  const ConnectButton = styled(WalletDialogButton)``;
  const wallet = useWallet();

  return (
    wallet.publicKey ? (
      <button className="btn btn-disconnect">
        <span>Disconnect</span>
        {/* <span className="wallet-address">{shortenAddress(wallet.publicKey?.toBase58() || "")}</span> */}
      </button>
    ) : (
      <ConnectButton>Connect Wallet</ConnectButton>
    )
  )
}

export default ConnectButton;