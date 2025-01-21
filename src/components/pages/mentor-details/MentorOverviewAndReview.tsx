'use client';
import Modal from '@/components/ui/Modal';
import { useState } from 'react';
import MentorReview from './MentorReview';

const MentorOverviewAndReview = () => {
      const [openReviewModal, setOpenReviewModal] = useState(false);
      return (
            <div>
                  <div className="flex gap-4 my-4">
                        <button className="text-primary  border-b-2 border-primary font-semibold">Overview</button>
                        <button
                              onClick={() => setOpenReviewModal(true)}
                              className="text-title  border-b-2 border-transparent font-semibold"
                        >
                              Reviews (3)
                        </button>
                  </div>
                  <div className="text-subtitle">
                        <p>
                              I’m a product designer with over 8 years of experience crafting intuitive and user-focused digital
                              experiences. Currently a part of the Toptal network, I specialize in creating designs that blend functionality
                              and aesthetics, ensuring products resonate with users while meeting business goals.
                        </p>

                        <p>
                              My expertise includes UI/UX design, interaction design, and prototyping for web and mobile platforms. I’ve
                              collaborated with startups and established brands to transform complex ideas into seamless, engaging user
                              experiences.
                        </p>
                  </div>

                  <Modal title="Review" visible={openReviewModal} onCancel={() => setOpenReviewModal(false)} width={800}>
                        <MentorReview />
                  </Modal>
            </div>
      );
};

export default MentorOverviewAndReview;
