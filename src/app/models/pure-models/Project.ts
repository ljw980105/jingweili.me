export class Project {
    constructor(
        public imageUrl: string,
        public name: string,
        public description: string,
        public links: ProjectLink[],
        public technologies: string[],
        public id: string = null
    ) {
    }
}

export class ProjectLink {
    constructor(
        public name: string,
        public url: string
    ) {
    }
}
