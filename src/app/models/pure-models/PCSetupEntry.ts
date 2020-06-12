export class PCSetupEntry {
    id: number;
    partName: string;
    partDetail: string;
    partPurchaseLink: string;

    constructor(name: string, detail: string, buyLink: string, id: number = null) {
        this.partName = name;
        this.partDetail = detail;
        this.partPurchaseLink = buyLink;
        this.id = id;
    }
}
