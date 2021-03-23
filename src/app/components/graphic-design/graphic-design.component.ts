import {Component, OnInit} from '@angular/core';
import {GraphicProject} from '../../models/pure-models/GraphicProject';
import {Title} from '@angular/platform-browser';
import {WidthBreakpointObserver} from '../../models/WidthBreakpointObserver';
import {ApiService} from '../../services/api.service';
import {take, takeUntil} from 'rxjs/operators';
import {MemoryManagerComponent} from '../../minor-components/memory-manager/memory-manager.component';

@Component({
    selector: 'app-graphic-design',
    templateUrl: './graphic-design.component.html',
    styleUrls: ['./graphic-design.component.scss']
})
export class GraphicDesignComponent extends MemoryManagerComponent implements OnInit {
    projects: GraphicProject[] = [];
    imageURLToShow: string;
    hoveredIndex = 0;
    widthObserver: WidthBreakpointObserver;
    showRectangleImage = false;
    dataReady = false;

    constructor(private titleService: Title, public apiService: ApiService) {
        super();
        this.titleService.setTitle('Graphic Design');
    }

    ngOnInit(): void {
        this.apiService.getGraphicsProjects()
            .pipe(take(1))
            .subscribe(projects => {
                this.projects = projects;
                this.dataReady = true;

                this.widthObserver = new WidthBreakpointObserver(1000);
                this.showRectangleImage = window.innerWidth > 1000;
                this.imageURLToShow = this.imageURLFrom(0);

                this.widthObserver.moreThanWidth
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe(() => {
                        this.showRectangleImage = true;
                        this.imageURLToShow = this.imageURLFrom(this.hoveredIndex);
                    });
                this.widthObserver.lessThanWidth
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe(() => {
                        this.showRectangleImage = false;
                        this.imageURLToShow = this.imageURLFrom(this.hoveredIndex);
                    });
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
