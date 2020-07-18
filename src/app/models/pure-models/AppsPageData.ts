import {AppOrSkill} from './AppOrSkill';

export class AppsPageData {
    constructor(
        public apps: AppOrSkill[],
        public skills: AppOrSkill[]
    ) {
    }
}
