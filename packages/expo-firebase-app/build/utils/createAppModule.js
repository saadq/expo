import { Platform } from '@unimodules/core';
import { APP_MODULES, CUSTOM_URL_OR_REGION_NAMESPACES } from './appStore';
import getModuleInstance from './getModuleInstance';
import INTERNALS from './internals';
const isAndroid = Platform.OS === 'android';
/**
 *
 * @param app
 * @param namespace
 * @param InstanceClass
 * @return {function()}
 * @private
 */
export const createAppModule = (app, namespace, InstanceClass) => {
    return (customUrlOrRegion = null) => {
        if (customUrlOrRegion && !CUSTOM_URL_OR_REGION_NAMESPACES[namespace]) {
            throw new Error(INTERNALS.STRINGS.ERROR_INIT_SERVICE_URL_UNSUPPORTED(namespace));
        }
        const appInstanceIdentifier = `${app.name}${customUrlOrRegion || ''}`;
        if (!APP_MODULES[appInstanceIdentifier]) {
            APP_MODULES[appInstanceIdentifier] = {};
        }
        if (isAndroid && namespace !== 'utils' && !INTERNALS.FLAGS.checkedPlayServices) {
            INTERNALS.FLAGS.checkedPlayServices = true;
            app.utils().checkPlayServicesAvailability();
        }
        if (!APP_MODULES[appInstanceIdentifier][namespace]) {
            if (!InstanceClass) {
                InstanceClass = getModuleInstance(namespace);
            }
            APP_MODULES[appInstanceIdentifier][namespace] = new InstanceClass(app, customUrlOrRegion);
        }
        return APP_MODULES[appInstanceIdentifier][namespace];
    };
};
//# sourceMappingURL=createAppModule.js.map