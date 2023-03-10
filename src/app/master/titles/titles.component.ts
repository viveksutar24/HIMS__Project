import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

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

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

      this.api.delete("titles/" + id).subscribe((result: any) => {
        this.load()
      })
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })


  }

  submit(data: any) {
    if (this.id == 0) {


      this.api.post("titles", data).subscribe((result: any) => {
        console.log(result);
        this.load()
      })
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your Data has been saved',
        showConfirmButton: false,
        timer: 1500
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
