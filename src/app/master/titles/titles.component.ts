import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.css']
})
export class TitlesComponent implements OnInit {

  formdata: any;
  result: any;
  id = 0;

  constructor(private api: ApiService) { }


  ngOnInit(): void {


    this.load()
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required]))
    })

  }

  load() {
    this.id = 0;
    this.api.get("titles").subscribe((result: any) => {
      console.log(result);
      this.result = result.data;
    })
  }


  edit(id: any) {
    this.id = id;
    this.api.get("titles/" + id).subscribe((result: any) => {
      this.formdata = new FormGroup({
        name: new FormControl(result.data.name, Validators.compose([Validators.required]))
      })
    })
  }

  delete(id: any) {
    if (confirm("Sure To Delete")) {
      this.api.delete("titles/" + id).subscribe((result: any) => {
        this.load()
      })
    }
  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post("titles", data).subscribe((result: any) => {
        console.log(result);
        this.load()
      })
    }
    else (

      this.api.put("titles/" + this.id, data).subscribe((result: any) => {
        console.log(result);
        this.load()
      })
    )
  }

}
