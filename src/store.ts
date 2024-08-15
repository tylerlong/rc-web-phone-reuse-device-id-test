import { manage } from 'manate';
import localforage from 'localforage';
import type SipInfoResponse from '@rc-ex/core/lib/definitions/SipInfoResponse';
import WebPhone from 'ringcentral-web-phone';

export class Store {
  public count = 0;
}

const store = manage(new Store());

export default store;

import RingCentral from '@rc-ex/core';

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  let sipInfo = await localforage.getItem<SipInfoResponse>('rc-sip-info');
  if (sipInfo === null) {
    console.log('Generate new sipInfo');
    await rc.authorize({
      jwt: process.env.RINGCENTRAL_JWT_TOKEN!,
    });
    const r = await rc
      .restapi()
      .clientInfo()
      .sipProvision()
      .post({
        sipInfo: [{ transport: 'WSS' }],
      });
    sipInfo = r.sipInfo![0];
    await localforage.setItem('rc-sip-info', sipInfo);
    await rc.revoke();
  } else {
    console.log('Reuse old sipInfo');
  }
  console.log(sipInfo);

  const webPhone = new WebPhone({ sipInfo, instanceId: sipInfo.authorizationId });
  await webPhone.enableDebugMode();
  await webPhone.register();
};
main();
