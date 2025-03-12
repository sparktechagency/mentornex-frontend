'use client';

import { useGetPrivacyQuery } from '@/redux/features/terms-privacy/terms-privacyApi';

const PrivacyPolicy = () => {
      const { data: privacy } = useGetPrivacyQuery([]);

      return (
            <div className="container  mx-auto px-4 py-20 min-h-[calc(100vh-96px)]">
                  <h1 className="text-4xl font-bold text-center mb-10">Privacy Policy</h1>
                  {privacy ? (
                        <div dangerouslySetInnerHTML={{ __html: privacy?.content || '' }}></div>
                  ) : (
                        <div>Please contact admin for add privacy policy</div>
                  )}
            </div>
      );
};

export default PrivacyPolicy;
