import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { XmlHttpRequestHelper } from '../../../src/shared/helpers/XmlHttpRequestHelper';
import { AppConsts } from '../../../src/shared/AppConsts';


if (environment.production) {
  enableProdMode();
}

function getApplicationConfig() {
  let type = 'GET';
  // COMMONDESK
  // Loads appconfig.json 
  // environment.appConfig points to angulars environment.json file.  
  // This can be updated using  the --configuration=xxxxx where xxxxx will be uses as environment.xxxx.json file 
  // If the --configuration is used then the angular > configurations > FileReplaces will udpate the file used in environment.appConfig
  let url = location.origin + '/assets/appconfig.json';
  console.log("APB:Using AppConfig:"+url);

  XmlHttpRequestHelper.ajax(type, url, null, null, (result) => {
      
      console.log(result);
      AppConsts.appBaseUrl = result.appBaseUrl;
      AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;
      AppConsts.localeMappings = result.localeMappings;
      AppConsts.refindBackendUrl = result.refindBackendUrl;
      
      console.log("APB:remoteServiceBaseUrl:"+AppConsts.remoteServiceBaseUrl );
      console.log("APB:appBaseUrl:"+AppConsts.appBaseUrl);
      console.log("APB:Using AppConfig:refindBackendUrl:"+AppConsts.refindBackendUrl);

      platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
  });
}

getApplicationConfig();