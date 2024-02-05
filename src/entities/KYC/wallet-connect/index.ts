import {createEffect, createEvent, sample} from "effector";
import {
    addOwnerAddr,
} from "../../user";
import {MetamaskWallet} from "../../../services/wallet/metamask-wallet";
import {performTransition} from "../controller";


//Connect wallet
export const connectWallet = createEvent()

const wallet = new MetamaskWallet()

export const connectWalletFx = createEffect(async () => {
    const isMobile = window.innerWidth < 1366
    try {
        await wallet.connect()
        return await wallet.getAddr()
    } catch (e: any) {
        console.error(e)
        switch (e.code === 4200) {
            case isMobile:
                window.open('https://metamask.app.link/dapp/kyc.systems/')
                break

            case !isMobile:
                window.open('https://metamask.io/')
                break
        }
    }
})

sample({
    clock: connectWallet,
    target: connectWalletFx
})

export const saveOwnerAddrFx = createEffect((p: any) => {
    addOwnerAddr(p)
})

sample({
    clock: connectWalletFx.doneData,
    target: saveOwnerAddrFx,
})