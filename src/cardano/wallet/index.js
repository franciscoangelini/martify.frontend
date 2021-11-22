import Cardano from "../serialization-lib";
import { getTxUnspentOutput, valueToAssets } from "../transaction";
import { fromHex } from "../../utils";

export const getBalance = async () => {
  return await window.cardano.getBalance();
};

export const getCollateral = async () => {
  return await window.cardano.getCollateral();
};

export const getNetworkId = async () => {
  return await window.cardano.getNetworkId();
};

export const getOwnedAssets = async () => {
  const usedAddress = await getUsedAddress();
  const utxos = await getUtxos();

  const ownedAssets = utxos
    .map((utxo) => getTxUnspentOutput(utxo).output())
    .filter(
      (txOut) =>
        txOut.amount().multiasset() !== undefined &&
        txOut.address().to_bech32() === usedAddress.to_bech32()
    )
    .map((txOut) => valueToAssets(txOut.amount()))
    .flatMap((assets) =>
      assets
        .filter((asset) => asset.unit !== "lovelace")
        .map((asset) => asset.unit)
    );
  
  return [...new Set(ownedAssets)];
};

export const getUsedAddress = async () => {
  const usedAddresses = await window.cardano.getUsedAddresses();
  return Cardano.Instance.Address.from_bytes(fromHex(usedAddresses[0]));
};

export const getUtxos = async () => {
  return await window.cardano.getUtxos();
};

export const signTx = async (tx, partialSign = true) => {
  return await window.cardano.signTx(tx, partialSign);
};

export const submitTx = async (tx) => {
  return await window.cardano.submitTx(tx);
};

export const getWalletAddress = async () => {
  const usedAddresses = await window.cardano.getUsedAddresses();
  return Cardano.Instance.Address.from_bytes(fromHex(usedAddresses[0])).to_bech32();
};