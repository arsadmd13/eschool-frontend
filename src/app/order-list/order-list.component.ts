import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { CheckoutService } from '../services/checkout/checkout.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  @ViewChild('orderTable', {static: true}) orderTable: ElementRef;
  @ViewChild('orderTableMainContainer', {static: true}) orderTableMainContainer: ElementRef;

  msg: string;
  userId: string;
  username: string;
  role: string;

  orders = []

  constructor(private route: ActivatedRoute, public checkoutService: CheckoutService) { 
    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('userid');
    this.username = sessionStorage.getItem('username');

    if(this.role !== "2"){
      location.href = "/"
    }

    const data = {
      secTkn: sessionStorage.getItem('jwtToken')
    }    

    this.checkoutService.readall(data).subscribe(
      (res: any) => {
        if(res.status === 200) {
          this.orders = res.orders;
        } else if(res.status === 404) {
          this.msg = "No Items Found!";
        } else {
          this.msg = res.message;
        }
      }, (error) => {
        this.msg = "We hit a road block while processing your request!"
      }
    );

  }

  ngOnInit(): void {
  }

  public downloadAsPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.orderTable.nativeElement;

    //doc.fromHTML(pdfTable.innerHTML, 15, 15);

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf');
  }

  exportAsPDF()
    {
        let data = document.getElementById('orderTable'); 
        console.log(data);
        
        html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')  
        console.log(contentDataURL);
        
        let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in landscape mode
        // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 15, 50);  
        pdf.save('Filename.pdf');   
      }); 
    }

    generatePdf(){
      var docDefinition = {
        content: [
          {
            layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ '*', 'auto', 100, '*' ],
      
              body: [
                [ 'First', 'Second', 'Third', 'The last one' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
              ]
            }
          }
        ]
      };
      pdfMake.createPdf(docDefinition).open();
     }

}
