import {Component, OnInit} from '@angular/core';
import {addAnimation} from '../../models/Animations';

@Component({
    selector: 'app-about',
    animations: [addAnimation],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    text = 'Senior RPI Student majoring in Computer Science & Computer Systems Engineering. I’m an experienced iOS/watchOS/macOS developer with expertise in Swift & Objective-C. I have published an iOS app on the App Store, and successfully completed two iOS engineering internships. I’m also a graphic designer with 3+ years of graphic design experience, currently a graphic designer on the Rensselaer Union marketing team. ';

    constructor() {
    }

    ngOnInit(): void {
    }

}
