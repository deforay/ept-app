import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private file: File) { }

  createDirectory(pathName:string,dirName:string){
    this.file.createDir(pathName,dirName, false).then(response => {
      //console.log(response);
     return  response;
      }).catch(err => {
        return JSON.stringify(err);
      });
  }
  checkDirectory(pathName:string,dirName:string){
    this.file.checkDir(pathName,dirName).then(response => {
      return  response;
    }).catch(err => {
      return JSON.stringify(err);
    });
  }
}
