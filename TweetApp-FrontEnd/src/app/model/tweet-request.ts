export class TweetRequest {

    description: string;
    userId: string;

    constructor(description:string, userId:string){
        this.description = description;
        this.userId = userId;      
    }
}
