'use client';
import { useGetTermsQuery } from '@/redux/features/terms-privacy/terms-privacyApi';

const TermsAndConditionPage = () => {
      const { data: terms } = useGetTermsQuery([]);

      return (
            <div className="container  mx-auto px-4 py-20 min-h-[calc(100vh-96px)]">
                  <h1 className="text-4xl font-bold text-center mb-10">Terms and Conditions</h1>
                  {terms ? (
                        <div dangerouslySetInnerHTML={{ __html: terms?.content || '' }}></div>
                  ) : (
                        <div>Please contact admin for add terms and conditions</div>
                  )}
            </div>
      );
};

export default TermsAndConditionPage;
