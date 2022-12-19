import {BigNumber, BigNumberish, providers, utils} from 'ethers';
import {TypedEmitter} from 'tiny-typed-emitter';
import {z} from 'zod';

const ethereumSignature = z
    .string()
    .refine((val) => utils.isHexString(val, 65));

export const WalletName = z.enum(['metamask', 'void']);
export type WalletName = z.infer<typeof WalletName>;

export const AbstractCredentials = z.object({
    signature: ethereumSignature,
    walletName: WalletName
})

export const SignatureCredentials = AbstractCredentials.extend({
    type: z.literal(2),
    msg: z.string(),
});
export type SignatureCredentials = z.infer<typeof SignatureCredentials>;

export const Credentials = SignatureCredentials;
export type Credentials = z.infer<typeof Credentials>;

export const Chain = z.enum(['eth']);
export type Chain = z.infer<typeof Chain>;
export interface IClientConnectedInfo {
    readonly chain: String;
}

export const ChainId = z.number()
export type ChainId = z.infer<typeof ChainId>;
export interface IWalletConnectedInfo {
    readonly chainId: number;
}

export const Network = z.object({
    name: z.string(),
    symbol: z.string(),
    chainId: z.number().int().positive(),
    rpcUrl: z.string().url(),
    blockExplorerUrl: z.string().url(),
    contracts: z.object({
        checker: z.string(),
    }),
});

export type Network = z.infer<typeof Network>;

export const NetworkConfig = z.object({eth: Network});

export type NetworkConfig = z.infer<typeof NetworkConfig>;

export interface IProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}

export class ProviderRpcError extends Error implements IProviderRpcError {
    code: number;
    data?: unknown;

    constructor(code: number, message: string, data?: unknown) {
        super(message);
        this.code = code;
        this.data = data;
    }
}

export interface WalletEvents {
    accountsChanged(address: string): void;

    chainChanged(chainId: number): void;

    error(err: IProviderRpcError): void;

    disconnect(): void;

    connect(connectInfo: IWalletConnectedInfo): void;
}

export type InjectedProvider = providers.ExternalProvider & { isCoinbase?: boolean };

export type EthereumProvider = providers.ExternalProvider
    & Partial<TypedEmitter<WalletEvents>>
    & { chainId?: string }
    & { providers?: InjectedProvider[] };

export interface MetamaskWindow extends Window {
    ethereum?: EthereumProvider;
}

export type Balance = BigNumber;
export type Balances = Record<Chain, Balance>;

const zero = BigInt(0);

function toBigInt(val: BigNumberish) {
    if (utils.isBytes(val)) {
        return BigInt(utils.hexlify(val));
    }
    // @ts-ignore
    return BigInt(val);
}

class NotImplementedError extends Error {
    constructor() {
        super('Not implemented');
        this.name = 'NotImplementedError';
    }
}

export class BigIntProxy implements BigNumber {
    public readonly _isBigNumber = true;

    private readonly _value: bigint;

    constructor(val: BigNumberish) {
        this._value = toBigInt(val);
    }

    public get _hex() {
        return utils.hexlify(this._value);
    }

    fromTwos(value: number): BigNumber {
        throw new NotImplementedError();
    }

    toTwos(value: number): BigNumber {
        throw new NotImplementedError();
    }

    public abs() {
        const abs = this.isNegative() ? -this._value : this._value;
        return new BigIntProxy(abs);
    }

    public add(other: BigNumberish) {
        return new BigIntProxy(this._value + toBigInt(other));
    }

    public sub(other: BigNumberish) {
        return new BigIntProxy(this._value - toBigInt(other));
    }

    public mul(other: BigNumberish) {
        return new BigIntProxy(this._value * toBigInt(other));
    }

    public div(other: BigNumberish) {
        return new BigIntProxy(this._value / toBigInt(other));
    }

    public mod(other: BigNumberish) {
        return new BigIntProxy(this._value % toBigInt(other));
    }

    public pow(other: BigNumberish) {
        return new BigIntProxy(this._value ** toBigInt(other));
    }

    public and(other: BigNumberish) {
        return new BigIntProxy(this._value & toBigInt(other));
    }

    public or(other: BigNumberish) {
        return new BigIntProxy(this._value | toBigInt(other));
    }

    public xor(other: BigNumberish) {
        return new BigIntProxy(this._value ^ toBigInt(other));
    }

    public mask(value: number): BigNumber {
        throw new NotImplementedError();
    }

    public shl(value: number) {
        return new BigIntProxy(this._value << toBigInt(value));
    }

    public shr(value: number) {
        return new BigIntProxy(this._value >> toBigInt(value));
    }

    public gt(other: BigNumberish) {
        return this._value > toBigInt(other);
    }

    public gte(other: BigNumberish) {
        return this._value >= toBigInt(other);
    }

    public lt(other: BigNumberish) {
        return this._value < toBigInt(other);
    }

    public lte(other: BigNumberish) {
        return this._value <= toBigInt(other);
    }

    public eq(other: BigNumberish) {
        return this._value === toBigInt(other);
    }

    public isNegative() {
        return this._value < zero;
    }

    public isZero() {
        return this._value === zero;
    }

    public toNumber() {
        return Number(this._value);
    }

    public toBigInt() {
        return this._value;
    }

    public toString() {
        return this._value.toString();
    }

    public toHexString() {
        return this._hex;
    }

    public toJSON(key?: string) {
        return this.toString();
    }
}

export function bigint(value: BigNumberish) {
    if (typeof BigInt !== 'undefined') {
        return new BigIntProxy(value);
    }
    return BigNumber.from(value);
}