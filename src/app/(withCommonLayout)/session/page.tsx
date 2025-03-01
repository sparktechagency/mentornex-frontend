import dynamic from 'next/dynamic';

const JoinSession = dynamic(() => import('./JoinSession'), {
      suspense: true,
      ssr: false,
});
const SessionPage = () => {
      return (
            <div className="container my-10">
                  <JoinSession />
            </div>
      );
};

export default SessionPage;
