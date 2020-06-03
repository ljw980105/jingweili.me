import {Component, OnInit} from '@angular/core';
import {GraphicProject} from '../../models/GraphicProject';
import {Title} from '@angular/platform-browser';
import {WidthBreakpointObserver} from '../../models/WidthBreakpointObserver';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-graphic-design',
    templateUrl: './graphic-design.component.html',
    styleUrls: ['./graphic-design.component.scss']
})
export class GraphicDesignComponent implements OnInit {
    projects: GraphicProject[] = [];
    imageURLToShow: string;
    hoveredIndex = 0;
    widthObserver: WidthBreakpointObserver;
    showRectangleImage = false;

    constructor(private titleService: Title, public apiService: ApiService) {
        this.titleService.setTitle('Graphic Design');
    }

    ngOnInit(): void {
        this.apiService.getGraphicsProjects()
            .subscribe(projects => this.projects = projects);
        this.widthObserver = new WidthBreakpointObserver(1000);
        this.showRectangleImage = window.innerWidth > 1000;
        this.imageURLToShow = this.imageURLFrom(0);

        this.widthObserver.moreThanWidth.subscribe(() => {
            this.showRectangleImage = true;
            this.imageURLToShow = this.imageURLFrom(this.hoveredIndex);
        });
        this.widthObserver.lessThanWidth.subscribe(() => {
            this.showRectangleImage = false;
            this.imageURLToShow = this.imageURLFrom(this.hoveredIndex);
        });
    }

    hoveredOnIndex(index: number) {
        this.imageURLToShow = this.imageURLFrom(index);
        this.hoveredIndex = index;
    }

    imageURLFrom(index: number) {
        return this.showRectangleImage
            ? `url("${this.apiService.fileURL(this.projects[index].imageURLRectangle)}")`
            : `url("${this.apiService.fileURL(this.projects[index].imageURLSquare)}")`;
    }

}
