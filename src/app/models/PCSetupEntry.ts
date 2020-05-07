export class PCSetupEntry {
    partName: string;
    partDetail: string;
    partPurchaseLink: string;

    constructor(name: string, detail: string, buyLink: string) {
        this.partName = name;
        this.partDetail = detail;
        this.partPurchaseLink = buyLink;
    }
}
