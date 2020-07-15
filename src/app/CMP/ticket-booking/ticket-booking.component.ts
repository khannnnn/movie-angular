import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { APIsService } from 'src/app/Services/apis.service';

@Component({
  selector: 'app-ticket-booking',
  templateUrl: './ticket-booking.component.html',
  styleUrls: ['./ticket-booking.component.scss']
})
export class TicketBookingComponent implements OnInit {
  showSelected: any = "Show 1";
  showList: any = [];
  bookTicketHideShow: any = 1;
  bookedTickedTotal: any = [];
  platinamData: any = [];
  goldData: any = [];
  silverData: any = [];

  constructor(private fb: FormBuilder, private APIRequ: APIsService) { }
  ticketBooking: FormGroup = this.fb.group({
    show: ['1'],
    gold: new FormArray([]),
    platinum: new FormArray([]),
    silver: new FormArray([])
  });

  ngOnInit() {
    this.showSelect()
  }

  showPlatinam(url) {
    this.APIRequ.showPlatinam(url).subscribe((data) => {
      console.log(data);
      this.platinamData = data;
    });
  }

  showGold(url) {
    this.APIRequ.showGold(url).subscribe((data) => {
      console.log(data);
      this.goldData = data;
    });
  }

  showSilver(url) {
    this.APIRequ.showSilver(url).subscribe((data) => {
      console.log(data);
      this.silverData = data;
      this.showSelected = [{ "Gold": this.goldData, "Silver": this.silverData, "Platinum": this.platinamData }];
    });
  }

  showSelect() {
    console.log(this.ticketBooking.controls.show.value);
    let show = this.ticketBooking.controls.show.value;
    if (show == 2) {
      this.showPlatinam('http://localhost:3000/Platinum2');
      this.showGold('http://localhost:3000/Gold2');
      this.showSilver('http://localhost:3000/Silver2');
    } else if (show == 3) {
      this.showPlatinam('http://localhost:3000/Platinum3');
      this.showGold('http://localhost:3000/Gold3');
      this.showSilver('http://localhost:3000/Silver3');

    } else {
      this.showPlatinam('http://localhost:3000/Platinum1');
      this.showGold('http://localhost:3000/Gold1');
      this.showSilver('http://localhost:3000/Silver1');
    }
  }

  onCheckboxChange(name, e) {
    console.log(e)
    let checkArray: FormArray
    if (name == 1) {
      checkArray = this.ticketBooking.get('gold') as FormArray;
    } else if (name == 2) {
      checkArray = this.ticketBooking.get('platinum') as FormArray;
    } else if (name == 3) {
      checkArray = this.ticketBooking.get('silver') as FormArray;
    }

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  tickedDetails() {
    this.bookTicketHideShow = this.bookTicketHideShow == 1 ? 2 : 1;
    console.log(this.bookTicketHideShow)
    let data = this.ticketBooking.value;
    let gold = parseFloat(data.gold.length) * 280;
    let platinum = parseFloat(data.platinum.length) * 320;
    let silver = parseFloat(data.silver.length) * 240;
    console.log(gold, platinum, silver)
    let total = gold + platinum + silver;
    let serviceTex = total * 14 / 100;
    let swachBharatTex = total * 0.5 / 100;
    let krishiKalyanTex = total * 0.5 / 100;
    let grandTotal = total + serviceTex + swachBharatTex + krishiKalyanTex;
    this.bookedTickedTotal = [];
    this.bookedTickedTotal.push({
      "show": data.show,
      "total": total,
      "serviceTex": serviceTex,
      "swachBharatTex": swachBharatTex,
      "krishiKalyanTex": krishiKalyanTex,
      "grandTotal": grandTotal
    });
  }

  tickedBook() {
    this.bookTicketHideShow = 3;
    console.log(this.ticketBooking.value)
    let data = this.ticketBooking.value;
    console.log(this.bookedTickedTotal)
    let gold = data.gold;
    let silver = data.silver;
    let platinam = data.platinum;
    gold.map((item) => {
      this.bookShow('Gold' + data.show, item, "B" + item)
    })

    silver.map((item) => {
      this.bookShow('Silver' + data.show, item, "C" + item)
    })

    platinam.map((item) => {
      this.bookShow('Platinum' + data.show, item, "A" + item)
    })
  }

  bookShow(show, item, sheetName) {
    let url = `http://localhost:3000/${show}/${item}`;
    let input = {
      "sheetName": sheetName,
      "status": 1,
      "category": 1
    }
    this.APIRequ.bookShow(url, input).subscribe((data) => {
      console.log(data);
    });
  }

  homePart() {
    this.bookTicketHideShow = 1;
    this.showSelect()
  }
}
