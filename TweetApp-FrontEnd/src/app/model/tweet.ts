import { Reply } from "./reply";

export class Tweet {

    id: string;
    description: string;
    userId: string;
    createdOn: string;
    likes : Array<String>;
    replies : Array<Reply>;

    likesCount: Number;
    repliesCount: Number;
    likeStatus: Boolean; 


   
    constructor(id:string, description:string, userId:string, createdOn:string,
        likes:Array<String>, replies:Array<Reply>,  likesCount: Number, repliesCount: Number,
        likeStatus: Boolean){
        this.id = id;
        this.description = description;
        this.userId = userId;
        this.createdOn = createdOn;
        this.likes = likes;      
        this.replies = replies; 
        this.likesCount=likesCount;
        this.repliesCount=repliesCount;
        this.likeStatus=likeStatus;      
    }

}
