import * as i18next from 'i18next';
import { Detector, DetectorOptions } from '../interface';
import machProNative from '../detectors/machProNative';

const getDefaults = (): DetectorOptions => ({
    order: ['MachProNative'],
});

class I18nLanguageDetector implements i18next.LanguageDetectorModule {
    type: 'languageDetector';
    public static type: string;
    private detectors: { [key: string]: Detector };
    private services: i18next.Services;
    private options: DetectorOptions;
    
    constructor(services: i18next.Services, options: DetectorOptions = {}) {
        this.detectors = {};
        this.init(services, options);
    }

    addDetector(detector: Detector): void {
        this.detectors[detector.name] = detector;
    }

    detect(detectionOrder?: string[]): string | readonly string[] | undefined {
        if (!detectionOrder) {
            detectionOrder = this.options.order;
        }

        let detected: string[] = [];

        detectionOrder?.forEach((detectorName) => {
            if (this.detectors[detectorName]) {
                let lookup = this.detectors[detectorName].lookup(this.options);
                if (lookup && typeof lookup === 'string') lookup = [lookup];
                if (lookup) detected = detected.concat(lookup);
            }
        });

        if (this.services.languageUtils.getBestMatchFromCodes) {
            return detected; // new i18next v19.5.0
        }
        return detected.length > 0 ? detected[0] : undefined; // a little backward compatibility
    }

    cacheUserLanguage(lng: string, caches?: string[]): void {
        if (!caches) {
            caches = this.options.caches;
        };

        if (!caches) {
            return;
        }

        if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) {
            return;
        }

        caches.forEach((cacheName) => {
            if (this.detectors[cacheName]) {
                this.detectors[cacheName].cacheUserLanguage?.(lng, this.options);
            }
        });
    }

    init(services: i18next.Services, detectorOptions: DetectorOptions): void {
        this.services = services;
        this.options = { ...getDefaults(), ...detectorOptions };
        this.addDetector(machProNative);
    }
}

I18nLanguageDetector.type = 'languageDetector';
export default I18nLanguageDetector;