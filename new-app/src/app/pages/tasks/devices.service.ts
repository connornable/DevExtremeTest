import { Injectable } from '@angular/core';

 



@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  myHeaders: any = "";
  devices: any[] = [];




  constructor() { 
    this.myHeaders = new Headers();
    this.initDevices();
  }

 

  async initDevices() {
      this.myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2NTgzMDQ0OTAsImlhdCI6MTY1ODMwNDQ5MCwiZXhwIjoxNjU4MzA4MDkwLCJzY29wZXMiOlsicm1tIl0sImNvbnRleHQiOnsicm1tIjp7Im1hZXN0cm8iOnsidXJsIjoiaHR0cHM6Ly9kZXZpY2UtZmlsdGVyLmV1LXdlc3QtMS5kZXYubWFlc3Ryby5zeXN0ZW0tbW9uaXRvci5jb20vdjIvYXBpLyIsImp3dCI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSlNVekkxTmlKOS5leUp1WW1ZaU9qRTJOVGd6TURRME56a3NJbWxoZENJNk1UWTFPRE13TkRRM09Td2laWGh3SWpveE5qVTRNelEzTmpnNUxDSjFjMlZ5SWpwN0ltbGtJam94TVRFM01qY3NJblZ6WlhKdVlXMWxJam9pWkc5amEyVnlRSE52YkdGeWQybHVaSE11WTI5dElpd2lZV05qYjNWdWRDSTZOamN4TURjeUxDSjBaWEp5YVhSdmNua2lPaUpUVkVjd01TSjlmUS5Hekd3OHVpT050VDFCUHNMU2F5V0FCSG9PLTBRZDZ6MUlhb28wTFpkOHd3ZTQ4cGhIc1dyclY3eHAzUmx4U3FjOTF4TF9IZDgzRW9LMlRfSFNKZHFLcDBMOTE2R281clYwZkFRbGd5cFhQTDZSZ2ZuODktYlRuUXVWNWZGTGFJNWtVQ2dCUk9raVE2ZG5JZnJHUVp2RFVOdlpkVVpJUzA3aE0tUDZ1em9qLWM0TDNKX0JjWGU3NnNXZlFSWDV5QTBMWXZWdEpYcVpMeS1YanBEMXVrZVlSemV5VksySEczU3FWWjdXSU1uZ3lOTXN1YS1KcGUxY1FDSlRReF9kbVR1QWh5RXBFZExwVjl4OF9LQ01qWW9JVW1fbGxZRTI0ZzdrMnoxLVQ0aFlDY0V0QUNkSnJDY0FVa0JVcUlEbE9tMmlHX1F5WHFpQUw3MFNZVHlJaUdxa1EifSwiY2hlY2tQcm9jZXNzb3IiOnsiSldUIjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKU1V6STFOaUo5LmV5SnVZbVlpT2pFMk5UZ3pNRFEwTnprc0ltbGhkQ0k2TVRZMU9ETXdORFEzT1N3aVpYaHdJam94TmpVNE16RTRPRGc1TENKMWMyVnlJanA3SW1sa0lqb3hNVEUzTWpjc0luVnpaWEp1WVcxbElqb2laRzlqYTJWeVFITnZiR0Z5ZDJsdVpITXVZMjl0SWl3aVlYTnpiMk5wWVhScGIyNXpJanA3SW5SbGNuSnBkRzl5ZVNJNld5SlRWRWN3TVNKZExDSmhZMk52ZFc1MElqcGJJamc0VkROQlRUWlBNVGhWVFRBaVhTd2lZMnhwWlc1MElqcGJJaW9pWFN3aWMybDBaU0k2V3lJcUlsMHNJbVJsZG1salpTSTZXeUlxSWwxOUxDSndaWEp0YVhOemFXOXVjeUk2V3lKamNtVmhkR1U2WTJobFkyc2lMQ0oxY0dSaGRHVTZZMmhsWTJzaUxDSmtaV3hsZEdVNlkyaGxZMnNpTENKbGVHVmpkWFJsT21Ob1pXTnJPbU5zWldGeUlpd2laWGhsWTNWMFpUcGphR1ZqYXpweVpYSjFibDlrWlhacFkyVWlMQ0psZUdWamRYUmxPbU5vWldOck9uSjFiaUlzSW1WNFpXTjFkR1U2ZEdGemF5SmRMQ0p5YjJ4bGN5STZXMTE5ZlEuS0dOblEwX25pVmUtT0ZpTU1vZjFKa3Vkc250OUljcnk0SkkzOEprMTJZa1pGMF9PcnRrRUlCbDdxZlYyZE4yVk8xTFZrWDFxdk5pamlTZXVnWUdsQzY0anNfV0I4UTVoYmZhQXJVRGtIMmIwSXM0b1UxbUpFa21JN0FsX1BHMUc5eVFNeFpHOGppWVpVVUNINmhfVUdaNUlLUGdvNTY3Y2dJSWNpUG0taHBMN0t1YWNibnpsNXJ6ZDFidC1INVlqalA5ci1Qd1VLWUotVV9UX25BLXN2QUxxZmdmc2JIRXF1YlBkQzN0VkQtWnlWckprQkliMDUtRUhVOGF5RE1BdzUzVE4zVFpCY0JFUzVxNXl1R3JBT1dsT2FEZHl3VWZXSE1nNVNRczc0YTlXUHRfelNFcDZQQk43Mmg3MmQ5Q3Q0b3ZnSkt4RGM0TUpmNl8wNFJZU19RIiwidXJsIjoiaHR0cHM6Ly9hcnNuLXN0Zy1hcGkudHN0LnN5c3RlbS1tb25pdG9yLmNvbS8ifSwiY2xpZW50R3JvdXBDbGllbnRzIjpudWxsLCJsb2NhbGUiOiJlbi1nYiIsImRhc2hib2FyZFNlcnZlciI6eyJzc29BY2Nlc3NUb2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW10cFpDSTZJa1l4T1RaRk9EVXhNVUkxUmpVeU1qaENSRU14TkRSR05rVXhNRUZGT1RsR1EwRXpRME16UmtaU1V6STFOaUlzSW5SNWNDSTZJa3BYVkNJc0luZzFkQ0k2SWpoYVltOVZVblJtVldscE9YZFZWREkwVVhKd2JqaHZPSGRmT0NKOS5leUp1WW1ZaU9qRTJOVGd6TURRME9EZ3NJbVY0Y0NJNk1UWTFPRE13T0RBNE9Dd2lhWE56SWpvaWFIUjBjSE02THk5emRHRm5hVzVuTG0xemNITnpieTV6ZDIxemNDNXVaWFFpTENKaGRXUWlPaUpvZEhSd2N6b3ZMM04wWVdkcGJtY3ViWE53YzNOdkxuTjNiWE53TG01bGRDOXlaWE52ZFhKalpYTWlMQ0pqYkdsbGJuUmZhV1FpT2lJMk0yWmpNMk16TmkwM1l6TmlMVFEwWTJVdFlqZ3pPUzB6TlRBeU9EbGxPV0k1TVRZaUxDSnpkV0lpT2lJeFpEWTVNMkZtTmkxaU1qZzBMVFF3TmpjdE9ESTFOeTFtTmpWaVpEazBPV1psWTJNaUxDSmhkWFJvWDNScGJXVWlPakUyTlRneU1qZ3pOVE1zSW1sa2NDSTZJbXh2WTJGc0lpd2ljMmxrSWpvaVJERTRSVFpCT1RrM01UZEdRME5GTmpOQlJrRTNRVEV4TUVReU1EbEdSVUlpTENKcFlYUWlPakUyTlRnek1EUTBPRGdzSW5OamIzQmxJanBiSW05d1pXNXBaQ0lzSW1WdFlXbHNJaXdpY0hKdlptbHNaU0pkTENKaGJYSWlPbHNpY0hka0lsMTkuRXJubjIyYXZCODd1cHRpbFdqdFRrelhWLXBRbVhZdmJOcUZtMmdMRjcwQlBxU3AteS00eHc3cjJISXdhRVk5blozZkdjWmozaUhQbWlvZ2tBcm16VlJSeUR0U211NWdUa0V2dnVUcjZvUm5ZQW9YcmhZNDUxY2hJMktxTktYYWVNRnpSM2x0VzA0bUhUaDBiZXdYclhGZFcxbUl3N2o3VEw0clQ3cEFKbmo5RlVUdENLRlk5SDF5LThxdlJzcjFkTXJpRVlPZUJCOVF6bVNzeWRHNm1NZDRFc3BTTHdiRFlKYUV6YlpLbEpEdm16bWxfTXo1OXJ4UDRKVW1GZWZJUWhZNTlBd29HUG9mOGI2VmJCRzRuTXVDenY0cHpEUjhJdDhPNWxUdjJOb25nWWw5S1c1N2VIMjZOQjBjTlo1M0ZnX3pWNzJNM2MyeTlXa3lRUTJqOXlBIiwiY2VyYmVydXNVcmwiOiJodHRwczovL2VtZWEuc2VydmljZS1hdXRoLnN0Zy5zaGFyZWRzdmNzLnN5c3RlbS1tb25pdG9yLmNvbS9jb25uZWN0L3Rva2VuIiwidXJsIjoiaHR0cHM6Ly93d3cuc3RnMDEuc3lzdGVtbW9uaXRvci5jby51ayIsImFjY291bnRJZCI6IjY3MTA3MiIsInVzZXJJZCI6MTExNzI3fX19fQ.sig");
      this.myHeaders.append("X-RMM-Territory", "STG01");
      this.myHeaders.append("X-RMM-Account-Id", "671072");
      this.myHeaders.append("Content-Type", "application/json");
      
      var graphql = JSON.stringify({
         query: "query {\n  devices {\n  results {\n devicesList{\n  id\n name\n type\n  site{\n client{\n name\n  }\n name }\n }\n }\n }\n }",
        variables: {}
      })
      let requestOptions: RequestInit = {
        method: 'POST',
        headers: this.myHeaders,
        body: graphql,
        redirect: 'follow'
      };
      
      fetch("https://qapi-staging.eu-west-1.dev.ui.slr.system-monitor.com/", requestOptions)
      .then(response => response.json())
      .then(data => {this.devices = data.data.devices.results.devicesList})    .catch(error => console.log('error', error));
    
      
    }

 getDevices() {
this.devices.forEach(element => {
  element.type = element.type.toLowerCase();
  console.log(element.type);
});
return this.devices;
}


}
