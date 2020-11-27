export class PCSetupEntry {
    id: string;
    partName: string;
    partDetail: string;
    partPurchaseLink: string;

    constructor(name: string, detail: string, buyLink: string, id: string = null) {
        this.partName = name;
        this.partDetail = detail;
        this.partPurchaseLink = buyLink;
        this.id = id;
    }
}
