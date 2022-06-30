import { useEffect, useState } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Button, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import * as anchor from "@project-serum/anchor";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { useWallet } from "@solana/wallet-adapter-react";

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from "../candy-machine";
//@ts-ignore
import NumericInput from 'react-numeric-input';
import { useDispatch, useSelector } from 'react-redux';
import { getAddress, getChainId, getProvider } from "../store/reducers";
import '../assets/scss/mint.scss';
import thumbnail from '../assets/images/bg/about5.png';

const CounterText = styled.span``; // add your styles here

const MintContainer = styled.div``; // add your styles here


export interface HomeProps {
  candyMachineId: anchor.web3.PublicKey;
  config: anchor.web3.PublicKey;
  connection: anchor.web3.Connection;
  startDate: number;
  treasury: anchor.web3.PublicKey;
  txTimeout: number;
}

const Mint = (props: HomeProps) => {
  const [balance, setBalance] = useState<number>();
  const [isActive, setIsActive] = useState(false); // true when countdown completes
  const [isSoldOut, setIsSoldOut] = useState(false); // true when items remaining is zero
  const [isMinting, setIsMinting] = useState(false); // true when user got to press MINT
  const [alertState, setAlertState] = useState<AlertState>({
    open: false,
    message: "",
    severity: undefined,
  });

  const [amount, setAmount] = useState(1);
  const price = 0.02;
  const maxAmount = 20;

  const [startDate, setStartDate] = useState(new Date(props.startDate));

  const wallet = useWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet.connected && candyMachine?.program && wallet.publicKey) {
        const mintTxId = await mintOneToken(
          candyMachine,
          props.config,
          wallet.publicKey,
          props.treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          props.txTimeout,
          props.connection,
          "singleGossip",
          false
        );

        if (!status?.err) {
          const anchorWallet = {
            publicKey: wallet.publicKey,
            signAllTransactions: wallet.signAllTransactions,
            signTransaction: wallet.signTransaction,
          } as anchor.Wallet;

          const { candyMachine, goLiveDate, itemsRemaining, itemsAvailable, itemsRedeemed } =
            await getCandyMachineState(
              anchorWallet,
              props.candyMachineId,
              props.connection
            );

          setAlertState({
            open: true,
            message: `Congratulations! Mint succeeded, Token Number: ${itemsRedeemed}`,
            severity: "success",
          });
        } else {
          setAlertState({
            open: true,
            message: "Mint failed! Please try again!",
            severity: "error",
          });
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || "Minting failed! Please try again!";
      if (!error.msg) {
        if (error.message.indexOf("0x138")) {
        } else if (error.message.indexOf("0x137")) {
          message = `SOLD OUT!`;
        } else if (error.message.indexOf("0x135")) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
          setIsSoldOut(true);
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      setAlertState({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setIsMinting(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.signAllTransactions ||
        !wallet.signTransaction
      ) {
        return;
      }

      const anchorWallet = {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      } as anchor.Wallet;

      const { candyMachine, goLiveDate, itemsRemaining, itemsAvailable, itemsRedeemed } =
        await getCandyMachineState(
          anchorWallet,
          props.candyMachineId,
          props.connection
        );

      setIsSoldOut(itemsRemaining === 0);
      setStartDate(goLiveDate);
      setCandyMachine(candyMachine);
    })();
  }, [wallet, props.candyMachineId, props.connection]);

  return (
    <>
      <div className="mint-wrapper">
        <div className="side-section">
          <img src={thumbnail} alt="thumbnail" className="thumbnail" />
        </div>
        <div className="mint-container" >
          <div className="title-wrapper">
            <h4>Welcome to the</h4>
            <h3>Mint machine</h3>
            <p>(NOT LIKE THE PLANT BUT ALL ARE GUARANTEED FRESH)</p>
          </div>
          {
            wallet.connected && (
              <>
                <div className="mint-section">
                  <NumericInput
                    value={amount}
                    precision={0}
                    size={6}
                    step={1}
                    mobile={true}
                    max={maxAmount}
                    min={1}
                    onChange={(value: any) => {
                      setAmount(value)
                    }}
                    style={{
                      wrap: {
                        background: 'transparent',
                        boxShadow: '0 0 1px 1px #999 inset, 1px 1px 5px -1px #000',
                        padding: '2px 2.26ex 2px 2px',
                        borderRadius: '6px 3px 3px 6px',
                        fontSize: 32
                      },
                      input: {
                        borderRadius: '4px 2px 2px 4px',
                        color: 'white',
                        padding: '0.1ex 1ex',
                        border: 'none',
                        outline: 'none',
                        marginRight: 4,
                        display: 'block',
                        fontWeight: 100,
                        background: 'transparent',
                        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)'
                      },
                      arrowUp: {
                        borderBottomColor: 'rgba(66, 54, 0, 0.63)',
                        color: 'white'
                      },
                      arrowDown: {
                        borderTopColor: 'rgba(66, 54, 0, 0.63)',
                        color: 'white'
                      }
                    }} />
                  <MintContainer>
                    {wallet.connected && (
                      <button
                        disabled={isSoldOut || isMinting || !isActive}
                        onClick={onMint}
                        type="button"
                        className="btn-mint"
                      >
                        {isSoldOut ? (
                          "SOLD OUT"
                        ) : isActive ? (
                          isMinting ? (
                            <CircularProgress />
                          ) : (
                            "MINT"
                          )
                        ) : (
                          <Countdown
                            date={startDate}
                            onMount={({ completed }) => completed && setIsActive(true)}
                            onComplete={() => setIsActive(true)}
                            renderer={renderCounter}
                          />
                        )}
                      </button>
                    )}
                  </MintContainer>

                  <Snackbar
                    open={alertState.open}
                    autoHideDuration={6000}
                    onClose={() => setAlertState({ ...alertState, open: false })}
                  >
                    <Alert
                      onClose={() => setAlertState({ ...alertState, open: false })}
                      severity={alertState.severity}
                    >
                      {alertState.message}
                    </Alert>
                  </Snackbar>

                </div>
              </>
            )
          }
        </div>
      </div>
    </>

  );
};

interface AlertState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
}

const renderCounter = ({ days, hours, minutes, seconds, completed }: any) => {
  return (
    <CounterText>
      {hours} hours, {minutes} minutes, {seconds} seconds
    </CounterText>
  );
};

export default Mint;
