# rc-web-phone-reuse-device-id-test

I would like to see if the web phone could have a fixed device ID.


## Run the project

```
yarn install
yarn serve
```

Open the browser and go to http://localhost:1234

Ignore the GUI, check browser console.

Refresh the page to see if you can reuse the previous `sipInfo`.


## Conclusion

As I tested, I can reuse the response of (https://developers.ringcentral.com/api-reference/Device-SIP-Registration/createSIPRegistration)

If I always reuse the reponse, it means the web phone will have a "static" device ID.
