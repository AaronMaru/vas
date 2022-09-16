export class Item {
    id?: number;
    name: string;
    remark: string;
    createdAt: number;
    constructor(id?) {
        this.id = id;
    }
}
