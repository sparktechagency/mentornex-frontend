import dynamic from 'next/dynamic';

const Meeting = dynamic(() => import('./Meeting'), {
      suspense: true,
      ssr: false,
});
const MeetingsPage = () => {
      return (
            <div>
                  <Meeting />
            </div>
      );
};

export default MeetingsPage;
