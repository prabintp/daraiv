export interface Invoice {
    name: string;
    invoice_id: string;
    start_date:string;
    due_date:string;
    sub_total:string;
    line_items: Lineitems[];
    total:number;
    discount:number;
}

export interface Lineitems {
    item_id:string;
    quantity:string;
    rate:string;
    item_total:string;
}
