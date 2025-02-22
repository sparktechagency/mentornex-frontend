import dynamic from 'next/dynamic';

const Meeting = dynamic(() => import('./Meeting'), {
      suspense: true,
      ssr: false,
});
const MeetingsPage = () => {
      return (
            <div className="min-h-[calc(100vh-96px)] flex items-center justify-center">
                  <Meeting />
            </div>
      );
};

export default MeetingsPage;
