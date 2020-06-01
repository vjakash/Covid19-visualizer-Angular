import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
name:'stateFilter'
})
export class SearchStatePipe implements PipeTransform{
    transform(topic:any,searchTerm:string,id:string){
        if(!topic||!searchTerm){
            return topic;
        }
        else if(id=='state'){
            return topic.filter(topice=>topice[id].toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1);
        }
        else{
            return topic.filter(topice=>topice[0].toLowerCase().indexOf(searchTerm.toLowerCase()) !==-1);
        }
        
        
    }
}