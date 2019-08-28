import {SeraphIDIssuerContract, DIDNetwork} from '@sbc/seraph-id-sdk';

/**
 * Helper class to resolve a given did string
 */
export default class Resolver {

    public static async resolve(did: string): Promise<string>{
        var splitDID = did.split(":");
        if (splitDID[3].length == 40){
            // script hash -> on chain resolution
            const scriptHash = splitDID[3];
            const network = NetworkEnvironment.StringToDIDNetwork(splitDID[2]);
            const rpcURL = NetworkEnvironment.config.get(splitDID[2]);
            if (rpcURL != undefined){
                try {
                    const publicKey = await this.getPublicKey(scriptHash, network, rpcURL)
                    return this.GenerateDDO(scriptHash, network, publicKey);
                } catch {
                    throw new Error("Unable to connect to SeraphID smart contract at " + scriptHash);
                }
            }
            else {
                throw new Error("RPC URL undefined");
            }
        } else {
           throw new Error("DID string does not contain a valid smart contract script hash");
        }
    }

    private static async getPublicKey(scriptHash: string, network: DIDNetwork, rpcurl: string): Promise<string> {
        var contract = new SeraphIDIssuerContract(scriptHash, rpcurl, "", network);
        return contract.getIssuerPublicKey();
    }

    private static GenerateDDO(scriptHash: string, network: DIDNetwork, publicKey: string): string {
        const DDO: DIDDocument = new DIDDocument(
            "did:neoid:" + network + ":" + scriptHash,
            undefined,
            [{
                type: "EcdsaSecp256r1Authentication2019",
                publicKey: [
                    "did:neoid:" + network + ":" + scriptHash + "#keys-1"
                ]
            }],
            [{
                id: "did:neoid:" + network + ":" + scriptHash + "#keys-1",
                type: "EcdsaSecp256r1VerificationKey2019",
                controller: "did:neoid:" + network + ":" + scriptHash,
                publicKeyHex: publicKey
            }],
            "https://w3id.org/did/v0.11"
        );
        const json = JSON.stringify(DDO);
        return json.replace("context","@context");
    }
}

/**
 * Helper class to retrieve node rpc url depending on network
 * All values can be overridden with environment variables
 */
class NetworkEnvironment {

    private static defaultMain = "https://seed6.cityofzion.io:443";
    private static defaultTest = "https://test2.cityofzion.io:443";
    private static defaultPriv = "https://demo.seraphid.io/rpc"; // seraph-id demo private net

    public static config: Map<string, string> = new Map([
        ["main", process.env["uniresolver_driver_did_neoid_rpcUrlMain"] || NetworkEnvironment.defaultMain],
        ["test", process.env["uniresolver_driver_did_neoid_rpcUrlTest"] || NetworkEnvironment.defaultTest],
        ["priv", process.env["uniresolver_driver_did_neoid_rpcUrlPriv"] || NetworkEnvironment.defaultPriv]
    ]);

    public static StringToDIDNetwork(network: string): DIDNetwork{
        switch(network.toLowerCase()){
            case "main":
                return DIDNetwork.MainNet;
            case "test":
                return DIDNetwork.TestNet;
            case "priv":
                return DIDNetwork.PrivateNet;
            default:
                throw new Error("Unsupported network: " + network);
        }
    }
}

class DIDDocument {
    public id: string;
    public service: Array<object> | undefined;
    public authentication: Array<object>;
    public publicKey: Array<object>;
    public context: string;

    constructor(id: string, service: Array<object> | undefined, authentication: Array<object>, publicKey: Array<object>, context: string){
        this.id = id;
        this.service = service;
        this.authentication = authentication;
        this.publicKey = publicKey;
        this.context = context;
    }
}
