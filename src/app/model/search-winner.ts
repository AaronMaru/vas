import { Branch } from "./campaigns/branch";


export class SearchWinner {
    id?: number;
    fromDate: Date;
    toDate: Date;
    branches: Branch[];
    type: string;
    term: string;
}
