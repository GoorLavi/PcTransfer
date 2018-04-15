export class ExplorerElement {
    constructor(data){

        Object.assign(this, data);
    }

    getType() {
        this.type;
    }
}

export class Folder extends ExplorerElement{

    constructor(data){
        super(data);

     }

     getFiles() {
         return this.files;
     }
}

export class File extends ExplorerElement {
 constructor(data){
    super(data);

 }

 get size() {

 }
}

