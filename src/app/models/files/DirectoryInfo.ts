export class DirectoryInfo {
    totalCapacity: number;
    availableCapacity: number;
    usedCapacity: number;

    constructor() {
        this.totalCapacity = 0;
        this.availableCapacity = 0;
        this.usedCapacity = 0;
    }
}
