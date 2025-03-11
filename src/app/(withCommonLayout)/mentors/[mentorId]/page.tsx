import MentorProfileDetails from '@/components/pages/mentor-details/MentorProfile';

const MentorDetailsPage = ({ params }: { params: { mentorId: string } }) => {
      return (
            <div>
                  <MentorProfileDetails mentorId={params.mentorId} />
            </div>
      );
};

export default MentorDetailsPage;
