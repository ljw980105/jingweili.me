export class FileToBrowse {
    name: string;
    type: string;
    createdDate: Date;
    fileSize: number;

    // dummy constructor
    constructor(name: string) {
        this.name = name;
        this.type = '';
        this.createdDate = null;
        this.fileSize = 0;
    }
}
