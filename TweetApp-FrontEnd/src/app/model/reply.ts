export class Reply {

    description: string;
    userName: string;
    createdOn: string;
     

    constructor(description:string, userName: string, createdOn:string){
        this.description = description;
        this.userName = userName;
        this.createdOn = createdOn;   
    }
}
