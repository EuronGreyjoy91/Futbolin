import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noAvatar'
})

export class NoAvatarPipe implements PipeTransform {
    transform(value: any): string {
        if(value != null && value != undefined && value != "")
            return `https://futbolinwebfront.herokuapp.com/files/${value}`;
            //return `http://localhost:8080/files/${value}`;
        else
            return "assets/img/no-user.png";
    }
}
