import {metamask} from '../chain-sdk/src'
import {client} from './chain';

export function connectWallet() {
    const factory = metamask;

    if (!factory) {
        throw new Error(`Factory for wallet metamask not found.`);
    }

    return client.connect(factory())
}