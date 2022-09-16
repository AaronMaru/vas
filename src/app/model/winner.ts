import { Campaign } from "./campaigns/Campaign";
import { ItemDetail } from "./items/item-detail";


export class Winner {
    id?: number;
    campaign: Campaign;
    customerId: string;
    itemDetail: ItemDetail;
    winDate: Date;
    branch: string;
    transactionType: string;
    status: string;
    rewardRemittance: string;
}
