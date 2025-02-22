import { KJUR } from 'jsrsasign';

export const generateVideoToken = (sdkKey: string, sdkSecret: string, sessionName: string, role: number): string => {
      const iat = Math.round(new Date().getTime() / 1000);
      const exp = iat + 60 * 60 * 2; // Token expires in 2 hours

      const oHeader = { alg: 'HS256', typ: 'JWT' };
      const oPayload = {
            app_key: sdkKey,
            tpc: sessionName,
            role_type: role, // 1 - host, 0 - participant
            version: 1,
            iat: iat,
            exp: exp,
      };

      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(oPayload);
      const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);

      return sdkJWT;
};
