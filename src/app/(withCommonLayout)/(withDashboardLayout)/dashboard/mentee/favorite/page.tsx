'use client';
import MentorCard from '@/components/ui/MentorCard';
import { TMentor } from '@/redux/features/mentor/mentorApi';
import { useGetWishlistQuery } from '@/redux/features/wishlist/wishlistApi';
import { useAppSelector } from '@/redux/hooks';

const Favourite = () => {
      const { user } = useAppSelector((state) => state.auth);
      const { data: myWishlist } = useGetWishlistQuery(undefined, {
            skip: !user,
      });
      console.log(myWishlist);

      return (
            <div>
                  <h2 className="text-2xl font-semibold mb-4">Favorite Mentors</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myWishlist?.map((mentor: TMentor) => (
                              <MentorCard mentor={mentor} key={mentor._id} />
                        ))}
                  </div>
            </div>
      );
};

export default Favourite;
