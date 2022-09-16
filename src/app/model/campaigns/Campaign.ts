import { Item } from "../items/item";
import { Agent } from "./agent";
import { Branch } from "./branch";
import { Channel } from "./Channel";

export class Campaign {
    id?: number;
    name: string;
    item: Item;
    baseOn: string;
    branches: Branch[];
    estimateCustomer: number;
    transactionTypes: string[];
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    remark: string;
    fromAmount: number;
    toAmount: number;
    channel: Channel;
    status: String;
    agents: Agent[];
    forAmk: boolean;
    constructor(channel) {
        this.channel = channel;
    }
}
