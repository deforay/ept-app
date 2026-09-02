import { Injectable } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private file: File) { }

  // Returns the promise so callers can sequence directory creation; creating a
  // child directory fails if its parent does not exist yet.
  createDirectory(pathName:string,dirName:string): Promise<any> {
    return this.file.createDir(pathName,dirName, false).catch(err => {
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
