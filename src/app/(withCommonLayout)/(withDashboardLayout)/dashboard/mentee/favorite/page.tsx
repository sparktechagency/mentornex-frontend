import MentorCard from '@/components/ui/MentorCard';
import { mentors } from '@/const/constant';

const Favourite = () => {
      return (
            <div>
                  <h2 className="text-2xl font-semibold mb-4">Favorite Mentors</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mentors.slice(0, 6).map((mentor) => (
                              <MentorCard mentor={mentor} key={mentor.id} />
                        ))}
                  </div>
            </div>
      );
};

export default Favourite;
