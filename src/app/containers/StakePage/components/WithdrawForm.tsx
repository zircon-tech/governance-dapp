import React, { FormEvent, useCallback, useState } from 'react';
import { handleNumberInput, numberFromWei, toWei } from 'utils/helpers';
import { ContractCallResponse } from 'app/hooks/useContractCall';
import { network } from '../../BlockChainProvider/network';
import { useAccount } from 'app/hooks/useAccount';
import moment from 'moment-timezone';
import attention from 'assets/images/icon-rejected.svg';

interface Props {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  amount: string;
  fee: string;
  withdrawAmount: number;
  until: number;
  onChangeAmount: (value: number) => void;
  sovBalanceOf: ContractCallResponse;
  balanceOf: ContractCallResponse;
  isValid: boolean;
  votePower?: number;
  onCloseModal: () => void;
}

export function WithdrawForm(props: Props) {
  const account = useAccount();
  const [forfeitWithdraw, setForfeitWithdraw] = useState<number>(0);
  const [forfeitPercent, setForfeitPercent] = useState<number>(0);
  const [loadingWithdraw, setLoadingWithdraw] = useState(false);
  const [showConfirmForm, setShowConfirmForm] = useState(false);

  const modalTitle = showConfirmForm
    ? 'Are you sure you want to unstake?'
    : 'Unstake FISH';

  const getEvent = useCallback(
    async amount => {
      setLoadingWithdraw(true);
      await network
        .call(
          'staking',
          'getWithdrawAmounts',
          [toWei(amount), Number(props.until)],
          account,
        )
        .then(res => {
          setForfeitWithdraw(res[1]);
          setForfeitPercent(
            Number(((Number(res[1]) / Number(toWei(amount))) * 100).toFixed(1)),
          );
          setLoadingWithdraw(false);
        })
        .catch(error => {
          setLoadingWithdraw(false);
          return false;
        });
    },
    [account, props.until],
  );

  return (
    <>
      <h3 className="text-center mb-10 leading-10 text-3xl">{modalTitle}</h3>
      <form onSubmit={props.handleSubmit}>
        {showConfirmForm ? (
          <>
            <div className="mb-9 md:px-9 tracking-normal">
              <div className="mb-4">
                <img src={attention} alt="attention" className="m-auto" />
              </div>
              <p className="text-red text-center">
                This stake is not scheduled to unlock until:
              </p>
              <div className="text-center text-lg font-semibold mb-8">
                {moment
                  .tz(new Date(parseInt(props.until.toString()) * 1e3), 'GMT')
                  .format('DD/MM/YYYY - h:mm:ss a z')}
              </div>

              <p className="text-red text-center">
                Unstaking now invokes a slashing penalty that will cost you:
              </p>
              <div className="text-center text-lg font-semibold">
                {numberFromWei(forfeitWithdraw).toFixed(2) + ' FISH'}
              </div>
            </div>

            <div className="grid grid-rows-1 grid-flow-col gap-4">
              <button
                type="submit"
                className="uppercase w-full text-black bg-gold text-xl font-extrabold px-4 hover:bg-opacity-80 py-2 rounded-lg transition duration-500 ease-in-out"
              >
                YES, UNSTAKE
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmForm(false);
                  props.onCloseModal();
                }}
                className="border border-gold rounded-lg text-gold uppercase w-full text-xl font-extrabold px-4 py-2 hover:bg-gold hover:bg-opacity-40 transition duration-500 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-9 md:px-9 tracking-normal">
              <label
                className="leading-4 block text-theme-white text-md font-medium mb-2"
                htmlFor="amount"
              >
                Amount Currently Staked:
              </label>
              <div className="flex space-x-4 relative">
                <input
                  readOnly
                  className="appearance-none border border-theme-white text-md font-semibold text-center h-10 rounded-lg w-full py-2 px-14 bg-black text-theme-white tracking-normal focus:outline-none focus:shadow-outline"
                  id="amount"
                  type="text"
                  defaultValue={props.amount}
                />
                <span className="text-theme-white text-md font-semibold absolute top-3 right-5 leading-4">
                  FISH
                </span>
              </div>

              <label
                className="leading-4 block text-theme-white text-md font-medium mb-2 mt-8"
                htmlFor="amountAdd"
              >
                Amount to Unstake:
              </label>
              <div className="flex space-x-4 relative">
                <input
                  className="appearance-none border text-md font-semibold text-center h-10 rounded-lg w-full py-2 px-14 bg-theme-white text-black tracking-normal focus:outline-none focus:shadow-outline"
                  id="amountAdd"
                  type="text"
                  placeholder="Enter amount"
                  value={props.withdrawAmount}
                  onChange={e => {
                    props.onChangeAmount(handleNumberInput(e));
                    getEvent(handleNumberInput(e));
                  }}
                />
                <span className="text-black text-md font-semibold absolute top-3 right-5 leading-4">
                  FISH
                </span>
              </div>
              <div className="flex rounded border border-theme-blue mt-4">
                <div
                  onClick={() => {
                    let num = (Number(props.amount) / 10).toFixed(2);
                    props.onChangeAmount(Number(num));
                    getEvent(Number(num));
                  }}
                  className="cursor-pointer transition duration-300 ease-in-out hover:bg-theme-blue hover:bg-opacity-30 w-1/5 py-1 text-center border-r text-sm text-theme-blue tracking-tighter border-theme-blue"
                >
                  10%
                </div>
                <div
                  onClick={() => {
                    let num = (Number(props.amount) / 4).toFixed(2);
                    props.onChangeAmount(Number(num));
                    getEvent(Number(num));
                  }}
                  className="cursor-pointer transition duration-300 ease-in-out hover:bg-theme-blue hover:bg-opacity-30 w-1/5 py-1 text-center border-r text-sm text-theme-blue tracking-tighter border-theme-blue"
                >
                  25%
                </div>
                <div
                  onClick={() => {
                    let num = (Number(props.amount) / 2).toFixed(2);
                    props.onChangeAmount(Number(num));
                    getEvent(Number(num));
                  }}
                  className="cursor-pointer transition duration-300 ease-in-out hover:bg-theme-blue hover:bg-opacity-30 w-1/5 py-1 text-center border-r text-sm text-theme-blue tracking-tighter border-theme-blue"
                >
                  50%
                </div>
                <div
                  onClick={() => {
                    let num = ((Number(props.amount) / 4) * 3).toFixed(2);
                    props.onChangeAmount(Number(num));
                    getEvent(Number(num));
                  }}
                  className="cursor-pointer transition duration-300 ease-in-out hover:bg-theme-blue hover:bg-opacity-30 w-1/5 py-1 text-center border-r text-sm text-theme-blue tracking-tighter border-theme-blue"
                >
                  75%
                </div>
                <div
                  onClick={() => {
                    props.onChangeAmount(Number(props.amount));
                    getEvent(Number(props.amount));
                  }}
                  className="cursor-pointer transition duration-300 ease-in-out hover:bg-theme-blue hover:bg-opacity-30 w-1/5 py-1 text-center text-sm text-theme-blue tracking-tighter"
                >
                  100%
                </div>
              </div>
              {Number(props.until) > Math.round(new Date().getTime() / 1e3) && (
                <>
                  <label
                    className="block text-theme-white text-md font-medium mb-2 mt-8"
                    htmlFor="unstake"
                  >
                    Early unstake forfeit:
                  </label>
                  <div className="flex space-x-4">
                    <input
                      readOnly
                      className={`border text-theme-white appearance-none text-md font-semibold text-center h-10 rounded-lg w-full py-2 px-3 bg-transparent tracking-normal focus:outline-none focus:shadow-outline ${
                        loadingWithdraw && 'skeleton'
                      }`}
                      id="unstake"
                      type="text"
                      placeholder="0"
                      value={
                        forfeitPercent +
                        '% ≈ ' +
                        numberFromWei(forfeitWithdraw).toFixed(2) +
                        ' FISH'
                      }
                    />
                  </div>
                </>
              )}

              <p className="block text-theme-white text-md font-light mb-2 mt-7">
                Tx Fee: {props.fee} rBTC
              </p>
            </div>

            <div className="grid grid-rows-1 grid-flow-col gap-4">
              {Number(props.until) > Math.round(new Date().getTime() / 1e3) ? (
                <button
                  type="button"
                  className={`uppercase w-full text-black bg-gold text-xl font-extrabold px-4 hover:bg-opacity-80 py-2 rounded-lg transition duration-500 ease-in-out
                  ${
                    !props.isValid &&
                    'opacity-50 cursor-not-allowed hover:bg-opacity-100'
                  }`}
                  disabled={!props.isValid}
                  onClick={e => {
                    e.preventDefault();
                    setShowConfirmForm(true);
                  }}
                >
                  Confirm
                </button>
              ) : (
                <button
                  type="submit"
                  className={`uppercase w-full text-black bg-gold text-xl font-extrabold px-4 hover:bg-opacity-80 py-2 rounded-lg transition duration-500 ease-in-out
                  ${
                    !props.isValid &&
                    'opacity-50 cursor-not-allowed hover:bg-opacity-100'
                  }`}
                  disabled={!props.isValid}
                >
                  Confirm
                </button>
              )}
              <button
                type="button"
                onClick={() => props.onCloseModal()}
                className="border border-gold rounded-lg text-gold uppercase w-full text-xl font-extrabold px-4 py-2 hover:bg-gold hover:bg-opacity-40 transition duration-500 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}
