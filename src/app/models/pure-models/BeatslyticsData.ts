import {GenericFeature} from './GenericFeature';

export class BeatslyticsData {
    metaAppStoreName: string;
    metaAppStoreContent: string;
    headline: string;
    intro: string;
    appStore: string;
    features: GenericFeature[];
    support: string;
    license_agreement_url: string;
    privacy_policy_url: string;
    credits: GenericFeature;
    id?: number;
}

